// Pontos complementares selecionados para equilibrar natureza, cultura,
// acessibilidade e experiÃªncias urbanas no guia.
const additionalTouristSpots = [
  {
    id: 'praia-do-jabaquara', category: 'praias', coords: [-23.7362563, -45.2929289], rating: null, reviews: 0,
    image: 'assets/images/praia-do-jabaquara_verified.jpg', images: ['assets/images/praia-do-jabaquara_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-jabaquara',
    tags: ['Preservada', 'Mirante', 'Acesso por estrada'],
    attributes: { isDiving: true, isSunset: false, isKiosk: true, isWild: true, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '18 km da balsa', duration: '45 min de carro', elevation: 'NÃ­vel do mar', access: 'Estrada asfaltada e trecho final de terra', sea: 'Ãguas claras; atenÃ§Ã£o Ã s condiÃ§Ãµes do dia', structure: 'Quiosques, restaurantes e estacionamento limitado' },
    translations: { pt: { title: 'Praia do Jabaquara', subtitle: 'A Ãºltima grande praia do norte acessÃ­vel por estrada', description: 'Uma das praias mais preservadas e fotogÃªnicas de Ilhabela, com areia clara, dois riachos e um mirante panorÃ¢mico antes da descida.', highlights: ['Mirante na estrada', 'Riachos junto Ã  praia', 'Boa opÃ§Ã£o para famÃ­lias', 'Paisagem preservada'], ecoTip: 'NÃ£o estacione sobre a vegetaÃ§Ã£o e leve seu lixo de volta.' } }
  },
  {
    id: 'praia-da-feiticeira', category: 'praias', coords: [-23.8453728, -45.4088248], rating: null, reviews: 0,
    image: 'assets/images/praia-da-feiticeira_verified.jpg', images: ['assets/images/praia-da-feiticeira_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-da-feiticeira',
    tags: ['FamÃ­lia', 'Casario histÃ³rico', 'Sul da ilha'],
    attributes: { isDiving: true, isSunset: true, isKiosk: false, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '6 km da balsa', duration: '15 min de carro', elevation: 'NÃ­vel do mar', access: 'Pequena trilha a partir da avenida', sea: 'Geralmente tranquilo, com profundidade gradual', structure: 'Sem quiosques fixos; serviÃ§os nas proximidades' },
    translations: { pt: { title: 'Praia da Feiticeira', subtitle: 'Praia charmosa com casario colonial e lendas locais', description: 'Uma praia conhecida do sul da ilha, cercada por vegetaÃ§Ã£o e marcada pelo antigo casarÃ£o colonial em sua extremidade.', highlights: ['Casario colonial', 'Mar para banho', 'Acesso relativamente fÃ¡cil', 'Lendas de Ilhabela'], ecoTip: 'Use os acessos oficiais e respeite as propriedades vizinhas.' } }
  },
  {
    id: 'praia-do-sino', category: 'praias', coords: [-23.7480131, -45.3477460], rating: null, reviews: 0,
    image: 'assets/images/praia-do-sino_verified.jpg', images: ['assets/images/praia-do-sino_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-sino-garapocaia',
    tags: ['FamÃ­lia', 'Pedra do Sino', 'Caiaque'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '12 km da balsa', duration: '30 min de carro', elevation: 'NÃ­vel do mar', access: 'Avenida principal, Ã´nibus ou carro', sea: 'Raso e geralmente calmo', structure: 'Quiosques, aluguel de equipamentos e estacionamento' },
    translations: { pt: { title: 'Praia do Sino â Garapocaia', subtitle: 'Pedras sonoras e mar tranquilo para toda a famÃ­lia', description: 'A famosa Pedra do Sino divide a atenÃ§Ã£o com uma praia rasa e calma, muito procurada por famÃ­lias, caiaques e stand up paddle.', highlights: ['Pedras que produzem som metÃ¡lico', 'Mar raso', 'Boa estrutura', 'Esportes nÃ¡uticos'], ecoTip: 'NÃ£o risque nem danifique as pedras; preserve a formaÃ§Ã£o natural.' } }
  },
  {
    id: 'centro-historico-vila', category: 'cultura', coords: [-23.7789503, -45.3589133], rating: null, reviews: 0,
    image: 'assets/images/centro-historico_verified.jpg', images: ['assets/images/centro-historico_verified.jpg'],
    photoCredit: 'Sectur Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15433/centro-historico-de-ilhabela-cultura-gastronomia-e-paisagens-em-um-so-lugar',
    tags: ['HistÃ³ria', 'Gastronomia', 'Vida noturna'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '6 km da balsa', duration: '2 h a meio dia', elevation: 'Trechos planos', access: 'Carro, Ã´nibus, bicicleta ou tÃ¡xi', sea: 'Orla protegida do canal', structure: 'Museus, igreja, pÃ­er, lojas, cafÃ©s e restaurantes' },
    translations: { pt: { title: 'Centro HistÃ³rico â Vila', subtitle: 'O coraÃ§Ã£o cultural, gastronÃ´mico e noturno de Ilhabela', description: 'Um passeio que reÃºne a Rua do Meio, a Igreja Nossa Senhora DâAjuda, o Museu NÃ¡utico, o pÃ­er e construÃ§Ãµes que contam a histÃ³ria da antiga Vila Bela da Princesa.', highlights: ['Rua do Meio', 'Igreja Nossa Senhora DâAjuda', 'Museu NÃ¡utico', 'Restaurantes e vida noturna'], ecoTip: 'Priorize o deslocamento a pÃ© pela Vila e descarte resÃ­duos nos pontos adequados.' } }
  },
  {
    id: 'fazenda-engenho-dagua', category: 'cultura', coords: [-23.7923142, -45.3640274], rating: null, reviews: 0,
    image: 'assets/images/fazenda-engenho-dagua_verified.jpg', images: ['assets/images/fazenda-engenho-dagua_verified.jpg'],
    photoCredit: 'Prefeitura de Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/17580/fazenda-engenho-dagua-em-ilhabela-um-lugar-de-historia-cultura-e-memoria-preservadas/',
    tags: ['PatrimÃ´nio', 'Museu', 'Arquitetura colonial'],
    attributes: { isDiving: false, isSunset: false, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '4 km da balsa', duration: '1 h a 2 h', elevation: 'Terreno quase plano', access: 'Avenida principal, carro, Ã´nibus ou bicicleta', sea: 'NÃ£o se aplica', structure: 'Museu, cafÃ© e programaÃ§Ã£o cultural variÃ¡vel' },
    translations: { pt: { title: 'Fazenda Engenho DâÃgua', subtitle: 'PatrimÃ´nio colonial e memÃ³ria afro-brasileira', description: 'Antigo centro produtor de aÃ§Ãºcar e aguardente, hoje preservado como patrimÃ´nio histÃ³rico, espaÃ§o cultural e sede do Museu da Cultura Afro-Brasileira.', highlights: ['Arquitetura colonial', 'Museu da Cultura Afro-Brasileira', 'CafÃ© do Engenho', 'Eventos culturais'], ecoTip: 'Respeite as Ã¡reas sinalizadas e nÃ£o toque nas peÃ§as histÃ³ricas.' } }
  },
  {
    id: 'mirante-do-piuva', category: 'mirantes', coords: [-23.8258167, -45.3840197], rating: null, reviews: 0,
    image: 'assets/images/mirante-do-piuva_verified.jpg', images: ['assets/images/mirante-do-piuva_verified.jpg'],
    photoCredit: 'Prefeitura de Ilhabela', photoSource: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15401/10-mirantes-de-ilhabela-para-apreciar-a-vista-do-arquipelago',
    tags: ['PÃ´r do sol', 'Acesso fÃ¡cil', 'Fotografia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: false, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '2,5 km da balsa', duration: '20 a 40 min', elevation: 'Mirante rodoviÃ¡rio', access: 'Carro, bicicleta ou caminhada', sea: 'Vista para o Canal de SÃ£o SebastiÃ£o', structure: 'Parada breve com letreiro turÃ­stico' },
    translations: { pt: { title: 'Mirante do PiÃºva', subtitle: 'PÃ´r do sol com vista para o canal e a Ilha das Cabras', description: 'Uma parada rÃ¡pida e acessÃ­vel logo ao sul da balsa, com vista ampla do canal, do continente e da Ilha das Cabras.', highlights: ['Letreiro de Ilhabela', 'PÃ´r do sol', 'Vista do canal', 'PrÃ³ximo Ã  balsa'], ecoTip: 'Pare somente em local permitido e nÃ£o caminhe pela pista.' } }
  },
  {
    id: 'saco-do-eustaquio', category: 'praias', coords: [-23.8358333, -45.2386111], rating: null, reviews: 0,
    image: 'assets/images/saco-do-eustaquio_verified.jpg', images: ['assets/images/saco-do-eustaquio_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-saco-do-eustaquio/',
    tags: ['Barco', 'Snorkel', 'Comunidade caiÃ§ara'],
    attributes: { isDiving: true, isSunset: false, isKiosk: true, isWild: true, isFamily: true, isSurf: false, is4x4: true },
    specs: { difficulty: 'moderate', distance: 'Acesso marÃ­timo', duration: 'Passeio de meio dia ou dia inteiro', elevation: 'NÃ­vel do mar', access: 'Barco ou lancha', sea: 'Abrigado, calmo e transparente', structure: 'Pequena comunidade com alimentaÃ§Ã£o caiÃ§ara' },
    translations: { pt: { title: 'Saco do EustÃ¡quio', subtitle: 'Ãguas cristalinas e parada clÃ¡ssica dos passeios de barco', description: 'Uma enseada protegida na costa leste, conhecida pela transparÃªncia da Ã¡gua, mergulho livre e acolhimento da pequena comunidade caiÃ§ara.', highlights: ['Ãgua cristalina', 'Snorkel', 'Passeio de barco', 'Cultura caiÃ§ara'], ecoTip: 'NÃ£o ancore sobre corais e mantenha distÃ¢ncia das redes de pesca.' } }
  },
  {
    id: 'praia-do-pereque', category: 'praias', coords: [-23.8096508, -45.3658706], rating: null, reviews: 0,
    image: 'assets/images/praia-do-pereque_verified.jpg', images: ['assets/images/praia-do-pereque_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-pereque',
    tags: ['Urbana', 'Ciclovia', 'Gastronomia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '2 km da balsa', duration: '1 h a meio dia', elevation: 'Orla plana', access: 'Carro, Ã´nibus, bicicleta ou caminhada', sea: 'Canal geralmente calmo', structure: 'Restaurantes, comÃ©rcio, ciclovia e esportes nÃ¡uticos' },
    translations: { pt: { title: 'Praia do PerequÃª', subtitle: 'A base urbana para comeÃ§ar a explorar Ilhabela', description: 'Uma praia central com ciclovia, comÃ©rcio, restaurantes e atividades nÃ¡uticas. Ã tambÃ©m onde fica a rÃ©plica da baleia Pipoca.', highlights: ['Ciclovia Ã  beira-mar', 'RÃ©plica da baleia Pipoca', 'Restaurantes', 'FÃ¡cil acesso'], ecoTip: 'Use a ciclovia e os pontos de coleta disponÃ­veis na orla.' } }
  },
  {
    id: 'praia-do-poco', category: 'praias', coords: [-23.7576167, -45.2560667], rating: null, reviews: 0,
    image: 'assets/images/praia-do-poco_verified.jpg', images: ['assets/images/praia-do-poco_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-poco',
    tags: ['Remota', 'Cachoeira', 'Barco'],
    attributes: { isDiving: true, isSunset: false, isKiosk: false, isWild: true, isFamily: false, isSurf: false, is4x4: true },
    specs: { difficulty: 'hard', distance: 'Trilha longa ou acesso marÃ­timo', duration: 'Dia inteiro', elevation: 'Trechos de trilha irregulares', access: 'Preferencialmente barco; trilha somente com guia', sea: 'Enseada abrigada em condiÃ§Ãµes favorÃ¡veis', structure: 'Sem estrutura comercial' },
    translations: { pt: { title: 'Praia do PoÃ§o', subtitle: 'Onde a cachoeira encontra o mar em uma praia remota', description: 'Uma praia isolada do norte com rio, pequena cachoeira e lagoa de Ã¡gua doce, indicada para passeios marÃ­timos ou trilhas acompanhadas.', highlights: ['Lagoa de Ã¡gua doce', 'Cachoeira na praia', 'Mergulho livre', 'Paisagem remota'], ecoTip: 'FaÃ§a a trilha apenas com guia experiente e nunca deixe resÃ­duos no local.' } }
  },
  {
    id: 'piscinas-naturais-do-sul', category: 'trilhas', coords: [-23.8929458, -45.4604399], rating: null, reviews: 0,
    image: 'assets/images/piscinas-naturais_verified.jpg', images: ['assets/images/piscinas-naturais_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/trilhas/piscinas-naturais/',
    tags: ['Piscina natural', 'Costeira', 'Fotografia'],
    attributes: { isDiving: false, isSunset: true, isKiosk: false, isWild: true, isFamily: false, isSurf: false, is4x4: false },
    specs: { difficulty: 'moderate', distance: 'Trilha curta sobre costeira', duration: '1 h a 2 h', elevation: 'Trechos sobre pedras', access: 'PortÃ£o sinalizado e caminhada pela costeira', sea: 'Visite somente com mar calmo e tempo firme', structure: 'Sem estrutura; propriedade particular no acesso' },
    translations: { pt: { title: 'Piscinas Naturais do Sul', subtitle: 'PoÃ§o de Ã¡gua salgada entre as pedras da costeira', description: 'Uma formaÃ§Ã£o rochosa que cria uma piscina natural voltada para o sul. O acesso exige calÃ§ado adequado e avaliaÃ§Ã£o cuidadosa do mar.', highlights: ['FormaÃ§Ã£o rochosa singular', 'Vista para Alcatrazes', 'Ãgua transparente', 'Fotografia'], ecoTip: 'NÃ£o visite com mar agitado, chuva ou pedras molhadas; use tÃªnis e respeite os moradores.' } }
  },
  {
    id: 'praia-grande', category: 'praias', coords: [-23.8577515, -45.4163499], rating: null, reviews: 0,
    image: 'assets/images/praia-grande_verified.jpg', images: ['assets/images/praia-grande_verified.jpg'],
    photoCredit: 'Acervo Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-grande/',
    tags: ['FamÃ­lia', 'Estrutura completa', 'Esportes'],
    attributes: { isDiving: false, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '7 km da balsa', duration: '1 h a meio dia', elevation: 'Orla plana', access: 'Carro, Ã´nibus ou bicicleta pela avenida', sea: 'Praia de tombo; atenÃ§Ã£o com crianÃ§as', structure: 'CalÃ§adÃ£o, restaurantes, quadras, duchas e estacionamento' },
    translations: { pt: { title: 'Praia Grande', subtitle: 'Uma das praias mais completas e acessÃ­veis do sul', description: 'Com cerca de 600 metros de faixa de areia, Ã© uma escolha prÃ¡tica para famÃ­lias e grupos que procuram mar, alimentaÃ§Ã£o e esportes no mesmo lugar.', highlights: ['Ampla faixa de areia', 'Quadras e calÃ§adÃ£o', 'Restaurantes', 'FÃ¡cil acesso'], ecoTip: 'Observe as condiÃ§Ãµes do mar e descarte resÃ­duos nos coletores da orla.' } }
  },
  {
    id: 'praia-do-portinho', category: 'praias', coords: [-23.8437449, -45.4043884], rating: null, reviews: 0,
    image: 'assets/images/praia-do-portinho_verified.jpg', images: ['assets/images/praia-do-portinho_verified.jpg'],
    photoCredit: 'Marcelo Carbono Â· Ilhabela.com.br', photoSource: 'https://www.ilhabela.com.br/praias/praia-do-portinho',
    tags: ['Snorkel', 'Tartarugas', 'Capela histÃ³rica'],
    attributes: { isDiving: true, isSunset: true, isKiosk: true, isWild: false, isFamily: true, isSurf: false, is4x4: false },
    specs: { difficulty: 'easy', distance: '4 km da balsa', duration: '1 h a meio dia', elevation: 'NÃ­vel do mar', access: 'Carro, Ã´nibus ou bicicleta pela avenida', sea: 'Enseada pequena; boa visibilidade em dias favorÃ¡veis', structure: 'PÃ­er, rampa acessÃ­vel, quiosques e poucas vagas' },
    translations: { pt: { title: 'Praia do Portinho', subtitle: 'Pequena enseada com pÃ­er, tartarugas e tradiÃ§Ã£o caiÃ§ara', description: 'Parte do SantuÃ¡rio EcolÃ³gico Submarino, combina mergulho livre, um pÃ­er agradÃ¡vel e a Capela de Santo AntÃ´nio, construÃ­da em 1938.', highlights: ['SantuÃ¡rio submarino', 'Capela de Santo AntÃ´nio', 'PÃ­er acessÃ­vel', 'PossÃ­vel avistamento de tartarugas'], ecoTip: 'NÃ£o toque nos animais e nÃ£o retire conchas ou organismos do santuÃ¡rio.' } }
  }
];

touristSpots.push(...additionalTouristSpots);


// Recomendações Locais por Praia
const localRecommendations = {
  'praia-do-portinho': [
    { category: 'tour', type: 'Passeios e atividades', name: 'Portinho Passeios', tagline: 'Roteiros paradisíacos do jeitinho caiçara', description: 'Passeios de barco com saída e atendimento na Praia do Portinho, além de locação de equipamentos para aproveitar o mar.', features: ['Passeio de barco', 'Caiaque', 'Stand Up Paddle', 'Canoa Caiçara', 'Bodyboard', 'Máscara de mergulho'], alsoOffers: ['repelente', 'porta-celular para água', 'acessórios de praia'], whatsapp: '19991536623', whatsappDisplay: '(19) 99153-6623', instagram: '@portinhopasseios', url: 'http://www.portinhopasseios.com.br', image: 'assets/images/portinho-passeios.jpg' },
    { category: 'food', type: 'Alimentação e bebidas', name: 'Quiosque Maxx Beach', description: 'Quiosque na Praia do Portinho com serviço de bar, porções e caipirinhas. Entre os destaques está a caipirinha com folhas de mexerica.', tags: ['Bar na praia', 'Porções', 'Caipirinhas', 'Ambiente à beira-mar'], highlightTitle: 'Destaque editorial:', highlightDesc: 'Caipirinha com folhas de mexerica', whatsapp: '11912586558', whatsappDisplay: '(11) 91258-6558', image: 'assets/images/maxx-beach.jpg' },
    { category: 'diving', type: 'Mergulho', name: 'Portinho Divers', description: 'O Santuário Ecológico Submarino da Praia do Portinho é um dos melhores pontos de mergulho do litoral.', url: 'https://mergulhoilhabela.com.br', features: ['Mergulho de batismo', 'Mergulho guiado', 'Equipamentos', 'Fotos/vídeos', 'Experiência para iniciantes'], image: 'assets/images/portinho-divers.jpg' }
  ]
};

const localAccommodations = {
  'praia-do-portinho': [
    { category: 'stay', type: 'Hospedagem recomendada', name: 'La Gloria House', url: 'https://lagloriahouse.com.br', features: ['A 30m da Praia do Portinho', 'Suítes', 'Cabana', 'Piscina', 'Wi-Fi', 'Ar-condicionado', 'Frigobar'], image: 'assets/images/la-gloria-house.jpg' }
  ]
};
