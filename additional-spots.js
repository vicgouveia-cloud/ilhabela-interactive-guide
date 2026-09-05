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
  },
  {
    id: 'praia-grande', category: 'praias', coords: [-23.8577515, -45.4163499], rating: null, reviews: 0,
    image: 'assets/images/praia-grande_verified.jpg', images: ['assets/images/praia-grande_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-grande/',
    tags: ['Família', 'Estrutura completa', 'Esportes'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '7 km da balsa', duration: '1 h a meio dia', elevation: 'Orla plana', access: 'Carro, ônibus ou bicicleta pela avenida', sea: 'Praia de tombo; atenção com crianças', structure: 'Calçadão, restaurantes, quadras, duchas e estacionamento' },
    translations: { pt: { title: 'Praia Grande', subtitle: 'Uma das praias mais completas e acessíveis do sul', description: 'Com cerca de 600 metros de faixa de areia, é uma escolha prática para famílias e grupos que procuram mar, alimentação e esportes no mesmo lugar.', highlights: ['Ampla faixa de areia', 'Quadras e calçadão', 'Restaurantes', 'Fácil acesso'], ecoTip: 'Observe as condições do mar e descarte resíduos nos coletores da orla.' } }
  },
  {
    id: 'praia-do-portinho', category: 'praias', coords: [-23.8437449, -45.4043884], rating: null, reviews: 0,
    image: 'assets/images/praia-do-portinho_verified.jpg', images: ['assets/images/praia-do-portinho_verified.jpg'],
    photoCredit: 'Marcelo Carbono · Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-portinho',
    tags: ['Snorkel', 'Tartarugas', 'Capela histórica'],
    attributes: { isDiving: true, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '4 km da balsa', duration: '1 h a meio dia', elevation: 'Nível do mar', access: 'Carro, ônibus ou bicicleta pela avenida', sea: 'Enseada pequena; boa visibilidade em dias favoráveis', structure: 'Píer, rampa acessível, quiosques e poucas vagas' },
    translations: {
  pt: { 
    title: 'Praia do Portinho', 
    subtitle: 'Pequena enseada com píer, tartarugas e tradição caiçara', 
    description: 'Parte do Santuário Ecológico Submarino, combina mergulho livre, um píer agradável e a Capela de Santo Antônio, construída em 1938.', 
    highlights: ['Santuário submarino', 'Capela de Santo Antônio', 'Píer acessível', 'Possível avistamento de tartarugas'], 
    ecoTip: 'Não toque nos animais e não retire conchas ou organismos do santuário.',
    specs: {
      distance: '4 km da balsa',
      duration: '1 h a meio dia',
      elevation: 'Nível do mar',
      access: 'Carro, ônibus ou bicicleta pela avenida',
      sea: 'Enseada pequena; boa visibilidade em dias favoráveis',
      structure: 'Píer, rampa acessível, quiosques e poucas vagas'
    }
  },
  en: { 
    title: 'Praia do Portinho', 
    subtitle: 'Small cove with a pier, turtles, and caiçara tradition', 
    description: 'Part of the Underwater Ecological Sanctuary, it combines free diving, a pleasant pier, and the Santo Antônio Chapel, built in 1938.', 
    highlights: ['Underwater sanctuary', 'Santo Antônio Chapel', 'Accessible pier', 'Possible turtle sightings'], 
    ecoTip: 'Do not touch the animals and do not remove shells or organisms from the sanctuary.',
    specs: {
      distance: '4 km from the ferry',
      duration: '1 h to half day',
      elevation: 'Sea level',
      access: 'Car, bus or bike via avenue',
      sea: 'Small cove; good visibility on favorable days',
      structure: 'Pier, accessible ramp, kiosks and limited parking'
    }
  },
  fr: { 
    title: 'Praia do Portinho', 
    subtitle: 'Petite anse avec jetée, tortues et tradition caiçara', 
    description: 'Faisant partie du sanctuaire écologique sous-marin, elle combine la plongée libre, une jetée agréable et la chapelle Santo Antônio, construite en 1938.', 
    highlights: ['Sanctuaire sous-marin', 'Chapelle Santo Antônio', 'Jetée accessible', 'Observation possible de tortues'], 
    ecoTip: 'Ne touchez pas aux animaux et ne retirez ni coquillages ni organismes du sanctuaire.',
    specs: {
      distance: 'À 4 km du ferry',
      duration: '1 h à une demi-journée',
      elevation: 'Niveau de la mer',
      access: 'Voiture, bus ou vélo par l\'avenue',
      sea: 'Petite anse ; bonne visibilité les jours favorables',
      structure: 'Jetée, rampe accessible, kiosques et peu de places de stationnement'
    }
  },
  es: { 
    title: 'Praia do Portinho', 
    subtitle: 'Pequeña ensenada con muelle, tortugas y tradición caiçara', 
    description: 'Parte del Santuario Ecológico Submarino, combina buceo libre, un muelle agradable y la Capilla de Santo Antônio, construida en 1938.', 
    highlights: ['Santuario submarino', 'Capilla de Santo Antônio', 'Muelle accesible', 'Posible avistamiento de tortugas'], 
    ecoTip: 'No toques a los animales y no retires conchas ni organismos del santuario.',
    specs: {
      distance: '4 km del ferry',
      duration: '1 h a medio día',
      elevation: 'Nivel del mar',
      access: 'Coche, autobús o bicicleta por la avenida',
      sea: 'Ensenada pequeña; buena visibilidad en días favorables',
      structure: 'Muelle, rampa accesible, quioscos y poco estacionamiento'
    }
  },
  he: { 
    title: 'Praia do Portinho', 
    subtitle: 'מפרצון קטן עם מזח, צבים ומסורת קאיסרה', 
    description: 'חלק מהשמורה האקולוגית התת-ימית, משלב צלילה חופשית, מזח נעים וקפלת סנטו אנטוניו שנבנתה ב-1938.', 
    highlights: ['שמורה תת-ימית', 'קפלת סנטו אנטוניו', 'מזח נגיש', 'אפשרות לתצפית צבים'], 
    ecoTip: 'אל תגעו בבעלי החיים ואל תוציאו צדפות או אורגניזמים מהשמורה.',
    specs: {
      distance: '4 ק"מ מהמעבורת',
      duration: 'שעה עד חצי יום',
      elevation: 'גובה פני הים',
      access: 'רכב, אוטובוס או אופניים דרך השדרה',
      sea: 'מפרצון קטן; ראות טובה בימים נוחים',
      structure: 'מזח, רמפה נגישה, קיוסקים וחניה מוגבלת'
    }
  }
}
  }
];

