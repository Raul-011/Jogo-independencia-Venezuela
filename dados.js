// ===== DADOS DO JOGO =====
// Aqui ficam os textos, as escolhas, as mídias e os finais.
// Para mudar um texto ou um valor, edite este arquivo; a lógica está no game.js.
//
// efeitos: popular, elites, recursos, militar (cada barra vai de 0 a 10)
// ferro / conc: contadores ocultos de "Mão de Ferro" e "Conciliação"
// flag: marca uma escolha para mudar situações futuras
// requer: a opção só aparece se a flag já existir (opção especial)
// O texto de cada opção começa com o nome da escolha, antes dos dois pontos.

const BARRAS = {
  popular:  "Apoio Popular",
  elites:   "Apoio das Elites",
  recursos: "Recursos",
  militar:  "Força Militar"
};

const situacoes = [
  // ---------- PARTE 1: 1811–1814 ----------
  {
    ano: "1812",
    titulo: "O terremoto de Caracas",
    texto: "Em 5 de julho de 1811 as províncias venezuelanas declararam a independência e nasceu a Primeira República. Mas em 26 de março de 1812 um enorme terremoto atingiu Caracas: milhares de pessoas morreram e igrejas e prédios públicos vieram abaixo.\n\nA Igreja e os realistas passaram a dizer que a tragédia era um castigo divino pela rebelião contra o rei. Numa sociedade profundamente católica, isso era muito perigoso para os patriotas.\n\nComo o novo governo deve reagir?",
    opcoes: [
      {
        texto: "Secular e racional: ignorar a superstição, confiscar propriedades da Igreja para realocar desabrigados e manter o foco militar.",
        efeitos: { popular: -2, recursos: 1, militar: 1 },
        flag: "confiscouIgreja",
        consequencia: "Aumenta a eficiência logística, mas despenca a moral e a lealdade da população profundamente religiosa."
      },
      {
        texto: "Apaziguamento: retardar campanhas militares para financiar procissões e ajuda humanitária religiosa.",
        efeitos: { popular: 2, elites: 1, recursos: -1, militar: -1 },
        conc: 1,
        consequencia: "Resgata o apoio popular, mas dá tempo para as tropas realistas se reorganizarem."
      }
    ]
  },
  {
    ano: "1813",
    titulo: "O Decreto de Guerra a Morte",
    texto: "Em 1813 Bolívar liderou a Campanha Admirável: partiu de Nova Granada, avançou rapidamente, entrou em Caracas e criou a Segunda República. Mas a guerra estava cada vez mais violenta, e ele percebeu que a guerra branda não funcionava contra os abusos realistas.\n\nO Decreto de Guerra a Morte determina que espanhóis e canários que não atuem pela liberdade serão mortos, mesmo sendo neutros, enquanto os americanos serão poupados.\n\nComo aplicá-lo?",
    opcoes: [
      {
        texto: "Mão de ferro: aplicar o decreto rigorosamente.",
        efeitos: { popular: -1, elites: 1, militar: 1 },
        ferro: 1,
        flag: "decretoRigido",
        consequencia: "Elimina quintas-colunas e intimida o inimigo, mas afasta moderados e gera ciclos intermináveis de vingança sangrenta."
      },
      {
        texto: "Moderação diplomática: recusar-se a executar prisioneiros civis.",
        efeitos: { popular: 1, recursos: 1, militar: -2 },
        conc: 1,
        consequencia: "Ganha simpatia internacional e humanitária, mas aumenta o risco de traições internas por simpatizantes da Coroa."
      }
    ]
  },
  {
    ano: "1814",
    titulo: "O colapso diante dos llaneros",
    texto: "Em 1814 o caudilho realista José Tomás Boves reuniu milhares de llaneros, vaqueiros e peões das planícies, marginalizados pelas elites crioulas de Caracas. Para muitos deles, a independência parecia uma disputa entre ricos.\n\nBoves avança saqueando tudo. Os patriotas estão sem suprimentos, sem soldados e sem o apoio dos camponeses pobres, que veem neles seus antigos patrões.\n\nComo reagir ao avanço de Boves?",
    opcoes: [
      {
        texto: "Reforma agrária radical: prometer terras e liberdade imediata aos escravizados e llaneros para mudar de lado.",
        efeitos: { popular: 2, elites: -3, recursos: -1, militar: 1 },
        flag: "reformaAgraria",
        consequencia: "Aliena a elite crioula que financia o exército, mas pode virar o jogo popular."
      },
      {
        texto: "Guerra total de recursos: destruir colheitas e evacuar cidades, a emigração para o oriente, para não deixar nada para Boves.",
        efeitos: { popular: -2, elites: -1, recursos: -1, militar: 1 },
        flag: "emigracao",
        consequencia: "Protege o exército remanescente, mas causa uma enorme crise humanitária e perda de território."
      }
    ]
  },

  // ---------- PARTE 2: 1815–1821 ----------
  {
    ano: "1815",
    titulo: "A reconquista espanhola e o exílio",
    texto: "Em 1815 a Espanha enviou o general Pablo Morillo para reconquistar suas colônias americanas. Os patriotas foram derrotados e Bolívar deixou a Venezuela, seguindo para a Jamaica.\n\nO que fazer?",
    opcoes: [
      {
        texto: "Continuar lutando: manter a resistência mesmo com poucos recursos.",
        efeitos: { popular: 1, recursos: -1, militar: 1 },
        consequencia: "A causa não morre e os patriotas mostram firmeza, mas os poucos recursos que restavam se esgotam ainda mais."
      },
      {
        texto: "Buscar apoio externo: sair temporariamente para conseguir armas, dinheiro e aliados.",
        efeitos: { popular: -1, elites: 1, recursos: 2, militar: -1 },
        conc: 1,
        consequencia: "Abre portas para conseguir armas, dinheiro e aliados, mas a saída pode ser vista como fuga e deixa os seguidores sem comando."
      }
    ]
  },
  {
    ano: "1816",
    titulo: "A Carta da Jamaica e o apoio do Haiti",
    texto: "Na Jamaica, Bolívar escreveu a Carta da Jamaica (1815), defendendo a independência da América Espanhola. Depois, o presidente do Haiti, Alexandre Pétion, ajudou Bolívar com recursos e armas. Em troca, Bolívar se comprometeu a apoiar a libertação dos escravizados.\n\nComo conquistar apoio para a luta?",
    opcoes: [
      {
        texto: "Apoio das elites: preservar os interesses dos grupos ricos para conseguir recursos.",
        efeitos: { popular: -1, elites: 2, recursos: 2 },
        consequencia: "O dinheiro chega, mas a promessa feita a Pétion fica pela metade e o povo se sente esquecido."
      },
      {
        texto: "Apoio popular: oferecer liberdade e melhores condições aos escravizados e trabalhadores.",
        efeitos: { popular: 2, elites: -1, recursos: 1, militar: 1 },
        consequencia: "Novos combatentes se juntam à causa, mas as elites reclamam do risco aos seus bens."
      },
      {
        texto: "Abolição: cumprir a promessa a Pétion e decretar a liberdade dos escravizados.",
        requer: "reformaAgraria",
        efeitos: { popular: 2, elites: -1, recursos: 2, militar: 1 },
        consequencia: "Como você já tinha prometido terras e liberdade aos pobres, a abolição é vista como coerente e o apoio cresce."
      }
    ]
  },
  {
    ano: "1818",
    titulo: "Os llaneros e José Antonio Páez",
    texto: "Um dos maiores desafios dos patriotas era conquistar os llaneros, trabalhadores das planícies venezuelanas. O líder José Antonio Páez conseguiu aproximar muitos deles da causa patriota, e a participação dos llaneros aumentou muito a força militar de Bolívar.\n\nComo conquistar os llaneros?",
    opcoes: [
      {
        texto: "Recompensas: oferecer cargos, terras e benefícios aos combatentes.",
        efeitos: { popular: 1, elites: -1, recursos: -1, militar: 2 },
        flag: "paezRecompensado",
        consequencia: "A lealdade dos llaneros cresce e o exército se fortalece, mas o tesouro se esvazia e Páez passa a ter muito poder pessoal."
      },
      {
        texto: "Projeto coletivo: mostrar que a independência poderia trazer mudanças para toda a população.",
        efeitos: { popular: 2, elites: -1, recursos: -1, militar: 1 },
        flag: "projetoColetivo",
        consequencia: "Os llaneros passam a sentir a guerra como sua, mas as promessas de mudança assustam as elites e são caras de cumprir."
      }
    ]
  },
  {
    ano: "1819",
    titulo: "Angostura e a travessia dos Andes",
    texto: "Em 1819 aconteceu o Congresso de Angostura, onde Bolívar apresentou ideias para organizar politicamente o novo país. No mesmo ano ele liderou a campanha para libertar a Nova Granada, onde os espanhóis dominavam Bogotá.\n\nQual estratégia usar?",
    opcoes: [
      {
        texto: "Caminho mais seguro: menor desgaste, mas maior chance de os espanhóis preverem o ataque.",
        efeitos: { elites: 1, recursos: 1, militar: -2 },
        consequencia: "O exército chega inteiro, mas os espanhóis têm tempo de se preparar e a Batalha de Boyacá será mais difícil."
      },
      {
        texto: "Travessia dos Andes: muito mais difícil, mas permitia surpreender o inimigo.",
        efeitos: { popular: 2, recursos: -1, militar: 2 },
        consequencia: "A travessia custa vidas, cavalos e suprimentos, mas o ataque surpresa decide a Batalha de Boyacá e os patriotas controlam Bogotá."
      }
    ]
  },
  {
    ano: "1820",
    titulo: "A trégua com Pablo Morillo",
    texto: "Depois das derrotas espanholas, Bolívar e Morillo negociaram uma trégua em 1820. O acordo estabeleceu regras para a guerra e permitiu uma pausa nos combates.\n\nGuerra ou negociação?",
    opcoes: [
      {
        texto: "Usar a trégua para se preparar: reorganizar o exército e conseguir recursos.",
        efeitos: { popular: -1, recursos: 1, militar: 2 },
        consequencia: "O exército se reorganiza e ganha força, mas a pausa parece uma jogada de guerra e a desconfiança cresce."
      },
      {
        texto: "Buscar um acordo definitivo: tentar resolver o conflito pela diplomacia.",
        efeitos: { popular: 1, elites: 1, recursos: -1, militar: -1 },
        conc: 1,
        consequencia: "Ganha prestígio e simpatia internacional, mas o exército fica estagnado e a Espanha pode não aceitar a independência."
      }
    ]
  },
  {
    ano: "1821",
    titulo: "Carabobo: e depois da vitória?",
    texto: "Em 24 de junho de 1821 aconteceu a Batalha de Carabobo. As forças patriotas, comandadas por Bolívar e com participação importante de José Antonio Páez e dos llaneros, derrotaram o exército espanhol. A vitória permitiu recuperar Caracas e consolidar a independência venezuelana.\n\nO que fazer agora?",
    opcoes: [
      {
        texto: "Consolidar a Venezuela: organizar o governo e reconstruir o território.",
        efeitos: { popular: 1, elites: 2, recursos: 1, militar: -2 },
        consequencia: "O país começa a se reorganizar e a economia respira, mas outras regiões continuam sob domínio espanhol."
      },
      {
        texto: "Continuar a guerra: usar a vitória para ajudar na libertação de outras regiões.",
        efeitos: { popular: -1, recursos: -1, militar: 2 },
        consequencia: "A libertação avança pela América do Sul, mas as tropas se cansam e os cofres se esvaziam."
      }
    ]
  },

  // ---------- PARTE 3: 1821–1830 ----------
  {
    ano: "1821–1825",
    titulo: "A construção da Grã-Colômbia",
    texto: "Com a independência garantida, você cria a Grã-Colômbia, unindo Venezuela, Colômbia, Equador e Panamá. O vasto território tem enormes diferenças culturais.\n\nComo estruturar o governo dessa nova superpotência?",
    opcoes: [
      {
        texto: "Centralismo: governo forte e centralizado em Bogotá.",
        efeitos: { elites: -2, recursos: 1, militar: 1 },
        flag: "centralismo",
        consequencia: "Garante estabilidade militar inicial, mas irrita as elites da Venezuela, lideradas por Páez, que perdem poder."
      },
      {
        texto: "Federalismo: dar autonomia política e econômica às regiões.",
        efeitos: { popular: 1, elites: 2, recursos: -1, militar: -1 },
        conc: 1,
        flag: "federalismo",
        consequencia: "Agrada líderes locais e ganha apoio, mas esvazia os cofres do governo e facilita o separatismo."
      }
    ]
  },
  {
    ano: "1826",
    titulo: "A rebelião de Páez: La Cosiata",
    texto: "Enquanto você está no sul, José Antonio Páez lidera um movimento separatista na Venezuela. Bogotá exige que Páez seja punido por traição, e você retorna para lidar com seu antigo aliado.\n\nO que fazer?",
    opcoes: [
      {
        texto: "Mão de ferro: enviar tropas e destituir Páez para impor a lei.",
        efeitos: { popular: -3, elites: 1, recursos: -1, militar: 1 },
        ferro: 1,
        consequencia: "Fortalece a autoridade central, mas causa uma guerra civil sangrenta e destrói seu apoio entre os llaneros."
      },
      {
        texto: "Conciliação: perdoar Páez e fazer concessões para salvar a união.",
        efeitos: { popular: 1, elites: 2, recursos: -1, militar: -1 },
        conc: 1,
        consequencia: "Evita a guerra imediata, mas desmoraliza o governo e mostra que rebeliões funcionam."
      },
      {
        texto: "Lealdade pessoal: lembrar Páez dos cargos e terras que recebeu e pedir que recue sem punição.",
        requer: "paezRecompensado",
        efeitos: { elites: 1, recursos: -1, militar: 1 },
        conc: 1,
        consequencia: "Páez recua em parte, mas a Cosiata mostra que seus antigos aliados já pensam em si mesmos."
      },
      {
        texto: "Apelo ao povo: dirigir-se diretamente aos llaneros e ao povo, isolando Páez.",
        requer: "projetoColetivo",
        efeitos: { popular: 2, elites: -2, recursos: -1, militar: 1 },
        consequencia: "O povo se lembra do projeto coletivo e Páez perde apoio, mas as elites regionais se sentem ameaçadas."
      }
    ]
  },
  {
    ano: "1828",
    titulo: "O colapso e a última cartada",
    texto: "A Grã-Colômbia está ingovernável e à beira da desintegração total. O Congresso fracassa e o país trava. Aliados pedem que você tome medidas extremas para salvar o projeto.\n\nO que fazer?",
    opcoes: [
      {
        texto: "A ditadura: dissolver o Congresso e assumir poderes absolutos.",
        efeitos: { popular: -2, elites: 1, recursos: 1, militar: 1 },
        ferro: 1,
        consequencia: "Mantém o país unido à força, mas mancha sua imagem de 'Libertador' e atrai tentativas de assassinato."
      },
      {
        texto: "Renúncia: aceitar o fracasso do projeto e renunciar ao poder.",
        efeitos: { popular: 1, elites: -1, recursos: -1, militar: -1 },
        conc: 1,
        consequencia: "A Grã-Colômbia se fragmenta imediatamente, mas você evita novos banhos de sangue e preserva sua honra."
      },
      {
        texto: "Novo pacto federal: propor às regiões um acordo de autonomia com um governo central enxuto.",
        requer: "federalismo",
        efeitos: { popular: 1, elites: 2, recursos: -1, militar: -1 },
        conc: 1,
        consequencia: "Como você já havia dado autonomia às regiões, o pacto encontra ouvidos, mas o governo central sai enfraquecido e sem dinheiro."
      }
    ]
  }
];

