// Pontos complementares selecionados para equilibrar natureza, cultura,
// acessibilidade e experiências urbanas no guia.
const additionalTouristSpots = [
  {
    id: 'praia-do-jabaquara', category: 'praias', coords: [-23.7362563, -45.2929289], rating: null, reviews: 0,
    image: 'assets/images/praia-do-jabaquara_verified.jpg', images: ['assets/images/praia-do-jabaquara_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-jabaquara',
    tags: ['Preservada', 'Mirante', 'Acesso por estrada'],
    attributes: { isDiving: true, isSunset: false, isKiosk: true, isWild: true, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '18 km da balsa', duration: '45 min de carro', elevation: 'Nível do mar', access: 'Estrada asfaltada e trecho final de terra', sea: 'Águas claras; atenção às condições do dia', structure: 'Quiosques, restaurantes e estacionamento limitado' },
    translations: { pt: { title: 'Praia do Jabaquara', subtitle: 'A última grande praia do norte acessível por estrada', description: 'Uma das praias mais preservadas e fotogênicas de Ilhabela, com areia clara, dois riachos e um mirante panorâmico antes da descida.', highlights: ['Mirante na estrada', 'Riachos junto à praia', 'Boa opção para famílias', 'Paisagem preservada'], ecoTip: 'Não estacione sobre a vegetação e leve seu lixo de volta.' } }
  },
  {
    id: 'praia-da-feiticeira', category: 'praias', coords: [-23.8453728, -45.4088248], rating: null, reviews: 0,
    image: 'assets/images/praia-da-feiticeira_verified.jpg', images: ['assets/images/praia-da-feiticeira_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-da-feiticeira',
    tags: ['Família', 'Casario histórico', 'Sul da ilha'],
    attributes: { isDiving: true, isSunset: true, isKiosk: false, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '6 km da balsa', duration: '15 min de carro', elevation: 'Nível do mar', access: 'Pequena trilha a partir da avenida', sea: 'Geralmente tranquilo, com profundidade gradual', structure: 'Sem quiosques fixos; serviços nas proximidades' },
    translations: { pt: { title: 'Praia da Feiticeira', subtitle: 'Praia charmosa com casario colonial e lendas locais', description: 'Uma praia conhecida do sul da ilha, cercada por vegetação e marcada pelo antigo casarão colonial em sua extremidade.', highlights: ['Casario colonial', 'Mar para banho', 'Acesso relativamente fácil', 'Lendas de Ilhabela'], ecoTip: 'Use os acessos oficiais e respeite as propriedades vizinhas.' } }
  },
  {
    id: 'praia-do-sino', category: 'praias', coords: [-23.7480131, -45.3477460], rating: null, reviews: 0,
    image: 'assets/images/praia-do-sino_verified.jpg', images: ['assets/images/praia-do-sino_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-sino-garapocaia',
    tags: ['Família', 'Pedra do Sino', 'Caiaque'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '12 km da balsa', duration: '30 min de carro', elevation: 'Nível do mar', access: 'Avenida principal, ônibus ou carro', sea: 'Raso e geralmente calmo', structure: 'Quiosques, aluguel de equipamentos e estacionamento' },
    translations: { pt: { title: 'Praia do Sino — Garapocaia', subtitle: 'Pedras sonoras e mar tranquilo para toda a família', description: 'A famosa Pedra do Sino divide a atenção com uma praia rasa e calma, muito procurada por famílias, caiaques e stand up paddle.', highlights: ['Pedras que produzem som metálico', 'Mar raso', 'Boa estrutura', 'Esportes náuticos'], ecoTip: 'Não risque nem danifique as pedras; preserve a formação natural.' } }
  },
  {
    id: 'centro-historico-vila', category: 'cultura', coords: [-23.7789503, -45.3589133], rating: null, reviews: 0,
    image: 'assets/images/centro-historico_verified.jpg', images: ['assets/images/centro-historico_verified.jpg'],
    photoCredit: 'Sectur Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15433/centro-historico-de-ilhabela-cultura-gastronomia-e-paisagens-em-um-so-lugar',
    tags: ['História', 'Gastronomia', 'Vida noturna'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '6 km da balsa', duration: '2 h a meio dia', elevation: 'Trechos planos', access: 'Carro, ônibus, bicicleta ou táxi', sea: 'Orla protegida do canal', structure: 'Museus, igreja, píer, lojas, cafés e restaurantes' },
    translations: { pt: { title: 'Centro Histórico — Vila', subtitle: 'O coração cultural, gastronômico e noturno de Ilhabela', description: 'Um passeio que reúne a Rua do Meio, a Igreja Nossa Senhora D’Ajuda, o Museu Náutico, o píer e construções que contam a história da antiga Vila Bela da Princesa.', highlights: ['Rua do Meio', 'Igreja Nossa Senhora D’Ajuda', 'Museu Náutico', 'Restaurantes e vida noturna'], ecoTip: 'Priorize o deslocamento a pé pela Vila e descarte resíduos nos pontos adequados.' } }
  },
  {
    id: 'fazenda-engenho-dagua', category: 'cultura', coords: [-23.7923142, -45.3640274], rating: null, reviews: 0,
    image: 'assets/images/fazenda-engenho-dagua_verified.jpg', images: ['assets/images/fazenda-engenho-dagua_verified.jpg'],
    photoCredit: 'Prefeitura de Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/17580/fazenda-engenho-dagua-em-ilhabela-um-lugar-de-historia-cultura-e-memoria-preservadas/',
    tags: ['Patrimônio', 'Museu', 'Arquitetura colonial'],
    attributes: { isDiving: false, isSunset: false, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '4 km da balsa', duration: '1 h a 2 h', elevation: 'Terreno quase plano', access: 'Avenida principal, carro, ônibus ou bicicleta', sea: 'Não se aplica', structure: 'Museu, café e programação cultural variável' },
    translations: { pt: { title: 'Fazenda Engenho D’Água', subtitle: 'Patrimônio colonial e memória afro-brasileira', description: 'Antigo centro produtor de açúcar e aguardente, hoje preservado como patrimônio histórico, espaço cultural e sede do Museu da Cultura Afro-Brasileira.', highlights: ['Arquitetura colonial', 'Museu da Cultura Afro-Brasileira', 'Café do Engenho', 'Eventos culturais'], ecoTip: 'Respeite as áreas sinalizadas e não toque nas peças históricas.' } }
  },
  {
    id: 'mirante-do-piuva', category: 'mirantes', coords: [-23.8258167, -45.3840197], rating: null, reviews: 0,
    image: 'assets/images/mirante-do-piuva_verified.jpg', images: ['assets/images/mirante-do-piuva_verified.jpg'],
    photoCredit: 'Prefeitura de Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15401/10-mirantes-de-ilhabela-para-apreciar-a-vista-do-arquipelago',
    tags: ['Pôr do sol', 'Acesso fácil', 'Fotografia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: false, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '2,5 km da balsa', duration: '20 a 40 min', elevation: 'Mirante rodoviário', access: 'Carro, bicicleta ou caminhada', sea: 'Vista para o Canal de São Sebastião', structure: 'Parada breve com letreiro turístico' },
    translations: { pt: { title: 'Mirante do Piúva', subtitle: 'Pôr do sol com vista para o canal e a Ilha das Cabras', description: 'Uma parada rápida e acessível logo ao sul da balsa, com vista ampla do canal, do continente e da Ilha das Cabras.', highlights: ['Letreiro de Ilhabela', 'Pôr do sol', 'Vista do canal', 'Próximo à balsa'], ecoTip: 'Pare somente em local permitido e não caminhe pela pista.' } }
  },
  {
    id: 'saco-do-eustaquio', category: 'praias', coords: [-23.8358333, -45.2386111], rating: null, reviews: 0,
    image: 'assets/images/saco-do-eustaquio_verified.jpg', images: ['assets/images/saco-do-eustaquio_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-saco-do-eustaquio/',
    tags: ['Barco', 'Snorkel', 'Comunidade caiçara'],
    attributes: { isDiving: true, isSunset: false, isKiosk: true, isWild: true, isFamily: true, isSurf: false, is4x4: true },
    specs: { difficulty: 'moderate', distance: 'Acesso marítimo', duration: 'Passeio de meio dia ou dia inteiro', elevation: 'Nível do mar', access: 'Barco ou lancha', sea: 'Abrigado, calmo e transparente', structure: 'Pequena comunidade com alimentação caiçara' },
    translations: { pt: { title: 'Saco do Eustáquio', subtitle: 'Águas cristalinas e parada clássica dos passeios de barco', description: 'Uma enseada protegida na costa leste, conhecida pela transparência da água, mergulho livre e acolhimento da pequena comunidade caiçara.', highlights: ['Água cristalina', 'Snorkel', 'Passeio de barco', 'Cultura caiçara'], ecoTip: 'Não ancore sobre corais e mantenha distância das redes de pesca.' } }
  },
  {
    id: 'praia-do-pereque', category: 'praias', coords: [-23.8096508, -45.3658706], rating: null, reviews: 0,
    image: 'assets/images/praia-do-pereque_verified.jpg', images: ['assets/images/praia-do-pereque_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-pereque',
    tags: ['Urbana', 'Ciclovia', 'Gastronomia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '2 km da balsa', duration: '1 h a meio dia', elevation: 'Orla plana', access: 'Carro, ônibus, bicicleta ou caminhada', sea: 'Canal geralmente calmo', structure: 'Restaurantes, comércio, ciclovia e esportes náuticos' },
    translations: { pt: { title: 'Praia do Perequê', subtitle: 'A base urbana para começar a explorar Ilhabela', description: 'Uma praia central com ciclovia, comércio, restaurantes e atividades náuticas. É também onde fica a réplica da baleia Pipoca.', highlights: ['Ciclovia à beira-mar', 'Réplica da baleia Pipoca', 'Restaurantes', 'Fácil acesso'], ecoTip: 'Use a ciclovia e os pontos de coleta disponíveis na orla.' } }
  },
  {
    id: 'praia-do-poco', category: 'praias', coords: [-23.7576167, -45.2560667], rating: null, reviews: 0,
    image: 'assets/images/praia-do-poco_verified.jpg', images: ['assets/images/praia-do-poco_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-poco',
    tags: ['Remota', 'Cachoeira', 'Barco'],
    attributes: { isDiving: true, isSunset: false, isKiosk: false, isWild: true, isFamily: false, isSurf: false, is4x4: true },
    specs: { difficulty: 'hard', distance: 'Trilha longa ou acesso marítimo', duration: 'Dia inteiro', elevation: 'Trechos de trilha irregulares', access: 'Preferencialmente barco; trilha somente com guia', sea: 'Enseada abrigada em condições favoráveis', structure: 'Sem estrutura comercial' },
    translations: { pt: { title: 'Praia do Poço', subtitle: 'Onde a cachoeira encontra o mar em uma praia remota', description: 'Uma praia isolada do norte com rio, pequena cachoeira e lagoa de água doce, indicada para passeios marítimos ou trilhas acompanhadas.', highlights: ['Lagoa de água doce', 'Cachoeira na praia', 'Mergulho livre', 'Paisagem remota'], ecoTip: 'Faça a trilha apenas com guia experiente e nunca deixe resíduos no local.' } }
  },
  {
    id: 'piscinas-naturais-do-sul', category: 'trilhas', coords: [-23.8929458, -45.4604399], rating: null, reviews: 0,
    image: 'assets/images/piscinas-naturais_verified.jpg', images: ['assets/images/piscinas-naturais_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/trilhas/piscinas-naturais/',
    tags: ['Piscina natural', 'Costeira', 'Fotografia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: false, isWild: true, isFamily: false, isSurf: false, is4x4: false },
    specs: { difficulty: 'moderate', distance: 'Trilha curta sobre costeira', duration: '1 h a 2 h', elevation: 'Trechos sobre pedras', access: 'Portão sinalizado e caminhada pela costeira', sea: 'Visite somente com mar calmo e tempo firme', structure: 'Sem estrutura; propriedade particular no acesso' },
    translations: { pt: { title: 'Piscinas Naturais do Sul', subtitle: 'Poço de água salgada entre as pedras da costeira', description: 'Uma formação rochosa que cria uma piscina natural voltada para o sul. O acesso exige calçado adequado e avaliação cuidadosa do mar.', highlights: ['Formação rochosa singular', 'Vista para Alcatrazes', 'Água transparente', 'Fotografia'], ecoTip: 'Não visite com mar agitado, chuva ou pedras molhadas; use tênis e respeite os moradores.' } }
  }
];

touristSpots.push(...additionalTouristSpots);