touristSpots.push(...additionalTouristSpots);

// Recomendações locais por atração. A atração continua sendo o conteúdo principal.
const localRecommendations = {
  'praia-do-veloso': [
    {
      category: 'tour',
      type: 'Passeios e ecoturismo',
      name: 'Chagas Passeios',
      tagline: 'Nascida na Praia do Veloso em 2009',
      description: 'Empresa de aventura e ecoturismo nascida na Praia do Veloso, com passeios marítimos e terrestres por diferentes regiões de Ilhabela.',
      tags: ['Passeios de lancha', '4x4', 'Castelhanos', 'Bonete', 'Snorkeling', 'Costa Norte'],
      whatsapp: '12974017333',
      whatsappDisplay: '+55 (12) 97401-7333',
      image: 'assets/images/chagas-passeios.jpg'
    }
  ],

  'praia-do-portinho': [
    { category: 'tour', type: 'Passeios e atividades', name: 'Portinho Passeios', tagline: 'Roteiros paradisíacos do jeitinho caiçara', description: 'Passeios de barco com saída e atendimento na Praia do Portinho, além de locação de equipamentos para aproveitar o mar.', features: ['Passeio de barco', 'Caiaque', 'Stand Up Paddle', 'Canoa Caiçara', 'Bodyboard', 'Máscara de mergulho', 'Pet Friendly'], alsoOffers: ['repelente', 'porta-celular para água', 'acessórios de praia'], whatsapp: '19991536623', whatsappDisplay: '(19) 99153-6623', instagram: '@portinhopasseios', url: 'http://www.portinhopasseios.com.br', image: 'assets/images/portinho-passeios.jpg' },
    { category: 'food', type: 'Alimentação e bebidas', name: 'Quiosque Maxx Beach', description: 'Quiosque na Praia do Portinho com serviço de bar, porções e caipirinhas. Entre os destaques está a caipirinha com folhas de mexerica.', tags: ['Bar na praia', 'Porções', 'Caipirinhas'], highlightTitle: 'Destaque editorial', highlightDesc: 'Caipirinha com folhas de mexerica', whatsapp: '11912586558', whatsappDisplay: '(11) 91258-6558', image: 'assets/images/maxx-beach.jpg' },
    { category: 'diving', type: 'Mergulho', name: 'Portinho Divers', description: 'Centro de mergulho na Praia do Portinho com mergulho de batismo acompanhado por profissional e equipamentos inclusos.', features: ['Mergulho de batismo', 'Equipamentos', 'Fotos e vídeos', 'Experiência para iniciantes'], whatsapp: '12987046807', whatsappDisplay: '(12) 98704-6807', url: 'https://mergulhoilhabela.com.br', image: 'assets/images/portinho-divers.jpg' }
  ]
};

