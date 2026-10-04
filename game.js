// ===== LÓGICA =====
const $ = id => document.getElementById(id);
const limitar = v => Math.max(0, Math.min(10, v));
const esperar = ms => new Promise(r => setTimeout(r, ms));
let estado;
let ocupado = false;

// --- Música ---
const player = new Audio();
player.loop = true;
const VOLUME_GERAL = 0.6;
let faixaAtual = null;
let fadeTimer = null;

function fade(de, ate, ms) {
  return new Promise(resolve => {
    clearInterval(fadeTimer);
    const passos = 15;
    let i = 0;
    fadeTimer = setInterval(() => {
      i++;
      player.volume = Math.max(0, Math.min(1, de + (ate - de) * (i / passos)));
      if (i >= passos) { clearInterval(fadeTimer); resolve(); }
    }, ms / passos);
  });
}

async function tocar(chave) {
  if (!chave || chave === faixaAtual) return; // mesma trilha: continua sem reiniciar
  faixaAtual = chave;
  const alvo = VOLUME_GERAL * musicas[chave].volume;
  if (!player.paused) await fade(player.volume, 0, 500);
  player.src = musicas[chave].src;
  player.volume = 0;
  try { await player.play(); } catch (e) { return; }
  fade(0, alvo, 900);
}

// --- Efeitos sonoros (gerados no navegador, sem arquivos) ---
let audioCtx;
function nota(freq, t, dur, tipo, vol, freqFim) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, t);
  if (freqFim) o.frequency.exponentialRampToValueAtTime(freqFim, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + dur);
}

function sfx(nome) {
  if (player.muted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
    if (nome === "clique") nota(520, t, 0.09, "triangle", 0.12, 360);
    if (nome === "sobe")   { nota(440, t, 0.15, "triangle", 0.14); nota(660, t + 0.12, 0.25, "triangle", 0.14); }
    if (nome === "desce")  nota(150, t, 0.4, "sine", 0.35, 50);
    if (nome === "alerta") { nota(220, t, 0.14, "square", 0.07); nota(220, t + 0.22, 0.14, "square", 0.07); }
  } catch (e) { /* sem som, o jogo continua */ }
}

// --- Fundo por fase ---
function definirFase(n) {
  document.querySelectorAll("#fundo .camada").forEach(c =>
    c.classList.toggle("ativa", c.dataset.fase === String(n)));
}

// --- Fumaça ---
async function comFumaca(acao) {
  if (ocupado) return;
  ocupado = true;
  const caixa = $("fumaca");
  caixa.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const n = document.createElement("span");
    n.className = "nuvem";
    n.style.setProperty("--x", Math.random() * 100 + "%");
    n.style.setProperty("--y", Math.random() * 100 + "%");
    n.style.setProperty("--t", 220 + Math.random() * 260 + "px");
    n.style.setProperty("--d", Math.random() * 300 + "ms");
    n.style.setProperty("--dx", Math.random() * 160 - 80 + "px");
    caixa.appendChild(n);
  }
  caixa.hidden = false;
  caixa.getBoundingClientRect(); // força o navegador a registrar o estado inicial
  caixa.dataset.estado = "entra";
  await esperar(1100);
  acao();
  window.scrollTo(0, 0);
  await esperar(150);
  caixa.dataset.estado = "sai";
  await esperar(1400);
  caixa.hidden = true;
  caixa.dataset.estado = "";
  ocupado = false;
}

// --- Texto digitado ---
let finalizarDigitacao = null;
function digitar(el, texto, aoFim) {
  pularDigitacao();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = texto;
    aoFim();
    return;
  }
  el.textContent = "";
  const passo = Math.max(6, Math.min(18, 7000 / texto.length)); // textos longos digitam mais rápido
  let i = 0;
  const id = setInterval(() => {
    i++;
    el.textContent = texto.slice(0, i);
    if (i >= texto.length) fim();
  }, passo);
  function fim() {
    clearInterval(id);
    el.textContent = texto;
    finalizarDigitacao = null;
    aoFim();
  }
  finalizarDigitacao = fim;
}
function pularDigitacao() { if (finalizarDigitacao) finalizarDigitacao(); }

// --- Telas e painel ---
function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.add("oculto"));
  $(id).classList.remove("oculto");
}

function montarPainel() {
  $("painel").innerHTML = Object.entries(BARRAS).map(([k, nome]) => `
    <li id="item-${k}">
      <div class="linha"><span>${nome}</span><span id="num-${k}">5</span></div>
      <div class="trilho"><div id="barra-${k}" class="preenchimento ${k}"></div></div>
    </li>`).join("");
}

function atualizarPainel() {
  for (const k in BARRAS) {
    $("num-" + k).textContent = estado[k];
    $("barra-" + k).style.width = estado[k] * 10 + "%";
    $("item-" + k).classList.toggle("perigo", estado[k] <= 2);
  }
}