// Finais: o código confere do mais raro ao mais comum.
const finais = [
  {
    titulo: "O Triunfo da Pátria Grande",
    texto: "Suas negociações e alianças funcionam. A Grã-Colômbia supera as crises, a nação prospera unida e forte. Você se aposenta como o verdadeiro arquiteto de uma superpotência sul-americana.",
    condicao: e => e.popular >= 8 && e.elites >= 6 && e.recursos >= 3 && e.conc >= 4
  },
  {
    titulo: "A Tirania de Sangue",
    texto: "Sua obsessão por manter o território unido à força causa uma guerra civil devastadora. A economia é destruída, antigos aliados morrem e você é deposto, entrando para a história como um ditador.",
    condicao: e => e.ferro >= 3 || (e.militar >= 9 && e.popular <= 2)
  },
  {
    titulo: "A Independência Fragmentada",
    texto: "A Venezuela é independente, mas sem o apoio das elites o novo Estado nasce dividido, e cada região segue o seu próprio caminho.",
    condicao: e => e.elites <= 2
  },
  {
    titulo: "A Vitória Pírrica",
    texto: "A Venezuela conquista a independência, mas os cofres estão vazios e o país nasce arruinado, dependente de empréstimos e de acordos difíceis.",
    condicao: e => e.recursos <= 1
  },
  {
    titulo: "O Arado no Mar",
    texto: "As ambições regionais falam mais alto. A Grã-Colômbia é dissolvida em 1830. A Venezuela se torna independente sob Páez, que te expulsa. Você morre no exílio lamentando que 'arou no mar', mas deixa um legado imortal.",
    condicao: () => true // final padrão
  }
];