const localAccommodations = {
  'praia-do-portinho': [
    { category: 'stay', type: 'Hospedagem recomendada', name: 'La Gloria House', description: 'Guest House próxima à Praia do Portinho, com suítes privativas, cabana e piscina com vista para a Mata Atlântica.', features: ['A cerca de 5 min da Praia do Portinho', 'Suítes para 2 a 4 pessoas', 'Cabana', 'Piscina', 'Wi-Fi', 'Ar-condicionado', 'Frigobar'], whatsapp: '11975199989', whatsappDisplay: '(11) 97519-9989', url: 'https://lagloriahouse.com.br', image: 'assets/images/la-gloria-house.jpg' }
  ]
};

// Traduções dos conteúdos locais. Nomes comerciais, contatos e URLs permanecem invariáveis.
const localRecommendationTranslations = {
  'Chagas Passeios': {
    pt: { type: 'Passeios e ecoturismo', tagline: 'Nascida na Praia do Veloso em 2009', description: 'Empresa de aventura e ecoturismo nascida na Praia do Veloso, com passeios marítimos e terrestres por diferentes regiões de Ilhabela.', tags: ['Passeios de lancha', '4x4', 'Castelhanos', 'Bonete', 'Snorkeling', 'Costa Norte'] },
    en: { type: 'Tours and ecotourism', tagline: 'Founded at Praia do Veloso in 2009', description: 'Adventure and ecotourism company founded at Praia do Veloso, offering sea and land tours across different areas of Ilhabela.', tags: ['Boat tours', '4x4', 'Castelhanos', 'Bonete', 'Snorkeling', 'North Coast'] },
    fr: { type: 'Excursions et écotourisme', tagline: 'Née à Praia do Veloso en 2009', description: 'Entreprise d’aventure et d’écotourisme née à Praia do Veloso, proposant des excursions maritimes et terrestres dans différentes régions d’Ilhabela.', tags: ['Excursions en bateau', '4x4', 'Castelhanos', 'Bonete', 'Snorkeling', 'Côte Nord'] },
    es: { type: 'Paseos y ecoturismo', tagline: 'Nacida en Praia do Veloso en 2009', description: 'Empresa de aventura y ecoturismo nacida en Praia do Veloso, con paseos marítimos y terrestres por distintas regiones de Ilhabela.', tags: ['Paseos en lancha', '4x4', 'Castelhanos', 'Bonete', 'Snorkeling', 'Costa Norte'] },
    he: { type: 'סיורים ותיירות אקולוגית', tagline: 'נוסדה ב-Praia do Veloso בשנת 2009', description: 'חברת הרפתקאות ותיירות אקולוגית שנוסדה ב-Praia do Veloso ומציעה סיורים ימיים ויבשתיים באזורים שונים של Ilhabela.', tags: ['סיורי סירה', '4x4', 'Castelhanos', 'Bonete', 'שנירקול', 'החוף הצפוני'] }
  },
  'Portinho Passeios': {
    pt: { type: 'Passeios e atividades', tagline: 'Roteiros paradisíacos do jeitinho caiçara', description: 'Passeios de barco com saída e atendimento na Praia do Portinho, além de locação de equipamentos para aproveitar o mar.', features: ['Passeio de barco', 'Caiaque', 'Stand Up Paddle', 'Canoa Caiçara', 'Bodyboard', 'Máscara de mergulho', 'Pet Friendly'], alsoOffers: ['repelente', 'porta-celular para água', 'acessórios de praia'] },
    en: { type: 'Tours and activities', tagline: 'Paradise routes with a local caiçara touch', description: 'Boat tours departing from and serving Praia do Portinho, plus equipment rentals for enjoying the sea.', features: ['Boat tour', 'Kayak', 'Stand Up Paddle', 'Caiçara canoe', 'Bodyboard', 'Diving mask', 'Pet Friendly'], alsoOffers: ['insect repellent', 'waterproof phone pouch', 'beach accessories'] },
    fr: { type: 'Excursions et activités', tagline: 'Des itinéraires paradisiaques à la façon caiçara', description: 'Excursions en bateau au départ de Praia do Portinho et location d’équipements pour profiter de la mer.', features: ['Excursion en bateau', 'Kayak', 'Stand Up Paddle', 'Canoë caiçara', 'Bodyboard', 'Masque de plongée', 'Pet Friendly'], alsoOffers: ['répulsif', 'pochette étanche pour téléphone', 'accessoires de plage'] },
    es: { type: 'Paseos y actividades', tagline: 'Rutas paradisíacas al estilo caiçara', description: 'Paseos en barco con salida y atención en Praia do Portinho, además de alquiler de equipos para disfrutar del mar.', features: ['Paseo en barco', 'Kayak', 'Stand Up Paddle', 'Canoa caiçara', 'Bodyboard', 'Máscara de buceo', 'Pet Friendly'], alsoOffers: ['repelente', 'funda impermeable para celular', 'accesorios de playa'] },
    he: { type: 'סיורים ופעילויות', tagline: 'מסלולים טרופיים בניחוח הקאיסארה המקומי', description: 'סיורי סירה היוצאים מ-Praia do Portinho, לצד השכרת ציוד לפעילויות בים.', features: ['סיור בסירה', 'קיאק', 'Stand Up Paddle', 'קאנו קאיסארה', 'Bodyboard', 'מסכת צלילה', 'Pet Friendly'], alsoOffers: ['דוחה חרקים', 'נרתיק אטום למים לטלפון', 'אביזרי חוף'] }
  },
  'Quiosque Maxx Beach': {
    pt: { type: 'Alimentação e bebidas', description: 'Quiosque na Praia do Portinho com serviço de bar, porções e caipirinhas. Entre os destaques está a caipirinha com folhas de mexerica.', tags: ['Bar na praia', 'Porções', 'Caipirinhas'], highlightTitle: 'Destaque editorial', highlightDesc: 'Caipirinha com folhas de mexerica' },
    en: { type: 'Food and drinks', description: 'Beach kiosk at Praia do Portinho serving drinks, shareable dishes and caipirinhas. One highlight is the caipirinha made with tangerine leaves.', tags: ['Beach bar', 'Shareable dishes', 'Caipirinhas'], highlightTitle: 'Editor’s highlight', highlightDesc: 'Caipirinha with tangerine leaves' },
    fr: { type: 'Restauration et boissons', description: 'Kiosque à Praia do Portinho proposant un service de bar, des portions à partager et des caipirinhas. Parmi les spécialités figure la caipirinha aux feuilles de mandarine.', tags: ['Bar de plage', 'Portions à partager', 'Caipirinhas'], highlightTitle: 'Coup de cœur éditorial', highlightDesc: 'Caipirinha aux feuilles de mandarine' },
    es: { type: 'Comida y bebidas', description: 'Quiosco en Praia do Portinho con servicio de bar, porciones y caipirinhas. Entre sus destacados está la caipirinha con hojas de mandarina.', tags: ['Bar de playa', 'Porciones', 'Caipirinhas'], highlightTitle: 'Destacado editorial', highlightDesc: 'Caipirinha con hojas de mandarina' },
    he: { type: 'אוכל ומשקאות', description: 'קיוסק ב-Praia do Portinho המציע בר, מנות לחלוקה וקאיפיריניה. בין המנות הבולטות נמצאת קאיפיריניה עם עלי מנדרינה.', tags: ['בר על החוף', 'מנות לחלוקה', 'קאיפיריניה'], highlightTitle: 'בחירת המערכת', highlightDesc: 'קאיפיריניה עם עלי מנדרינה' }
  },
  'Portinho Divers': {
    pt: { type: 'Mergulho', description: 'Centro de mergulho na Praia do Portinho com mergulho de batismo acompanhado por profissional e equipamentos inclusos.', features: ['Mergulho de batismo', 'Equipamentos', 'Fotos e vídeos', 'Experiência para iniciantes'] },
    en: { type: 'Diving', description: 'Dive center at Praia do Portinho offering introductory scuba dives accompanied by a professional, with equipment included.', features: ['Introductory scuba dive', 'Equipment included', 'Photos and videos', 'Beginner-friendly experience'] },
    fr: { type: 'Plongée', description: 'Centre de plongée à Praia do Portinho proposant des baptêmes de plongée accompagnés par un professionnel, avec équipement inclus.', features: ['Baptême de plongée', 'Équipement inclus', 'Photos et vidéos', 'Expérience pour débutants'] },
    es: { type: 'Buceo', description: 'Centro de buceo en Praia do Portinho con bautismo de buceo acompañado por un profesional y equipos incluidos.', features: ['Bautismo de buceo', 'Equipos incluidos', 'Fotos y videos', 'Experiencia para principiantes'] },
    he: { type: 'צלילה', description: 'מרכז צלילה ב-Praia do Portinho המציע צלילת היכרות בליווי איש מקצוע, כולל ציוד.', features: ['צלילת היכרות', 'ציוד כלול', 'תמונות וסרטונים', 'מתאים למתחילים'] }
  },
  'La Gloria House': {
    pt: { type: 'Hospedagem recomendada', description: 'Guest House próxima à Praia do Portinho, com suítes privativas, cabana e piscina com vista para a Mata Atlântica.', features: ['A cerca de 5 min da Praia do Portinho', 'Suítes para 2 a 4 pessoas', 'Cabana', 'Piscina', 'Wi-Fi', 'Ar-condicionado', 'Frigobar'] },
    en: { type: 'Recommended accommodation', description: 'Guest house near Praia do Portinho, with private suites, a cabin and a pool overlooking the Atlantic Forest.', features: ['About 5 min from Praia do Portinho', 'Suites for 2 to 4 guests', 'Cabin', 'Pool', 'Wi-Fi', 'Air conditioning', 'Minibar'] },
    fr: { type: 'Hébergement recommandé', description: 'Guest house proche de Praia do Portinho, avec suites privées, cabane et piscine donnant sur la forêt atlantique.', features: ['À environ 5 min de Praia do Portinho', 'Suites pour 2 à 4 personnes', 'Cabane', 'Piscine', 'Wi-Fi', 'Climatisation', 'Minibar'] },
    es: { type: 'Alojamiento recomendado', description: 'Guest house cerca de Praia do Portinho, con suites privadas, cabaña y piscina con vista a la Mata Atlántica.', features: ['A unos 5 min de Praia do Portinho', 'Suites para 2 a 4 personas', 'Cabaña', 'Piscina', 'Wi-Fi', 'Aire acondicionado', 'Minibar'] },
    he: { type: 'לינה מומלצת', description: 'בית הארחה סמוך ל-Praia do Portinho, עם סוויטות פרטיות, בקתה ובריכה הצופה אל היער האטלנטי.', features: ['כ-5 דקות מ-Praia do Portinho', 'סוויטות ל-2 עד 4 אורחים', 'בקתה', 'בריכה', 'Wi-Fi', 'מיזוג אוויר', 'מיני בר'] }
  }
};