// Brilho na barra e número flutuante (+2, -3)
function animarBarra(k, delta) {
  const li = $("item-" + k);
  li.classList.remove("pulsa-sobe", "pulsa-desce");
  void li.offsetWidth; // reinicia a animação
  li.classList.add(delta > 0 ? "pulsa-sobe" : "pulsa-desce");
  const f = document.createElement("span");
  f.className = "flutua " + (delta > 0 ? "sobe" : "desce");
  f.textContent = (delta > 0 ? "+" : "") + delta;
  li.appendChild(f);
  setTimeout(() => f.remove(), 1400);
}

function mostrarSituacao() {
  const s = situacoes[estado.atual];
  const m = midiaSituacao[estado.atual] || {};

  definirFase(faseSituacao[estado.atual]);
  $("ano").textContent = s.ano;
  $("titulo").textContent = s.titulo;

  const fig = $("figura");
  if (m.imagem) {
    $("imagem").src = IMG[m.imagem].src;
    $("imagem").alt = IMG[m.imagem].legenda;
    $("legenda").textContent = IMG[m.imagem].legenda;
    fig.classList.remove("oculto");
  } else {
    fig.classList.add("oculto");
  }

  const box = $("opcoes");
  box.innerHTML = "";
  box.classList.add("oculto"); // as opções só aparecem quando o texto termina
  s.opcoes
    .filter(o => !o.requer || estado.flags[o.requer])
    .forEach(o => {
      const b = document.createElement("button");
      b.textContent = o.texto;
      if (o.requer) b.classList.add("especial");
      b.addEventListener("click", () => escolher(s, o));
      box.appendChild(b);
    });

  mostrarTela("tela-situacao");
  tocar(m.musica);
  digitar($("texto"), s.texto, () => box.classList.remove("oculto"));
}

function escolher(s, o) {
  if (ocupado) return;
  sfx("clique");
  window.scrollTo(0, 0);
  const lista = $("mudancas");
  lista.innerHTML = "";
  const emPerigoAntes = Object.keys(BARRAS).filter(k => estado[k] <= 2);
  let soma = 0;

  for (const k in o.efeitos) {
    const v = o.efeitos[k];
    soma += v;
    estado[k] = limitar(estado[k] + v);
    const li = document.createElement("li");
    li.className = v > 0 ? "sobe" : "desce";
    li.textContent = `${BARRAS[k]} ${v > 0 ? "+" : ""}${v}`;
    lista.appendChild(li);
  }
  if (o.ferro) estado.ferro += o.ferro;
  if (o.conc) estado.conc += o.conc;
  if (o.flag) estado.flags[o.flag] = true;
  estado.historico.push({ ano: s.ano, titulo: s.titulo, escolha: o.texto.split(":")[0] });

  atualizarPainel();
  for (const k in o.efeitos) animarBarra(k, o.efeitos[k]);
  setTimeout(() => sfx(soma >= 0 ? "sobe" : "desce"), 120);
  const novoPerigo = Object.keys(BARRAS).some(k => estado[k] <= 2 && !emPerigoAntes.includes(k));
  if (novoPerigo) setTimeout(() => sfx("alerta"), 650);

  $("consequencia-texto").textContent = o.consequencia;
  mostrarTela("tela-consequencia");
}

function proxima() {
  sfx("clique");
  comFumaca(() => {
    estado.atual++;
    if (estado.atual < situacoes.length) mostrarSituacao();
    else mostrarFinal();
  });
}

function mostrarFinal() {
  const f = finais.find(f => f.condicao(estado));
  $("final-titulo").textContent = f.titulo;
  $("final-texto").textContent = f.texto;
  $("resumo").innerHTML = estado.historico.map((h, i) => `
    <li>
      <span class="resumo-ano">${h.ano}</span> <strong>${h.titulo}</strong>
      <p><em>Sua escolha:</em> ${h.escolha}</p>
      <p><em>Na história:</em> ${historiaSituacao[i]}</p>
    </li>`).join("");
  definirFase(3);
  mostrarTela("tela-final");
  tocar(musicaFinal[f.titulo]);
}

function novoEstado() {
  return { popular: 5, elites: 5, recursos: 5, militar: 5, ferro: 0, conc: 0, flags: {}, atual: 0, historico: [] };
}

function iniciar() {
  estado = novoEstado();
  montarPainel();
  atualizarPainel();
  $("painel").classList.remove("oculto");
  mostrarSituacao();
}

// --- Botões ---
$("btn-entrar").addEventListener("click", () => {
  sfx("clique");
  tocar("marcha"); // o clique libera o áudio no navegador
  comFumaca(() => mostrarTela("tela-briefing"));
});
$("btn-comecar").addEventListener("click", () => { sfx("clique"); comFumaca(iniciar); });
$("btn-continuar").addEventListener("click", proxima);
$("btn-reiniciar").addEventListener("click", () => comFumaca(() => {
  $("painel").classList.add("oculto");
  definirFase(1);
  mostrarTela("tela-inicio");
  tocar("marcha");
}));
// Clicar no texto pula a digitação
$("tela-situacao").addEventListener("click", e => { if (!e.target.closest("button")) pularDigitacao(); });

$("btn-som").addEventListener("click", () => {
  player.muted = !player.muted;
  $("btn-som").textContent = player.muted ? "Som: desligado" : "Som: ligado";
  $("btn-som").setAttribute("aria-pressed", player.muted);
});