// ===== MÍDIA =====
// volume: ajuste de cada trilha (as faixas têm volumes originais diferentes)
const musicas = {
  marcha:  { src: "assets/musica/marcha-venezolana.mp3", volume: 0.9 },
  oracao:  { src: "assets/musica/oracao-barroca.mp3",    volume: 1.0 },
  tensao:  { src: "assets/musica/tensao-dramatica.mp3",  volume: 0.87 },
  batalha: { src: "assets/musica/batalha-epica.mp3",     volume: 0.41 },
  pulso:   { src: "assets/musica/pulso-de-caracas.mp3",  volume: 0.68 }
};

const IMG = {
  terremoto:  { src: "assets/imagens/terremoto-1812.jpg",        legenda: "Cena do terremoto de Caracas, em 1812 (pintura)." },
  campanha:   { src: "assets/imagens/campanha-admiravel.jpg",    legenda: "A Campanha Admirável (1813). Infográfico de David Leonet, Revista Memorias de Venezuela." },
  llaneros:   { src: "assets/imagens/llaneros.jpg",              legenda: "Cavaleiros cruzando as planícies venezuelanas (gravura do século XIX)." },
  libertador: { src: "assets/imagens/bolivar-cavalo.jpg",        legenda: "Bolívar a cavalo, recebido pela população (pintura)." },
  mapa:       { src: "assets/imagens/mapa-venezuela.jpg",        legenda: "Mapa da Venezuela, Encyclopaedia Britannica, 9ª edição (século XIX)." }
};