// Strings genéricas do renderer, integradas ao sistema i18n existente.
Object.assign(translations.pt, {
  localServicesTitle: 'Serviços e atividades na',
  localServicesSubtitle: 'Conheça os serviços locais para aproveitar ainda mais sua visita.',
  localStayTitle: 'Onde ficar perto da',
  localStaySubtitle: 'Hospedagem recomendada para a sua visita.',
  localAlsoOffers: 'Também oferece:',
  localImagePending: 'Imagem pendente',
  localWebsite: 'Acessar site',
  localWhatsappMessage: 'Olá, vim pelo Ilhabela Guide!'
});
Object.assign(translations.en, {
  localServicesTitle: 'Services and activities at',
  localServicesSubtitle: 'Discover local services to make even more of your visit.',
  localStayTitle: 'Where to stay near',
  localStaySubtitle: 'Recommended accommodation for your visit.',
  localAlsoOffers: 'Also offers:',
  localImagePending: 'Image pending',
  localWebsite: 'Visit website',
  localWhatsappMessage: 'Hello, I found you through Ilhabela Guide!'
});
Object.assign(translations.fr, {
  localServicesTitle: 'Services et activités à',
  localServicesSubtitle: 'Découvrez les services locaux pour profiter encore davantage de votre visite.',
  localStayTitle: 'Où séjourner près de',
  localStaySubtitle: 'Hébergement recommandé pour votre visite.',
  localAlsoOffers: 'Propose également :',
  localImagePending: 'Image à venir',
  localWebsite: 'Visiter le site',
  localWhatsappMessage: 'Bonjour, je vous ai trouvé via Ilhabela Guide !'
});
Object.assign(translations.es, {
  localServicesTitle: 'Servicios y actividades en',
  localServicesSubtitle: 'Conoce los servicios locales para aprovechar aún más tu visita.',
  localStayTitle: 'Dónde alojarse cerca de',
  localStaySubtitle: 'Alojamiento recomendado para tu visita.',
  localAlsoOffers: 'También ofrece:',
  localImagePending: 'Imagen pendiente',
  localWebsite: 'Visitar sitio web',
  localWhatsappMessage: '¡Hola! Los encontré a través de Ilhabela Guide.'
});
Object.assign(translations.he, {
  localServicesTitle: 'שירותים ופעילויות ב',
  localServicesSubtitle: 'הכירו שירותים מקומיים שיעזרו לכם ליהנות עוד יותר מהביקור.',
  localStayTitle: 'איפה ללון ליד',
  localStaySubtitle: 'לינה מומלצת לביקור שלכם.',
  localAlsoOffers: 'מוצעים גם:',
  localImagePending: 'התמונה תתווסף בקרוב',
  localWebsite: 'לאתר',
  localWhatsappMessage: 'שלום, הגעתי אליכם דרך Ilhabela Guide!'
});

