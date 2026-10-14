// Shared curated attraction photographs: catalog data stays unchanged; both browser and SEO generators load this file.
// Curated photo library. Every entry below was matched to the named attraction;
// the source remains visible in the gallery so visitors can verify provenance.
const verifiedPhotoLibrary = {
  'praia-do-bonete': { images: ['assets/images/praia-do-bonete_verified.jpg', 'assets/images/praia-do-bonete_verified_2.jpg', 'assets/images/praia-do-bonete_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_do_Bonete_(Ilhabela)' },
  'baia-de-castelhanos': { images: ['assets/images/baia-de-castelhanos_verified.jpg', 'assets/images/baia-de-castelhanos_verified_2.jpg', 'assets/images/mirante-do-coracao_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_de_Castelhanos' },
  'praia-da-fome': { images: ['assets/images/praia-da-fome_verified.jpg', 'assets/images/praia-da-fome_verified_2.jpg', 'assets/images/praia-da-fome_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_da_Fome_(Ilhabela)' },
  'praia-do-juliao': { images: ['assets/images/praia-do-juliao_verified.jpg', 'assets/images/praia-do-juliao_verified_2.jpg', 'assets/images/praia-do-juliao_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-do-juliao' },
  'praia-do-curral': { images: ['assets/images/praia-do-curral_verified.jpg', 'assets/images/praia-do-curral_verified_2.jpg', 'assets/images/praia-do-curral_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_do_Curral_(Ilhabela)' },
  'praia-da-armacao': { images: ['assets/images/praia-da-armacao_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachorro_caminhando_pela_Praia_da_Arma%C3%A7%C3%A3o.jpg' },
  'praia-do-veloso': { images: ['assets/images/praia-do-veloso_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Ilhabela_-_Praia_do_Veloso.jpg' },
  'praia-da-siriuba': { images: ['assets/images/praia-da-siriuba_verified.jpg', 'assets/images/praia-da-siriuba_verified_2.jpg', 'assets/images/praia-da-siriuba_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-da-siriuba' },
  'praia-da-enchova': { images: ['assets/images/praia-da-enchova_verified.jpg', 'assets/images/praia-da-enchova_verified_2.jpg', 'assets/images/praia-da-enchova_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-das-enchovas' },
  'praia-de-indaiauba': { images: ['assets/images/praia-de-indaiauba_verified.jpg'], credit: 'Prefeitura de Ilhabela', source: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15452/conheca-42-praias-de-ilhabela' },
  'cachoeira-da-laje': { images: ['assets/images/cachoeira-da-laje_verified.jpg'], credit: 'Arthur Grangeiro de Souza · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Arthur_Grangeiro_de_Souza_(165).jpg' },
  'cachoeira-da-toca': { images: ['assets/images/cachoeira-da-toca_verified.png'], credit: 'Miquel Girones · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:ILHABELACACHO.png' },
  'cachoeira-do-veloso': { images: ['assets/images/cachoeira-do-veloso_verified.jpg'], credit: 'Italo Reis · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachoeira_do_Veloso,_em_Ilhabela.jpg' },
  'cachoeira-do-paqueta': { images: ['assets/images/cachoeira-do-paqueta_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/pontos-turisticos/cachoeira-do-paqueta/' },
  'cachoeira-do-gato': { images: ['assets/images/cachoeira-do-gato_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/cachoeiras/cachoeira-do-gato/' },
  'cachoeira-dos-tres-tombos': { images: ['assets/images/cachoeira-dos-tres-tombos_verified.jpg'], credit: 'Virto.Photo · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachoeira_dos_Tr%C3%AAs_Tombos.jpg' },
  'cachoeira-da-friagem': { images: ['assets/images/cachoeira-da-friagem_verified.webp'], credit: 'Trilhabela', source: 'https://trilhabela.com.br/passeio/cachoeira-da-friagem-ilhabela/' },
  'trilha-da-agua-branca': { images: ['assets/images/trilha-da-agua-branca_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/cachoeiras/cachoeiras-trilha-da-agua-branca/' },
  'mirante-do-coracao': { images: ['assets/images/mirante-do-coracao_verified.jpg'], credit: 'Louise Cristina Araujo Ferri · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Mirante_do_Cora%C3%A7%C3%A3o_-_Praia_de_Castelhanos.jpg' },
  'pico-do-baepi': { images: ['assets/images/pico-do-baepi_verified.jpg'], credit: 'Igorh84 · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Pico_do_Baepi.jpg' },
  'pico-de-sao-sebastiao': { images: ['assets/images/pico-de-sao-sebastiao_verified.jpg'], credit: 'Grupo IMS Ilhabela · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela.jpg' },
  'ponto-baleias-canal': { images: ['assets/images/ponto-baleias-canal_verified.jpg'], credit: 'Projeto Baleia à Vista · Ilhabela.com.br', source: 'https://www.ilhabela.com.br/dicas/baleia-a-vista-em-ilhabela/' },
  'naufragio-aymore': { images: ['assets/images/naufragio-aymore_verified.jpg'], credit: 'Acervo Reserving · mergulho em naufrágios de Ilhabela', source: 'https://activities.reserving.com/d/ilhabela/diving-at-ilhabela-shipwrecks-lstJW6LQ' },
  'santuario-ilha-das-cabras': { images: ['assets/images/santuario-ilha-das-cabras_verified.jpg', 'assets/images/santuario-ilha-das-cabras_verified_2.jpg', 'assets/images/santuario-ilha-das-cabras_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Ilha_das_Cabras_(Ilhabela)' },
  // IMG-01B: geographically identified and CC BY-SA 4.0 licensed; assets added on this feature branch only.
  'praia-do-pinto': {
    images: ['assets/images/praia-do-pinto_commons.webp'],
    credit: 'Kathryn elizabeth loba collins · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Praia_do_pinto_ilhabela_1957388_4024779116035_1551329815_n.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    provenance: 'Wikimedia Commons: Praia do Pinto, Ilhabela; own work, 25 September 2012; CC BY-SA 4.0.',
    adaptation: 'Imagem convertida para WebP.',
    caption: {
      pt: 'Vista da orla da Praia do Pinto, fotografada a partir do mar.',
      en: 'View of Pinto Beach shoreline, photographed from the sea.',
      fr: 'Vue du littoral de la plage do Pinto, photographiée depuis la mer.',
      es: 'Vista de la costa de la playa do Pinto, fotografiada desde el mar.',
      he: 'מבט על חוף פינטו, כפי שצולם מהים.'
    }
  },
  'praia-da-pacuiba': {
    images: ['assets/images/praia-da-pacuiba-costao_commons.webp'],
    credit: "João D'Andretta · Wikimedia Commons",
    source: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(10).jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    provenance: "Wikimedia Commons: rocky shoreline of Praia da Pacuíba, GPS -23.725257, -45.317138; João D'Andretta, 27 July 2022; CC BY-SA 4.0.",
    adaptation: 'Imagem redimensionada e convertida para WebP.',
    caption: {
      pt: 'Vista aérea do costão rochoso na região da Praia da Pacuíba; a faixa de areia não aparece na foto.',
      en: 'Aerial view of the rocky shoreline near Pacuíba Beach; the sandy beach is not shown.',
      fr: 'Vue aérienne de la côte rocheuse près de la plage da Pacuíba ; la plage de sable est hors champ.',
      es: 'Vista aérea de la costa rocosa cerca de la playa da Pacuíba; la franja de arena no aparece.',
      he: 'מבט אווירי על החוף הסלעי ליד חוף פקואיבה; רצועת החול אינה נראית בתמונה.'
    }
  },
  // IMG-01C: the photographed sign explicitly names Cachoeira Poço Fundo.
  // It depicts the signed approach, NOT the waterfall or its bathing pool.
  'cachoeira-do-poco-fundo': {
    images: ['assets/images/cachoeira-do-poco-fundo-acesso_commons.webp'],
    credit: 'Jmdelboux · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Trilha_do_Po%C3%A7o_Fundo.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    provenance: 'Wikimedia Commons: Trilha do Poço Fundo, 25 April 2017; sign for Cachoeira Poço Fundo near Bonete, geotag -23.912594, -45.342669; CC BY-SA 4.0.',
    adaptation: 'Imagem redimensionada e convertida para WebP.',
    caption: {
      pt: 'Placa da trilha de acesso à Cachoeira do Poço Fundo, na região do Bonete; a queda d\u0027água não aparece na imagem.',
      en: 'Sign marking the access trail to Poço Fundo Waterfall, near Bonete; the waterfall itself is not shown.',
      fr: 'Panneau indiquant le sentier d\u0027accès à la cascade Poço Fundo, près de Bonete ; la chute d\u0027eau n\u0027apparaît pas sur la photo.',
      es: 'Señal del sendero de acceso a la cascada Poço Fundo, cerca de Bonete; la cascada no aparece en la imagen.',
      he: 'שלט המכוון לשביל הגישה למפל פוסו פונדו, ליד בונטה; המפל עצמו אינו מופיע בתמונה.'
    }
  }
};

touristSpots.forEach(spot => {
  const verified = verifiedPhotoLibrary[spot.id];
  if (!verified) return;
  spot.image = verified.images[0];
  spot.images = verified.images;
  spot.photoCredit = verified.credit;
  spot.photoSource = verified.source;
  if (verified.license) spot.photoLicense = verified.license;
  if (verified.licenseUrl) spot.photoLicenseUrl = verified.licenseUrl;
  if (verified.provenance) spot.photoProvenance = verified.provenance;
  if (verified.adaptation) spot.photoAdaptation = verified.adaptation;
  if (verified.caption) spot.photoCaption = verified.caption;
});