// Mídia de cada situação, na mesma ordem do array "situacoes"
const midiaSituacao = [
  { musica: "oracao",  imagem: "terremoto" }, // 1812 terremoto
  { musica: "tensao",  imagem: "campanha" },  // 1813 decreto
  { musica: "batalha", imagem: "llaneros" },  // 1814 Boves
  { musica: "tensao" },                       // 1815 exílio
  { musica: "marcha" },                       // 1816 Jamaica e Haiti
  { musica: "pulso" },                        // 1818 Páez e llaneros
  { musica: "batalha" },                      // 1819 Andes e Boyacá
  { musica: "oracao" },                       // 1820 trégua com Morillo
  { musica: "batalha", imagem: "libertador" },// 1821 Carabobo
  { musica: "marcha" },                       // 1821–1825 Grã-Colômbia
  { musica: "pulso",   imagem: "mapa" },      // 1826 La Cosiata
  { musica: "tensao" }                        // 1828 colapso
];

// Fase de cada situação (define o fundo, veja o style.css): 1, 2 ou 3
const faseSituacao = [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3];

// Música de cada final
const musicaFinal = {
  "O Triunfo da Pátria Grande": "marcha",
  "A Tirania de Sangue": "batalha",
  "A Independência Fragmentada": "pulso",
  "A Vitória Pírrica": "tensao",
  "O Arado no Mar": "oracao"
};