function getLocalRecommendationTranslation(item) {
  const byName = localRecommendationTranslations[item?.name] || {};
  return byName[currentLang] || byName.pt || item || {};
}

// app.js é carregado depois deste arquivo. No DOMContentLoaded, substituímos apenas o renderer
// de recomendações pela versão i18n, preservando layout, contatos, imagens e ordem existentes.
document.addEventListener('DOMContentLoaded', () => {
  renderLocalRecommendations = function(spotId) {
    const recs = localRecommendations[spotId] || [];
    const stays = localAccommodations[spotId] || [];
    if (!recs.length && !stays.length) return '';

    const spot = touristSpots.find(item => item.id === spotId);
    const spotTitle = spot ? (getSpotTranslation(spot).title || 'Ilhabela') : 'Ilhabela';
    const renderTags = items => items?.length ? `<div class="flex flex-wrap gap-1.5 pt-1">${items.map(item => `<span class="px-2 py-1 rounded-md bg-surface-container/80 text-[10px] font-semibold text-on-surface-variant border border-black/5 whitespace-nowrap"><span class="material-symbols-outlined text-[12px] text-primary align-middle mr-0.5">check</span>${item}</span>`).join('')}</div>` : '';
    const whatsappLink = item => item.whatsapp ? `<a href="https://wa.me/55${item.whatsapp}?text=${encodeURIComponent(t('localWhatsappMessage'))}" target="_blank" rel="noopener noreferrer" class="flex-1 min-h-11 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">chat</span><span>${item.whatsappDisplay || 'WhatsApp'}</span></a>` : '';
    const siteLink = item => item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-primary text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">language</span><span>${t('localWebsite')}</span></a>` : '';

    let html = '';
    if (recs.length) {
      html += `<section class="pt-6 border-t border-black/10 mt-6 space-y-4"><div><h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">${t('localServicesTitle')} ${spotTitle}</h3><p class="text-xs md:text-sm text-on-surface-variant mt-1">${t('localServicesSubtitle')}</p></div><div class="grid grid-cols-1 gap-5">`;
      html += recs.map(rec => {
        const tr = getLocalRecommendationTranslation(rec);
        const type = tr.type || rec.type || '';
        const tagline = tr.tagline || rec.tagline || '';
        const description = tr.description || rec.description || '';
        const features = tr.features || tr.tags || rec.features || rec.tags;
        const alsoOffers = tr.alsoOffers || rec.alsoOffers;
        const highlightTitle = tr.highlightTitle || rec.highlightTitle;
        const highlightDesc = tr.highlightDesc || rec.highlightDesc;
        return `<article class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group"><div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">${rec.image ? `<img src="${rec.image}" alt="${rec.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async">` : `<div class="w-full h-full bg-surface-container flex flex-col items-center justify-center text-on-surface-variant/50"><span class="material-symbols-outlined text-[32px] mb-2">image</span><span class="text-[10px] uppercase font-bold tracking-wider">${t('localImagePending')}</span></div>`}<div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">${type}</div></div><div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3"><div><h4 class="text-lg font-bold text-primary font-heading leading-tight">${rec.name}</h4>${tagline ? `<p class="text-xs font-semibold text-secondary mt-0.5">${tagline}</p>` : ''}</div><p class="text-xs text-on-surface-variant leading-relaxed">${description}</p>${highlightTitle ? `<div class="bg-primary/5 rounded-lg p-2.5 border-l-2 border-primary"><span class="block text-[10px] font-bold text-primary uppercase mb-0.5">${highlightTitle}</span><span class="text-xs font-semibold text-on-surface-variant">${highlightDesc || ''}</span></div>` : ''}${renderTags(features)}${alsoOffers?.length ? `<p class="text-[11px] text-on-surface-variant"><strong>${t('localAlsoOffers')}</strong> ${alsoOffers.join('; ')}.</p>` : ''}<div class="flex flex-wrap gap-2 pt-2 mt-auto">${whatsappLink(rec)}${rec.instagram ? `<a href="https://instagram.com/${rec.instagram.replace('@','')}" target="_blank" rel="noopener noreferrer" class="min-h-11 py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-primary text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors"><span>@</span><span>Instagram</span></a>` : ''}${siteLink(rec)}</div></div></article>`;
      }).join('');
      html += '</div></section>';
    }

    if (stays.length) {
      html += `<section class="pt-6 border-t border-black/10 mt-6 space-y-4"><div><h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">${t('localStayTitle')} ${spotTitle}</h3><p class="text-xs md:text-sm text-on-surface-variant mt-1">${t('localStaySubtitle')}</p></div><div class="grid grid-cols-1 gap-5">`;
      html += stays.map(stay => {
        const tr = getLocalRecommendationTranslation(stay);
        const type = tr.type || stay.type || '';
        const description = tr.description || stay.description || '';
        const features = tr.features || stay.features;
        return `<article class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group"><div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0"><img src="${stay.image}" alt="${stay.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"><div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">${type}</div></div><div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3"><div><h4 class="text-lg font-bold text-primary font-heading leading-tight">${stay.name}</h4><p class="text-xs text-on-surface-variant leading-relaxed mt-1.5">${description}</p></div>${renderTags(features)}<div class="flex flex-wrap gap-2 pt-2 mt-auto">${whatsappLink(stay)}${siteLink(stay)}</div></div></article>`;
      }).join('');
      html += '</div></section>';
    }

    return html;
  };
});