// "O que realmente aconteceu", mostrado no resumo final
const historiaSituacao = [
  "Em 26 de março de 1812 um terremoto destruiu Caracas e outras cidades. O clero realista o apresentou como castigo divino pela rebelião, e a Primeira República caiu poucos meses depois, em julho de 1812.",
  "Em 15 de junho de 1813, em Trujillo, Bolívar assinou o Decreto de Guerra a Morte: espanhóis e canários que não apoiassem a independência seriam executados, e os americanos seriam poupados.",
  "Os llaneros de Boves derrotaram os patriotas e a Segunda República caiu. Em julho de 1814 Bolívar evacuou Caracas e milhares de pessoas fugiram para o leste, na Emigração para o Oriente. Boves morreu em dezembro de 1814, na batalha de Urica.",
  "Em 1815 Morillo chegou à Venezuela com mais de 10 mil soldados e retomou o território. Bolívar partiu para a Jamaica e, em setembro, escreveu a Carta da Jamaica, defendendo a independência de toda a América Espanhola.",
  "Em 1816 Pétion ajudou Bolívar com armas e recursos e pediu que ele libertasse os escravizados. Bolívar decretou a liberdade dos que se juntassem à luta, mas a abolição completa na Venezuela só veio em 1854.",
  "Em 1818 Páez e seus llaneros passaram a reconhecer Bolívar como chefe supremo, mas mantiveram grande autonomia nos llanos. A cavalaria llanera foi decisiva nas batalhas seguintes, inclusive em Carabobo.",
  "Em fevereiro de 1819 Bolívar apresentou suas ideias ao Congresso de Angostura. Meses depois atravessou os Andes pelo páramo de Pisba, com perdas enormes, e derrotou os realistas em Boyacá, em 7 de agosto de 1819, abrindo caminho até Bogotá.",
  "Em novembro de 1820 Bolívar e Morillo assinaram em Trujillo um armistício de seis meses e um tratado que regulava a guerra, com tratamento humano de prisioneiros. Morillo voltou à Espanha pouco depois, e os combates recomeçaram em 1821.",
  "Em 24 de junho de 1821 Bolívar venceu em Carabobo e entrou em Caracas poucos dias depois. A guerra continuou em outras regiões: Sucre venceu em Pichincha (1822) e em Ayacucho (1824), que selou a independência do Peru.",
  "Em 1821 o Congresso de Cúcuta aprovou a constituição da Grã-Colômbia, centralista, com capital em Bogotá. Bolívar foi presidente e Santander, vice. Muitos venezuelanos, entre eles Páez, reclamavam do poder concentrado em Bogotá.",
  "Em 1826 a Cosiata, movimento separatista em Valência, tornou Páez o líder da Venezuela. Bolívar voltou do Peru e, entre o fim de 1826 e o início de 1827, perdoou Páez e o manteve no comando.",
  "Em 1828 a Convenção de Ocaña fracassou. Bolívar assumiu poderes ditatoriais em agosto e sofreu um atentado em Bogotá em 25 de setembro. A Grã-Colômbia se dissolveu em 1830, e Bolívar renunciou e morreu em dezembro daquele ano, em Santa Marta."
];
