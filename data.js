// Reusable access transition points. Coordinates are maintained separately from attraction coordinates.
const routingGateways = [
  {
    "id": "sepituba-trailhead",
    "name": "Ponta da Sepituba — início da trilha do Bonete",
    "coords": [-23.936275064037446, -45.42730164154816],
    "modes": ["road", "trail"]
  },
  {
    "id": "castelhanos-park-entrance",
    "name": "Entrada/guardhouse do Parque Estadual — Castelhanos",
    "coords": [-23.839249751545807, -45.36002116037754],
    "modes": ["road", "4x4"]
  },
  {
    "id": "praia-do-juliao-access",
    "name": "Acesso à Praia do Julião",
    "coords": [-23.853583875006763, -45.41239561211879],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-da-feiticeira-access",
    "name": "Acesso à Praia da Feiticeira",
    "coords": [-23.84660565107699, -45.410130644310605],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-da-pacuiba-access",
    "name": "Acesso à Praia da Pacuíba",
    "coords": [-23.727308751868794, -45.31890535121027],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-da-ponta-azeda-access",
    "name": "Acesso à Praia da Ponta Azeda",
    "coords": [-23.74302141213607, -45.348752682254734],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-do-pinto-access",
    "name": "Acesso à Praia do Pinto",
    "coords": [-23.741868315370972, -45.34807300404768],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-do-jabaquara-access",
    "name": "Acesso à Praia do Jabaquara",
    "coords": [-23.736889822090436, -45.29377785097268],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-do-barreiros-access",
    "name": "Acesso à Praia do Barreiros",
    "coords": [-23.76356965576912, -45.348813572867364],
    "modes": ["road", "walk"]
  },
  {
    "id": "praia-de-santa-tereza-access",
    "name": "Acesso à Praia de Santa Tereza",
    "coords": [-23.771601878012316, -45.351412997079635],
    "modes": ["road", "walk"]
  },
  {
    "id": "cachoeira-da-toca-access",
    "name": "Acesso à Cachoeira da Toca",
    "coords": [-23.826654676666603, -45.341884430628895],
    "modes": ["road", "walk"]
  },
  {
    "id": "cachoeira-do-veloso-access",
    "name": "Acesso à Cachoeira do Veloso",
    "coords": [-23.876020628872798, -45.43576108900807],
    "modes": ["road", "trail"]
  },
  {
    "id": "cachoeira-do-paqueta-access",
    "name": "Acesso à Cachoeira do Paquetá",
    "coords": [-23.869517499616304, -45.423931160172216],
    "modes": ["road", "trail"]
  },
  {
    "id": "parque-municipal-das-cachoeiras-access",
    "name": "Parque Municipal das Cachoeiras",
    "coords": [-23.833094685835388, -45.36101034668008],
    "modes": ["road", "walk"]
  },
  {
    "id": "baepi-trailhead",
    "name": "Início da Trilha do Baepi",
    "coords": [-23.802132860104887, -45.35514446231041],
    "modes": ["road", "trail"]
  },
  {
    "id": "cachoeira-dos-tres-tombos-access",
    "verified": true,
    "name": "Estacionamento / início da trilha da Cachoeira dos Três Tombos",
    "coords": [-23.854116510544785, -45.405701165557744],
    "modes": ["road", "walk"]
  }
];

const touristSpots = [
  {
    "id": "praia-do-bonete",
    "category": "praias",
    "coords": [
      -23.9022,
      -45.3524
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-do-bonete_1.jpg",
    "tags": [
      "Preservada",
      "Cultura Caiçara",
      "Surf",
      "Trilha 12km"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": true,
      "isFamily": false,
      "isSurf": true,
      "is4x4": false
    },
    "routing": {
      "modes": [
        "trail",
        "boat"
      ],
      "primaryMode": "trail",
      "gatewayId": "sepituba-trailhead",
      "alternatives": [
        {
          "mode": "boat",
          "gatewayId": null
        }
      ],
      "finalSegment": {
        "mode": "trail",
        "distanceMeters": 12000,
        "durationMinutes": null
      },
      "accessOptions": [
        {
          "id": "road-trail",
          "mode": "trail",
          "approachModes": [
            "auto",
            "4x4",
            "bicycle"
          ],
          "gatewayId": "sepituba-trailhead",
          "destinationDirect": false,
          "finalMode": "trail",
          "vehicleRequirement": null
        },
        {
          "id": "boat",
          "mode": "boat",
          "approachModes": [],
          "gatewayId": null,
          "destinationDirect": false,
          "finalMode": "boat",
          "vehicleRequirement": null
        }
      ]
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "12 km (trilha)",
      "duration": "4h a 5h (a pé) ou 40min (barco)",
      "elevation": "+350m",
      "access": "Trilha a partir de Sepituba ou Barco / Boneteiro",
      "sea": "Ondas tubulares de surf, mar esmeralda e areias claras",
      "structure": "Comunidade tradicional caiçara, pousadas rústicas e quiosques com peixe fresco"
    },
    "translations": {
      "pt": {
        "title": "Praia do Bonete",
        "subtitle": "Eleita uma das praias mais bonitas do Brasil pelo The Guardian",
        "description": "Um santuário ecológico e cultural habitado pela tradicional comunidade caiçara. Destaca-se por suas ondas de surf tubulares, mar verde-esmeralda, areia fofa e o rio que deságua no canto da praia.",
        "highlights": [
          "Ondas de surf renomadas",
          "Comunidade caiçara hospitaleira",
          "Encontro do rio cristalino com o mar",
          "Pôr do sol cinematográfico"
        ],
        "ecoTip": "Respeite a cultura caiçara local, recolha todo o seu lixo e apoie o artesanato nativo.",
        "specs": {
          "distance": "12 km (trilha)",
          "duration": "4h a 5h (a pé) ou 40min (barco)",
          "elevation": "+350m",
          "access": "Trilha a partir de Sepituba ou Barco / Boneteiro",
          "sea": "Ondas tubulares de surf, mar esmeralda e areias claras",
          "structure": "Comunidade tradicional caiçara, pousadas rústicas e quiosques com peixe fresco"
        }
      },
      "en": {
        "title": "Bonete Beach",
        "subtitle": "Voted among the top 10 most beautiful beaches in Brazil",
        "description": "An eco-sanctuary inhabited by a traditional caiçara fishing community. Famous for powerful surf barrels, emerald waters, golden sand, and a fresh river flowing right into the ocean.",
        "highlights": [
          "World-class surf breaks",
          "Warm caiçara hospitality",
          "Freshwater river estuary",
          "Cinematic sunsets"
        ],
        "ecoTip": "Respect the local community, pack all trash out, and support local native crafts.",
        "specs": {
          "distance": "12 km (trail)",
          "duration": "4–5 h on foot or 40 min by boat",
          "elevation": "+350 m",
          "access": "Trail from Sepituba or boat / Boneteiro",
          "sea": "Barrelling surf, emerald sea and pale sand",
          "structure": "Traditional caiçara community, rustic guesthouses and kiosks serving fresh fish"
        }
      },
      "fr": {
        "title": "Plage do Bonete",
        "subtitle": "Classée parmi les 10 plus belles plages du Brésil",
        "description": "Un sanctuaire écologique habité par une communauté traditionnelle de pêcheurs. Célèbre pour ses vagues de surf tubulaires, ses eaux émeraude et son décor sauvage de carte postale.",
        "highlights": [
          "Vagues de surf renommées",
          "Accueil chaleureux caiçara",
          "Rivière d eau douce sur la plage",
          "Couchers de soleil magiques"
        ],
        "ecoTip": "Respectez la culture locale et remportez tous vos déchets.",
        "specs": {
          "distance": "12 km (sentier)",
          "duration": "4 à 5 h à pied ou 40 min en bateau",
          "elevation": "+350 m",
          "access": "Sentier depuis Sepituba ou bateau / Boneteiro",
          "sea": "Vagues tubulaires, mer émeraude et sable clair",
          "structure": "Communauté caiçara traditionnelle, auberges rustiques et kiosques de poisson frais"
        }
      },
      "es": {
        "title": "Playa do Bonete",
        "subtitle": "Elegida entre las 10 playas más hermosas de Brasil",
        "description": "Un refugio virgen habitado por la comunidad pesquera tradicional. Destaca por sus olas tubulares ideales para surf, mar verde esmeralda y el río de agua dulce que desemboca en la arena.",
        "highlights": [
          "Olas perfectas para surf",
          "Cultura caiçara auténtica",
          "Río cristalino en la playa",
          "Atardecer inolvidable"
        ],
        "ecoTip": "Respeta la cultura local, lleva tu basura de regreso y apoya el comercio nativo.",
        "specs": {
          "distance": "12 km (sendero)",
          "duration": "4 a 5 h a pie o 40 min en barco",
          "elevation": "+350 m",
          "access": "Sendero desde Sepituba o barco / Boneteiro",
          "sea": "Olas tubulares de surf, mar esmeralda y arena clara",
          "structure": "Comunidad caiçara tradicional, posadas rústicas y quioscos con pescado fresco"
        }
      },
      "he": {
        "title": "חוף בונטה (Praia do Bonete)",
        "subtitle": "נבחר לאחד מעשרת החופים היפים ביותר בברזיל",
        "description": "שמורת טבע פראית שבה מתגוררת קהילת דייגים מסורתית. החוף מפורסם בגלי גלישה מושלמים, מי ים צלולים ונהר מים מתוקים הנשפך ישירות אל החול המוזהב.",
        "highlights": [
          "גלי גלישה ברמה בינלאומית",
          "תרבות מקומית מסבירת פנים",
          "נהר מים מתוקים לרחצה",
          "שקיעות רומנטיות עוצרות נשימה"
        ],
        "ecoTip": "כבדו את הקהילה המקומית, אל תשאירו אשפה ותמכו בתושבי המקום.",
        "specs": {
          "distance": "12 ק״מ (שביל)",
          "duration": "4–5 שעות ברגל או 40 דקות בסירה",
          "elevation": "+350 מ׳",
          "access": "שביל מ-Sepituba או סירה / Boneteiro",
          "sea": "גלי גלישה צינוריים, ים בצבע אזמרגד וחול בהיר",
          "structure": "קהילת קאיסארה מסורתית, בתי הארחה כפריים וקיוסקים עם דגים טריים"
        }
      }
    },
    "images": [
      "assets/images/praia-do-bonete_1.jpg",
      "assets/images/praia-do-bonete_2.jpg"
    ]
  },
  {
    "id": "baia-de-castelhanos",
    "category": "praias",
    "coords": [
      -23.8647,
      -45.2892
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/baia-de-castelhanos_1.jpg",
    "tags": [
      "Aventura 4x4",
      "Formato de Coração",
      "Surf",
      "Mirante"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": false,
      "isKiosk": true,
      "isWild": true,
      "isFamily": true,
      "isSurf": true,
      "is4x4": true
    },
    "routing": {
      "modes": [
        "4x4",
        "boat"
      ],
      "primaryMode": "4x4",
      "gatewayId": "castelhanos-park-entrance",
      "alternatives": [
        {
          "mode": "boat",
          "gatewayId": null
        }
      ],
      "finalSegment": {
        "mode": "4x4",
        "distanceMeters": null,
        "durationMinutes": null
      },
      "accessOptions": [
        {
          "id": "common-car",
          "mode": "road",
          "approachModes": [
            "auto"
          ],
          "gatewayId": "castelhanos-park-entrance",
          "destinationDirect": false,
          "finalMode": "4x4",
          "vehicleRequirement": "4x4-after-gateway"
        },
        {
          "id": "own-4x4",
          "mode": "4x4",
          "approachModes": [
            "4x4"
          ],
          "gatewayId": null,
          "destinationDirect": true,
          "finalMode": null,
          "vehicleRequirement": "4x4"
        },
        {
          "id": "boat",
          "mode": "boat",
          "approachModes": [],
          "gatewayId": null,
          "destinationDirect": false,
          "finalMode": "boat",
          "vehicleRequirement": null
        }
      ]
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "22 km de travessia off-road",
      "duration": "1h20 (jipe 4x4) ou 1h (lancha)",
      "elevation": "+680m (serra)",
      "access": "Veículos 4x4 credenciados (Parque Estadual) ou Barco/Lancha pelo mar",
      "sea": "Mar aberto com ondas no canto esquerdo e calmo no canto direito",
      "structure": "Vários quiosques rústicos com peixe fresco caiçara e infraestrutura de praia"
    },
    "translations": {
      "pt": {
        "title": "Baía de Castelhanos",
        "subtitle": "A icônica praia em formato de coração e capital da aventura",
        "description": "Com 1,5 km de extensão e voltada para o mar aberto, Castelhanos é o maior símbolo de aventura de Ilhabela. A travessia da ilha pela estrada do Parque Estadual em jipes 4x4 pela mata preservada é uma experiência lendária.",
        "highlights": [
          "Mirante com vista do coração",
          "Aventura off-road em jipe 4x4",
          "Trilha para Cachoeira do Gato",
          "Gastronomia caiçara de frutos do mar"
        ],
        "ecoTip": "A entrada na estrada do Parque tem horários de fluxo controlado de ida e volta.",
        "specs": {
          "distance": "22 km de travessia off-road",
          "duration": "1h20 (jipe 4x4) ou 1h (lancha)",
          "elevation": "+680m (serra)",
          "access": "Veículos 4x4 credenciados (Parque Estadual) ou Barco/Lancha pelo mar",
          "sea": "Mar aberto com ondas no canto esquerdo e calmo no canto direito",
          "structure": "Vários quiosques rústicos com peixe fresco caiçara e infraestrutura de praia"
        }
      },
      "en": {
        "title": "Castelhanos Bay",
        "subtitle": "The iconic heart-shaped bay and off-road paradise",
        "description": "Stretching nearly a mile into open ocean waters, Castelhanos is the ultimate adventure destination in Ilhabela. Accessible via thrilling 4x4 jungle tracks through the State Park.",
        "highlights": [
          "Heart-shaped panoramic overlook",
          "Thrilling 4x4 rainforest expedition",
          "Trail to Cat Waterfall",
          "Fresh local seafood shacks"
        ],
        "ecoTip": "Park road hours are strictly regulated to protect native flora.",
        "specs": {
          "distance": "22 km off-road crossing",
          "duration": "1 h 20 min by 4x4 or 1 h by speedboat",
          "elevation": "+680 m (mountains)",
          "access": "Accredited 4x4 vehicles through the State Park or boat / speedboat by sea",
          "sea": "Open sea with waves on the left and calm water on the right",
          "structure": "Several rustic kiosks serving fresh caiçara fish and beach facilities"
        }
      },
      "fr": {
        "title": "Baie de Castelhanos",
        "subtitle": "La célèbre baie en forme de cœur et paradis tout-terrain",
        "description": "S étirant sur 1,5 km face au grand large, Castelhanos est l emblème de l aventure à Ilhabela. La traversée en 4x4 à travers la forêt tropicale est inoubliable.",
        "highlights": [
          "Panorama en forme de cœur",
          "Parcours tout-terrain en 4x4",
          "Sentier vers la cascade do Gato",
          "Kiosques de cuisine de la mer"
        ],
        "ecoTip": "Les horaires de circulation sur la piste du parc sont strictement régulés.",
        "specs": {
          "distance": "22 km de traversée tout-terrain",
          "duration": "1 h 20 en 4x4 ou 1 h en bateau rapide",
          "elevation": "+680 m (montagne)",
          "access": "Véhicules 4x4 agréés par le parc d’État ou bateau par la mer",
          "sea": "Mer ouverte avec vagues à gauche et eaux calmes à droite",
          "structure": "Plusieurs kiosques rustiques de poisson frais caiçara et équipements de plage"
        }
      },
      "es": {
        "title": "Bahía de Castelhanos",
        "subtitle": "La icónica bahía con forma de corazón y paraíso 4x4",
        "description": "Con 1,5 km de playa virgen y mar abierto, Castelhanos es el gran destino aventurero de la isla. El cruce en vehículos 4x4 por el Parque Estatal es una vivencia única.",
        "highlights": [
          "Mirador con vista de corazón",
          "Aventura en 4x4 por la selva",
          "Sendero a la Cascada do Gato",
          "Gastronomía caiçara fresca"
        ],
        "ecoTip": "Los horarios de subida y bajada en la carretera del parque están estrictamente controlados.",
        "specs": {
          "distance": "22 km de travesía todoterreno",
          "duration": "1 h 20 min en 4x4 o 1 h en lancha",
          "elevation": "+680 m (sierra)",
          "access": "Vehículos 4x4 acreditados por el Parque Estatal o barco / lancha por mar",
          "sea": "Mar abierto con olas a la izquierda y calma a la derecha",
          "structure": "Varios quioscos rústicos con pescado fresco caiçara e infraestructura de playa"
        }
      },
      "he": {
        "title": "מפרץ קסטליאנוס (Baía de Castelhanos)",
        "subtitle": "המפרץ האייקוני בצורת לב וחוויית שטח מובילה",
        "description": "רצועת חוף פראית באורך 1.5 ק״מ אל מול האוקיינוס הפתוח. חוויית השטח בג׳יפ 4x4 בתוך יער הגשם של הפארק הלאומי היא מהאטרקציות המבוקשות ביותר באי.",
        "highlights": [
          "תצפית פנורמית בצורת לב",
          "נסיעת שטח מרתקת ב-4x4",
          "מסלול הליכה למפל החתול",
          "דגים טריים ומסעדות מקומיות"
        ],
        "ecoTip": "הכניסה לשביל הפארק מוגבלת לשעות מוגדרות לשמירה על חיות הבר.",
        "specs": {
          "distance": "22 ק״מ של דרך שטח",
          "duration": "שעה ו-20 דקות ב-4x4 או שעה בסירת מנוע",
          "elevation": "+680 מ׳ (הרים)",
          "access": "רכבי 4x4 מורשים בפארק המדינה או סירה דרך הים",
          "sea": "ים פתוח עם גלים משמאל ומים רגועים מימין",
          "structure": "קיוסקים כפריים עם דגים טריים בסגנון קאיסארה ותשתיות חוף"
        }
      }
    },
    "images": [
      "assets/images/baia-de-castelhanos_1.jpg",
      "assets/images/baia-de-castelhanos_2.jpg"
    ]
  },
  {
    "id": "praia-da-fome",
    "category": "praias",
    "coords": [
      -23.7428,
      -45.2678
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-da-fome_1.jpg",
    "tags": [
      "Snorkeling",
      "Casarão Histórico",
      "Águas Transparentes",
      "Passeio de Escuna"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Acesso por barco / lancha / escuna",
      "duration": "35 min de navegação",
      "elevation": "Nível do mar",
      "access": "Passeios náuticos a partir da Vila ou trilha a partir do Jabaquara",
      "sea": "Piscina natural de águas cristalinas em tons de turquesa e esmeralda",
      "structure": "Casarão histórico preservado, sem quiosques fixos"
    },
    "translations": {
      "pt": {
        "title": "Praia da Fome",
        "subtitle": "Um aquário natural com casarão colonial e águas transparentes",
        "description": "Uma das melhores praias para mergulho livre e snorkeling de Ilhabela. As águas são incrivelmente cristalinas e abrigadas, permitindo avistar peixes multicoloridos e estrelas-do-mar até a beira da areia.",
        "highlights": [
          "Snorkeling em águas transparentes",
          "Casarão colonial histórico",
          "Passeio clássico de escuna",
          "Sombra fresca de árvores centenárias"
        ],
        "ecoTip": "Não pise nos corais e não alimente os peixes para preservar o ecossistema marinho.",
        "specs": {
          "distance": "Acesso por barco / lancha / escuna",
          "duration": "35 min de navegação",
          "elevation": "Nível do mar",
          "access": "Passeios náuticos a partir da Vila ou trilha a partir do Jabaquara",
          "sea": "Piscina natural de águas cristalinas em tons de turquesa e esmeralda",
          "structure": "Casarão histórico preservado, sem quiosques fixos"
        }
      },
      "en": {
        "title": "Fome Beach (Praia da Fome)",
        "subtitle": "Natural aquarium with historic colonial house and crystal waters",
        "description": "One of Ilhabela top spots for snorkeling and free diving. The sheltered turquoise waters are so clear that colorful fish and starfish can be seen right from the shoreline.",
        "highlights": [
          "Crystal-clear snorkeling lagoon",
          "Historic colonial mansion",
          "Classic boat tour stop",
          "Shaded by ancient coastal trees"
        ],
        "ecoTip": "Do not step on reef corals and refrain from feeding marine life.",
        "specs": {
          "distance": "Access by boat / speedboat / schooner",
          "duration": "35 min by boat",
          "elevation": "Sea level",
          "access": "Boat tours from Vila or trail from Jabaquara",
          "sea": "Natural pool of crystal-clear turquoise and emerald water",
          "structure": "Preserved historic mansion, no permanent kiosks"
        }
      },
      "fr": {
        "title": "Plage da Fome",
        "subtitle": "Aquarium naturel et manoir colonial aux eaux cristallines",
        "description": "L un des meilleurs spots de snorkeling d Ilhabela. Ses eaux calmes et transparentes regorgent de poissons multicolores et d étoiles de mer.",
        "highlights": [
          "Snorkeling exceptionnel",
          "Demeure coloniale d époque",
          "Escale classique en bateau",
          "Ombrage naturel des grands arbres"
        ],
        "ecoTip": "Ne marchez pas sur les coraux et ne nourrissez pas les poissons.",
        "specs": {
          "distance": "Accès en bateau / bateau rapide / goélette",
          "duration": "35 min de navigation",
          "elevation": "Niveau de la mer",
          "access": "Excursions nautiques depuis Vila ou sentier depuis Jabaquara",
          "sea": "Piscine naturelle aux eaux cristallines turquoise et émeraude",
          "structure": "Demeure historique préservée, sans kiosques permanents"
        }
      },
      "es": {
        "title": "Playa da Fome",
        "subtitle": "Acuario natural con casona colonial y aguas transparentes",
        "description": "Uno de los mejores puntos de snorkel de la isla. Sus aguas calmas y transparentes permiten ver peces de colores y estrellas de mar a pocos metros de la orilla.",
        "highlights": [
          "Snorkel de aguas transparentes",
          "Casona colonial histórica",
          "Parada clásica de paseos en barco",
          "Sombra fresca de árboles nativos"
        ],
        "ecoTip": "No pises los corales y evita alimentar a los peces marinos.",
        "specs": {
          "distance": "Acceso en barco / lancha / goleta",
          "duration": "35 min de navegación",
          "elevation": "Nivel del mar",
          "access": "Paseos náuticos desde Vila o sendero desde Jabaquara",
          "sea": "Piscina natural de aguas cristalinas turquesa y esmeralda",
          "structure": "Casona histórica conservada, sin quioscos fijos"
        }
      },
      "he": {
        "title": "חוף פומי (Praia da Fome)",
        "subtitle": "אקווריום טבעי, אחוזה קולוניאלית ומים שקופים כקריסטל",
        "description": "אחד מאתרי השנירקול הטובים ביותר באיליאבלה. המים השקטים והצלולים מאפשרים לצפות בשפע של דגים טרופיים צבעוניים וכוכבי ים ממש ליד החוף.",
        "highlights": [
          "שנירקול במים צלולים כראי",
          "אחוזה קולוניאלית עתיקה",
          "עצירה קלאסית בסיורי שייט",
          "צל נעים מעצי חוף עתיקים"
        ],
        "ecoTip": "אין לדרוך על אלמוגים ואין להאכיל את הדגים.",
        "specs": {
          "distance": "גישה בסירה / סירת מנוע / מפרשית",
          "duration": "35 דקות שייט",
          "elevation": "גובה פני הים",
          "access": "סיורי שייט מ-Vila או שביל מ-Jabaquara",
          "sea": "בריכה טבעית עם מים צלולים בגוני טורקיז ואזמרגד",
          "structure": "אחוזה היסטורית משומרת, ללא קיוסקים קבועים"
        }
      }
    },
    "images": [
      "assets/images/praia-da-fome_1.jpg"
    ]
  },
  {
    "id": "praia-do-juliao",
    "category": "praias",
    "coords": [
      -23.8522,
      -45.4181
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-do-juliao_1.jpg",
    "tags": [
      "Piscinas Naturais",
      "Família",
      "Snorkel",
      "Restaurante Charmoso"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "routing": {
      "modes": [
        "road",
        "walk"
      ],
      "primaryMode": "road",
      "gatewayId": "praia-do-juliao-access",
      "alternatives": [],
      "finalSegment": {
        "mode": "walk",
        "distanceMeters": 300,
        "durationMinutes": 5
      }
    },
    "specs": {
      "difficulty": "easy",
      "distance": "300m a pé da estrada",
      "duration": "5 min de caminhada",
      "elevation": "Plano",
      "access": "Trilha calçada e sombreada a partir da Av. José Pacheco do Nascimento",
      "sea": "Mar sereno com grandes formações rochosas que formam piscinas naturais",
      "structure": "Quiosques de excelente gastronomia caiçara, aluguel de caiaques e stand up paddle"
    },
    "translations": {
      "pt": {
        "title": "Praia do Julião",
        "subtitle": "Piscinas naturais entre pedras e charme gastronômico",
        "description": "Uma das praias mais encantadoras do sul de Ilhabela. As pedras submersas formam piscinas cheias de vida marinha, perfeitas para crianças e iniciantes no snorkel.",
        "highlights": [
          "Piscinas naturais cristalinas",
          "Perfeita para crianças e famílias",
          "Gastronomia refinada nos quiosques",
          "Pôr do sol deslumbrante"
        ],
        "ecoTip": "Respeite as áreas de pedras e não recolha conchas ou animais marinhos.",
        "specs": {
          "distance": "300m a pé da estrada",
          "duration": "5 min de caminhada",
          "elevation": "Plano",
          "access": "Trilha calçada e sombreada a partir da Av. José Pacheco do Nascimento",
          "sea": "Mar sereno com grandes formações rochosas que formam piscinas naturais",
          "structure": "Quiosques de excelente gastronomia caiçara, aluguel de caiaques e stand up paddle"
        }
      },
      "en": {
        "title": "Julião Beach (Praia do Julião)",
        "subtitle": "Natural rock pools and charming culinary beach shacks",
        "description": "One of the most delightful beaches in southern Ilhabela. Submerged boulders create protected natural pools teeming with marine life, ideal for families and snorkelers.",
        "highlights": [
          "Crystal natural rock pools",
          "Family and kid friendly",
          "Charming beachside dining",
          "Golden sunset views"
        ],
        "ecoTip": "Respect the tide pools and leave shells and sea creatures in place.",
        "specs": {
          "distance": "300 m walk from the road",
          "duration": "5 min walk",
          "elevation": "Flat",
          "access": "Paved, shaded trail from Av. José Pacheco do Nascimento",
          "sea": "Quiet sea with large rock formations forming natural pools",
          "structure": "Excellent caiçara food kiosks, kayak and stand-up paddle rentals"
        }
      },
      "fr": {
        "title": "Plage do Julião",
        "subtitle": "Piscines naturelles entre les rochers et charme culinaire",
        "description": "Une plage idyllique au sud d Ilhabela. Les formations rocheuses créent des piscines naturelles poissonneuses parfaites pour le snorkeling en famille.",
        "highlights": [
          "Piscines naturelles limpides",
          "Idéale pour les enfants",
          "Excellente cuisine de fruits de mer",
          "Superbe coucher de soleil"
        ],
        "ecoTip": "Ne ramassez pas de coquillages pour préserver l écosystème.",
        "specs": {
          "distance": "300 m à pied depuis la route",
          "duration": "5 min de marche",
          "elevation": "Plat",
          "access": "Sentier pavé et ombragé depuis Av. José Pacheco do Nascimento",
          "sea": "Mer paisible avec de grands rochers formant des piscines naturelles",
          "structure": "Excellents kiosques de cuisine caiçara, location de kayaks et de paddle"
        }
      },
      "es": {
        "title": "Playa do Julião",
        "subtitle": "Piscinas naturales entre rocas y excelente gastronomía",
        "description": "Una de las playas más encantadoras del sur. Las formaciones rocosas forman piscinas naturales llenas de peces, ideales para familias y amantes del snorkel.",
        "highlights": [
          "Piscinas naturales de agua cristalina",
          "Excelente para familias y niños",
          "Restaurantes de playa de primer nivel",
          "Atardecer dorado"
        ],
        "ecoTip": "Cuida las pozas de marea y no te lleves caracolas ni estrellas.",
        "specs": {
          "distance": "300 m a pie desde la carretera",
          "duration": "5 min caminando",
          "elevation": "Plano",
          "access": "Sendero pavimentado y sombreado desde Av. José Pacheco do Nascimento",
          "sea": "Mar sereno con grandes rocas que forman piscinas naturales",
          "structure": "Quioscos de excelente gastronomía caiçara, alquiler de kayaks y paddle surf"
        }
      },
      "he": {
        "title": "חוף ז׳וליאו (Praia do Julião)",
        "subtitle": "בריכות סלע טבעיות ומסעדות חוף מקסימות",
        "description": "אחד החופים המקסימים והאהובים בדרום האי. סלעים טבעיים יוצרים בריכות מים שקטות וצלולות המלאות בדגים, מושלמות למשפחות עם ילדים ולשנירקול.",
        "highlights": [
          "בריכות סלעים טבעיות וצלולות",
          "מושלם לילדים ולמשפחות",
          "מסעדות חוף עם דגים טריים",
          "נוף שקיעה זהוב"
        ],
        "ecoTip": "כבדו את בריכות הסלעים ואל תיקחו צדפים או בעלי חיים מהחוף.",
        "specs": {
          "distance": "300 מ׳ הליכה מהכביש",
          "duration": "5 דקות הליכה",
          "elevation": "מישורי",
          "access": "שביל מרוצף ומוצל מ-Av. José Pacheco do Nascimento",
          "sea": "ים שקט עם סלעים גדולים היוצרים בריכות טבעיות",
          "structure": "קיוסקים עם אוכל קאיסארה משובח והשכרת קיאקים וסאפ"
        }
      }
    },
    "images": [
      "assets/images/praia-do-juliao_1.jpg"
    ]
  },
  {
    "id": "praia-do-curral",
    "category": "praias",
    "coords": [
      -23.8625,
      -45.4294
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-do-curral_1.jpg",
    "tags": [
      "Pôr do Sol",
      "Bares Sofisticados",
      "Fácil Acesso",
      "Família"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "0 km (beira da estrada)",
      "duration": "Acesso direto por carro / transporte",
      "elevation": "Nível do mar",
      "access": "Carro, ônibus urbano ou táxi pela Av. José Pacheco do Nascimento",
      "sea": "Águas calmas e límpidas com tons esmeralda, ótimo para nado e caiaque",
      "structure": "Quiosques premium com música ao vivo, banheiros, duchas e alta gastronomia"
    },
    "translations": {
      "pt": {
        "title": "Praia do Curral",
        "subtitle": "O ponto de encontro mais badalado e o pôr do sol mais famoso da ilha",
        "description": "A praia mais famosa pelo conforto e sofisticação em Ilhabela. Combina areias douradas, mar calmo de águas mornas, excelente estrutura de quiosques e um pôr do sol inesquecível.",
        "highlights": [
          "Pôr do sol cinematográfico no canal",
          "Beach clubs e gastronomia de alto padrão",
          "Águas ideais para stand up paddle e nado",
          "Capelinha histórica à beira-mar"
        ],
        "ecoTip": "Utilize protetor solar amigo dos corais e descarte o lixo nos pontos de coleta.",
        "specs": {
          "distance": "0 km (beira da estrada)",
          "duration": "Acesso direto por carro / transporte",
          "elevation": "Nível do mar",
          "access": "Carro, ônibus urbano ou táxi pela Av. José Pacheco do Nascimento",
          "sea": "Águas calmas e límpidas com tons esmeralda, ótimo para nado e caiaque",
          "structure": "Quiosques premium com música ao vivo, banheiros, duchas e alta gastronomia"
        }
      },
      "en": {
        "title": "Curral Beach",
        "subtitle": "Vibrant beach clubs and legendary sunset views",
        "description": "The most famous beach on the island for leisure and comfort. Features upscale beach lounges, gentle emerald waters, and Ilhabela most celebrated sunset scene.",
        "highlights": [
          "Spectacular sunsets over the channel",
          "Refined beach clubs & live music",
          "Calm waters for swimming & SUP",
          "Charming seaside chapel"
        ],
        "ecoTip": "Dispose of waste in recycling bins and use reef-safe sunscreen.",
        "specs": {
          "distance": "0 km (roadside)",
          "duration": "Direct access by car / transport",
          "elevation": "Sea level",
          "access": "Car, city bus or taxi via Av. José Pacheco do Nascimento",
          "sea": "Calm, clear emerald water, great for swimming and kayaking",
          "structure": "Premium kiosks with live music, toilets, showers and fine dining"
        }
      },
      "fr": {
        "title": "Plage do Curral",
        "subtitle": "Ambiance branchée et coucher de soleil légendaire",
        "description": "La plage la plus animée et confortable d Ilhabela. Réputée pour ses beach clubs élégants, ses eaux calmes et son coucher de soleil somptueux.",
        "highlights": [
          "Coucher de soleil spectaculaire",
          "Beach clubs chics avec musique",
          "Eaux paisibles propices au paddle",
          "Petite chapelle historique"
        ],
        "ecoTip": "Privilégiez les contenants réutilisables sur le sable.",
        "specs": {
          "distance": "0 km (bord de route)",
          "duration": "Accès direct en voiture / transport",
          "elevation": "Niveau de la mer",
          "access": "Voiture, bus urbain ou taxi par Av. José Pacheco do Nascimento",
          "sea": "Eaux calmes et limpides couleur émeraude, idéales pour nager et faire du kayak",
          "structure": "Kiosques haut de gamme avec musique, toilettes, douches et gastronomie"
        }
      },
      "es": {
        "title": "Playa do Curral",
        "subtitle": "El punto de encuentro más vibrante y mejor puesta de sol",
        "description": "La playa con mejor infraestructura de la isla. Combina chiringuitos de lujo, aguas tranquilas de color esmeralda y el atardecer más famoso del canal.",
        "highlights": [
          "Atardecer cinematográfico",
          "Beach clubs y música en vivo",
          "Aguas perfectas para nadar y SUP",
          "Capilla histórica frente al mar"
        ],
        "ecoTip": "Usa los puntos de reciclaje y cuida la limpieza de la playa.",
        "specs": {
          "distance": "0 km (junto a la carretera)",
          "duration": "Acceso directo en coche / transporte",
          "elevation": "Nivel del mar",
          "access": "Coche, autobús urbano o taxi por Av. José Pacheco do Nascimento",
          "sea": "Aguas tranquilas y claras de color esmeralda, ideales para nadar y kayak",
          "structure": "Quioscos de alta gama con música en vivo, baños, duchas y alta gastronomía"
        }
      },
      "he": {
        "title": "חוף קוראל (Praia do Curral)",
        "subtitle": "החוף התוסס ביותר ושקיעות מרהיבות",
        "description": "החוף המאורגן והפופולרי ביותר באי. מציע שילוב של מועדוני חוף יוקרתיים, מי ים צלולים ורגועים ואת מראה השקיעה המפורסם ביותר באיליאבלה.",
        "highlights": [
          "שקיעות עוצרות נשימה מעל המים",
          "ביץ׳ קלאבס ומסעדות שף",
          "מים רגועים לשחייה וסאפ",
          "כנסייה היסטורית על קו החוף"
        ],
        "ecoTip": "הקפידו לזרוק אשפה לפחים ומנעו שימוש בפלסטיק חד פעמי.",
        "specs": {
          "distance": "0 ק״מ (לצד הכביש)",
          "duration": "גישה ישירה ברכב / תחבורה",
          "elevation": "גובה פני הים",
          "access": "רכב, אוטובוס עירוני או מונית דרך Av. José Pacheco do Nascimento",
          "sea": "מים רגועים וצלולים בצבע אזמרגד, מתאימים לשחייה ולקיאקים",
          "structure": "קיוסקים יוקרתיים עם מוזיקה חיה, שירותים, מקלחות ואוכל משובח"
        }
      }
    },
    "images": [
      "assets/images/praia-do-curral_1.jpg"
    ]
  },
  {
    "id": "praia-da-armacao",
    "category": "praias",
    "coords": [
      -23.7583,
      -45.3547
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-da-armacao_1.jpg",
    "tags": [
      "Capital da Vela",
      "Kitesurf",
      "Capela Histórica",
      "Vento Constante"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "À beira da estrada norte",
      "duration": "Acesso direto por carro / ônibus",
      "elevation": "Nível do mar",
      "access": "Av. Pedro Paula de Moraes (norte da ilha)",
      "sea": "Mar de canal com ventos constantes, ponto nobre de vela e windsurf",
      "structure": "Quiosques, escolas de vela, aluguel de pranchas e a histórica Capela de São Pedro"
    },
    "translations": {
      "pt": {
        "title": "Praia da Armação",
        "subtitle": "O coração da Capital da Vela e do Kitesurf",
        "description": "Tradicional reduto dos velejadores e pescadores artesanais de Ilhabela. O visual dos veleiros coloridos no mar e a charmosa Capela de São Pedro dos Pescadores formam um cenário inesquecível.",
        "highlights": [
          "Ventos perfeitos para vela e kitesurf",
          "Escolas e aluguel de equipamentos náuticos",
          "Capela histórica de São Pedro",
          "Sombra de coqueiros e árvores nativas"
        ],
        "ecoTip": "Respeite as áreas de entrada e saída de embarcações e velejadores.",
        "specs": {
          "distance": "À beira da estrada norte",
          "duration": "Acesso direto por carro / ônibus",
          "elevation": "Nível do mar",
          "access": "Av. Pedro Paula de Moraes (norte da ilha)",
          "sea": "Mar de canal com ventos constantes, ponto nobre de vela e windsurf",
          "structure": "Quiosques, escolas de vela, aluguel de pranchas e a histórica Capela de São Pedro"
        }
      },
      "en": {
        "title": "Armação Beach",
        "subtitle": "The Sailing and Kitesurfing Capital of Brazil",
        "description": "The gathering spot for sailors and local fishermen. Colorful sailboats dot the waters against the backdrop of the historic Saint Peter Chapel.",
        "highlights": [
          "Prime winds for sailing & kitesurfing",
          "Sailing schools & gear rentals",
          "Charming Saint Peter historic chapel",
          "Lush shady palm trees"
        ],
        "ecoTip": "Keep clear of designated boat launching zones.",
        "specs": {
          "distance": "Beside the northern road",
          "duration": "Direct access by car / bus",
          "elevation": "Sea level",
          "access": "Av. Pedro Paula de Moraes (north of the island)",
          "sea": "Channel waters with steady winds, a prime sailing and windsurfing spot",
          "structure": "Kiosks, sailing schools, board rentals and historic Capela de São Pedro"
        }
      },
      "fr": {
        "title": "Plage da Armação",
        "subtitle": "La capitale de la voile et du kitesurf",
        "description": "Le repaire des passionnés de nautisme et des pêcheurs. Ses voiliers multicolores et sa ravissante chapelle historique créent une atmosphère marine authentique.",
        "highlights": [
          "Vents parfaits pour la voile",
          "Écoles nautiques et location",
          "Chapelle historique de São Pedro",
          "Ombrage naturel des palmiers"
        ],
        "ecoTip": "Respectez les couloirs de navigation des voiliers.",
        "specs": {
          "distance": "Au bord de la route du nord",
          "duration": "Accès direct en voiture / bus",
          "elevation": "Niveau de la mer",
          "access": "Av. Pedro Paula de Moraes (nord de l’île)",
          "sea": "Eaux du canal aux vents réguliers, site privilégié de voile et de planche à voile",
          "structure": "Kiosques, écoles de voile, location de planches et chapelle historique Capela de São Pedro"
        }
      },
      "es": {
        "title": "Playa da Armação",
        "subtitle": "La capital de la vela y el kitesurf en Brasil",
        "description": "Tradicional rincón de veleros y pescadores. Su mar con viento constante y la capilla de São Pedro forman una de las postales más náuticas de la isla.",
        "highlights": [
          "Viento constante para vela y kite",
          "Escuelas de deportes náuticos",
          "Capilla histórica de San Pedro",
          "Hermosos cocoteros"
        ],
        "ecoTip": "Respeta las áreas reservadas para embarcaciones.",
        "specs": {
          "distance": "Junto a la carretera del norte",
          "duration": "Acceso directo en coche / autobús",
          "elevation": "Nivel del mar",
          "access": "Av. Pedro Paula de Moraes (norte de la isla)",
          "sea": "Mar de canal con vientos constantes, lugar destacado para vela y windsurf",
          "structure": "Quioscos, escuelas de vela, alquiler de tablas y la histórica Capela de São Pedro"
        }
      },
      "he": {
        "title": "חוף ארמסאו (Praia da Armação)",
        "subtitle": "בירת השייט והקייטסרפינג של ברזיל",
        "description": "מרכז השייט והקייטסרפינג של האי. המפרץ מלא במפרשיות צבעוניות וסירות דייגים על רקע כנסיית סן פדרו ההיסטורית והציורית.",
        "highlights": [
          "רוחות מושלמות לשייט וקייטסרפינג",
          "בתי ספר להשכרת ציוד ימי",
          "כנסיית דייגים היסטורית",
          "עצי קוקוס וצל טבעי"
        ],
        "ecoTip": "שמרו על בטיחות בקרבת אזורי הורדת סירות ומפרשיות.",
        "specs": {
          "distance": "לצד הכביש הצפוני",
          "duration": "גישה ישירה ברכב / אוטובוס",
          "elevation": "גובה פני הים",
          "access": "Av. Pedro Paula de Moraes (צפון האי)",
          "sea": "מי תעלה עם רוחות קבועות, אתר מוביל לשייט ולגלישת רוח",
          "structure": "קיוסקים, בתי ספר לשייט, השכרת גלשנים והקפלה ההיסטורית Capela de São Pedro"
        }
      }
    },
    "images": [
      "assets/images/praia-da-armacao_1.jpg"
    ]
  },
  {
    "id": "praia-do-veloso",
    "category": "praias",
    "coords": [
      -23.8741,
      -45.4372
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-do-veloso_1.jpg",
    "tags": [
      "Mar Calmo",
      "Tranquilidade",
      "Areia Dourada",
      "Snorkel"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Última praia com acesso asfaltado no sul",
      "duration": "Acesso direto por carro",
      "elevation": "Nível do mar",
      "access": "Final da Av. José Pacheco do Nascimento (lado sul)",
      "sea": "Águas mansas, límpidas e protegidas de vento",
      "structure": "Quiosque rústico, sombra de árvores e proximidade com a Cachoeira do Veloso"
    },
    "translations": {
      "pt": {
        "title": "Praia do Veloso",
        "subtitle": "Refúgio tranquilo de águas calmas e areias douradas no extremo sul",
        "description": "Vizinha da movimentada Praia do Curral, o Veloso é a pedida perfeita para quem busca sossego, águas cristalinas para nadar e sombra de abricoteiros centenários.",
        "highlights": [
          "Ambiente tranquilo e silencioso",
          "Mar calmo ideal para flutuação",
          "Próxima à trilha da Cachoeira do Veloso",
          "Pôr do sol deslumbrante"
        ],
        "ecoTip": "Aproveite para conjugar a visita com a Cachoeira do Veloso a poucos metros de trilha.",
        "specs": {
          "distance": "Última praia com acesso asfaltado no sul",
          "duration": "Acesso direto por carro",
          "elevation": "Nível do mar",
          "access": "Final da Av. José Pacheco do Nascimento (lado sul)",
          "sea": "Águas mansas, límpidas e protegidas de vento",
          "structure": "Quiosque rústico, sombra de árvores e proximidade com a Cachoeira do Veloso"
        }
      },
      "en": {
        "title": "Veloso Beach",
        "subtitle": "Tranquil southern haven with gentle waters and golden sands",
        "description": "Neighboring the lively Curral Beach, Veloso is the peaceful alternative for travelers seeking serenity, calm swimming waters, and shade under ancient beach trees.",
        "highlights": [
          "Peaceful and quiet ambiance",
          "Gentle swimming waters",
          "Close to Veloso Waterfall trail",
          "Golden hour sunsets"
        ],
        "ecoTip": "Combine your visit with the short hike to nearby Veloso Waterfall.",
        "specs": {
          "distance": "Last southern beach with paved access",
          "duration": "Direct access by car",
          "elevation": "Sea level",
          "access": "End of Av. José Pacheco do Nascimento (south side)",
          "sea": "Gentle, clear waters sheltered from the wind",
          "structure": "Rustic kiosk, tree shade and proximity to Cachoeira do Veloso"
        }
      },
      "fr": {
        "title": "Plage do Veloso",
        "subtitle": "Havre de paix aux eaux calmes et sable doré au sud",
        "description": "Voisine paisible de la plage du Curral, Veloso est idéale pour ceux qui recherchent la quiétude, des eaux calmes et l ombrage d arbres centenaires.",
        "highlights": [
          "Ambiance paisible et reposante",
          "Baignade calme et facile",
          "Accès proche à la cascade do Veloso",
          "Magnifique coucher de soleil"
        ],
        "ecoTip": "Combinez la plage avec la visite de la cascade voisine.",
        "specs": {
          "distance": "Dernière plage du sud avec accès goudronné",
          "duration": "Accès direct en voiture",
          "elevation": "Niveau de la mer",
          "access": "Fin de Av. José Pacheco do Nascimento (côté sud)",
          "sea": "Eaux calmes, limpides et abritées du vent",
          "structure": "Kiosque rustique, arbres ombragés et proximité de Cachoeira do Veloso"
        }
      },
      "es": {
        "title": "Playa do Veloso",
        "subtitle": "Refugio tranquilo de aguas calmas y arena dorada",
        "description": "Vecina tranquila de la concurrida playa de Curral. Ofrece serenidad, aguas mansas para nadar y sombra natural bajo grandes árboles.",
        "highlights": [
          "Ambiente sereno y relajante",
          "Aguas cristalinas muy calmas",
          "Cercana a la Cascada do Veloso",
          "Hermoso atardecer"
        ],
        "ecoTip": "Combina tu visita con la caminata a la Cascada do Veloso.",
        "specs": {
          "distance": "Última playa del sur con acceso asfaltado",
          "duration": "Acceso directo en coche",
          "elevation": "Nivel del mar",
          "access": "Final de Av. José Pacheco do Nascimento (lado sur)",
          "sea": "Aguas mansas, claras y protegidas del viento",
          "structure": "Quiosco rústico, sombra de árboles y cercanía a Cachoeira do Veloso"
        }
      },
      "he": {
        "title": "חוף ולוזו (Praia do Veloso)",
        "subtitle": "מקלט שליו עם מים רגועים וחולות זהובים בדרום האי",
        "description": "שכנו השקט של חוף קוראל. מתאים במיוחד למי שמחפש שלווה, מים רגועים וצל טבעי תחת עצי חוף עתיקים.",
        "highlights": [
          "אווירה שקטה ופסטורלית",
          "מי ים שקטים לשחייה",
          "סמוך לשביל המפל של ולוזו",
          "שקיעות רומנטיות"
        ],
        "ecoTip": "מומלץ לשלב רחצה בחוף עם טיול קצר למפל ולוזו הסמוך.",
        "specs": {
          "distance": "החוף הדרומי האחרון עם גישה סלולה",
          "duration": "גישה ישירה ברכב",
          "elevation": "גובה פני הים",
          "access": "סוף Av. José Pacheco do Nascimento (הצד הדרומי)",
          "sea": "מים שקטים וצלולים המוגנים מהרוח",
          "structure": "קיוסק כפרי, צל עצים וקרבה ל-Cachoeira do Veloso"
        }
      }
    },
    "images": [
      "assets/images/praia-do-veloso_1.jpg"
    ]
  },
  {
    "id": "praia-da-siriuba",
    "category": "praias",
    "coords": [
      -23.7481,
      -45.3486
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-da-siriuba_1.jpg",
    "tags": [
      "Coqueirais",
      "SUP",
      "Capela 1931",
      "Águas Calmas"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "À beira da estrada norte",
      "duration": "Acesso direto por carro",
      "elevation": "Nível do mar",
      "access": "Av. Leonardo Reale (lado norte)",
      "sea": "Águas mansas, sem ondas, ideal para crianças, stand up paddle e caiaque",
      "structure": "Quiosques charmosos, sombra de amendoeiras e coqueiros"
    },
    "translations": {
      "pt": {
        "title": "Praia da Siriúba",
        "subtitle": "Coqueiros imponentes, capela de 1931 e mar calmo como lagoa",
        "description": "Com uma charmosa capela histórica de 1931 à beira-mar e coqueiros inclinados sobre a água, Siriúba é o refúgio perfeito para relaxar e remar de stand up paddle no norte da ilha.",
        "highlights": [
          "Mar espelhado para stand up paddle",
          "Capelinha histórica de 1931",
          "Sombra fresca de coqueirais",
          "Restaurantes charmosos"
        ],
        "ecoTip": "Não recolha estrelas-do-mar ou corais encontrados na praia.",
        "specs": {
          "distance": "À beira da estrada norte",
          "duration": "Acesso direto por carro",
          "elevation": "Nível do mar",
          "access": "Av. Leonardo Reale (lado norte)",
          "sea": "Águas mansas, sem ondas, ideal para crianças, stand up paddle e caiaque",
          "structure": "Quiosques charmosos, sombra de amendoeiras e coqueiros"
        }
      },
      "en": {
        "title": "Siriúba Beach",
        "subtitle": "Leaning palms, 1931 historic chapel, and mirror-calm waters",
        "description": "Framed by iconic tilted coconut palms and a historic 1931 seaside chapel, Siriúba is the ideal scenic retreat for stand-up paddling and peaceful northern island relaxation.",
        "highlights": [
          "Mirror-calm paddleboarding waters",
          "Charming 1931 seaside chapel",
          "Shady coconut palm groves",
          "Delightful beach dining"
        ],
        "ecoTip": "Leave marine life and starfish undisturbed.",
        "specs": {
          "distance": "Beside the northern road",
          "duration": "Direct access by car",
          "elevation": "Sea level",
          "access": "Av. Leonardo Reale (north side)",
          "sea": "Gentle, waveless waters, ideal for children, stand-up paddle and kayaking",
          "structure": "Charming kiosks, shade from almond trees and coconut palms"
        }
      },
      "fr": {
        "title": "Plage da Siriúba",
        "subtitle": "Palmiers inclinés, chapelle de 1931 et eaux calmes",
        "description": "Bordée de palmiers et d une ravissante chapelle historique, Siriúba est un havre de tranquillité parfait pour le paddle au nord de l île.",
        "highlights": [
          "Eaux calmes propices au paddle",
          "Chapelle pittoresque de 1931",
          "Ombre douce des cocotiers",
          "Restaurants de plage accueillants"
        ],
        "ecoTip": "Respectez la faune marine et les étoiles de mer.",
        "specs": {
          "distance": "Au bord de la route du nord",
          "duration": "Accès direct en voiture",
          "elevation": "Niveau de la mer",
          "access": "Av. Leonardo Reale (côté nord)",
          "sea": "Eaux calmes sans vagues, idéales pour les enfants, le paddle et le kayak",
          "structure": "Kiosques charmants, ombre des amandiers et cocotiers"
        }
      },
      "es": {
        "title": "Playa da Siriúba",
        "subtitle": "Cocoteros, capilla de 1931 y aguas serenas tipo laguna",
        "description": "Con su histórica capilla de 1931 frente al mar y cocoteros tropicales, Siriúba es el rincón perfecto para remar en stand up paddle y descansar.",
        "highlights": [
          "Mar tranquilo ideal para SUP",
          "Capilla histórica de 1931",
          "Sombra de cocoteros",
          "Gastronomía acogedora"
        ],
        "ecoTip": "No molestes a las estrellas de mar ni recojas corales.",
        "specs": {
          "distance": "Junto a la carretera del norte",
          "duration": "Acceso directo en coche",
          "elevation": "Nivel del mar",
          "access": "Av. Leonardo Reale (lado norte)",
          "sea": "Aguas mansas sin olas, ideales para niños, paddle surf y kayak",
          "structure": "Quioscos encantadores, sombra de almendros y cocoteros"
        }
      },
      "he": {
        "title": "חוף סיריאובה (Praia da Siriúba)",
        "subtitle": "עצי קוקוס ציוריים, כנסייה מ-1931 ומים שקטים כאגם",
        "description": "חוף קסום עם כנסיית חוף היסטורית מ-1931 ועצי קוקוס הנוטים מעל המים. מקום מושלם לחתירה בסאפ ולרגיעה בצפון האי.",
        "highlights": [
          "מים שקטים וצלולים לסאפ",
          "כנסיית חוף היסטורית",
          "צל עצי קוקוס טרופיים",
          "מסעדות חוף מקסימות"
        ],
        "ecoTip": "אל תפריעו לחיים הימיים ולכוכבי הים.",
        "specs": {
          "distance": "לצד הכביש הצפוני",
          "duration": "גישה ישירה ברכב",
          "elevation": "גובה פני הים",
          "access": "Av. Leonardo Reale (הצד הצפוני)",
          "sea": "מים שקטים ללא גלים, מתאימים לילדים, לסאפ ולקיאקים",
          "structure": "קיוסקים נעימים וצל של עצי שקד ודקלי קוקוס"
        }
      }
    },
    "images": [
      "assets/images/praia-da-siriuba_1.jpg"
    ]
  },
  {
    "id": "praia-da-enchova",
    "category": "praias",
    "coords": [
      -23.9167,
      -45.3167
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-da-enchova_1.jpg",
    "tags": [
      "Selvagem",
      "Pedras Roliças",
      "Rio com Poço",
      "Sul Oceânico"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": true,
      "is4x4": false
    },
    "specs": {
      "difficulty": "hard",
      "distance": "Trilha de 1h30 a partir do Bonete ou Barco",
      "duration": "Acesso a pé pelo Bonete ou lancha",
      "elevation": "+180m",
      "access": "Trilha a partir da Praia do Bonete ou embarcação",
      "sea": "Mar aberto vigoroso com rica vida marinha e pedras polidas",
      "structure": "Praia 100% virgem e deserta, sem quiosques ou comércio"
    },
    "translations": {
      "pt": {
        "title": "Praia da Enchova",
        "subtitle": "Paraíso selvagem com rio de águas cristalinas e pedras roliças",
        "description": "Uma das praias mais selvagens e imponentes de todo o litoral paulista. Localizada além do Bonete, conta com um rio caudaloso de águas verdes que forma uma lagoa natural antes de encontrar o mar aberto.",
        "highlights": [
          "Natureza 100% intocada e deserta",
          "Poço de rio esmeralda para banho doce",
          "Seixos e pedras polidas pelo oceano",
          "Ponto nobre de pesca e mergulho"
        ],
        "ecoTip": "Local totalmente remoto. Leve todos os suprimentos necessários e traga 100% do seu lixo de volta.",
        "specs": {
          "distance": "Trilha de 1h30 a partir do Bonete ou Barco",
          "duration": "Acesso a pé pelo Bonete ou lancha",
          "elevation": "+180m",
          "access": "Trilha a partir da Praia do Bonete ou embarcação",
          "sea": "Mar aberto vigoroso com rica vida marinha e pedras polidas",
          "structure": "Praia 100% virgem e deserta, sem quiosques ou comércio"
        }
      },
      "en": {
        "title": "Enchova Beach (Praia da Enchova)",
        "subtitle": "Wild ocean sanctuary with crystal river pool and polished stones",
        "description": "One of the wildest and most pristine coastal expanses in southeastern Brazil. Located past Bonete, a clean river forms a stunning emerald lagoon right by the ocean.",
        "highlights": [
          "100% untouched deserted wilderness",
          "Emerald freshwater river lagoon",
          "Ocean-polished pebble coastlines",
          "Premier fishing & dive spot"
        ],
        "ecoTip": "Completely remote location. Pack all essentials and leave zero trace.",
        "specs": {
          "distance": "1 h 30 min trail from Bonete or boat",
          "duration": "On foot via Bonete or by speedboat",
          "elevation": "+180 m",
          "access": "Trail from Praia do Bonete or boat",
          "sea": "Strong open sea with rich marine life and polished stones",
          "structure": "Completely untouched, deserted beach, no kiosks or shops"
        }
      },
      "fr": {
        "title": "Plage da Enchova",
        "subtitle": "Paradis sauvage avec rivière cristalline et galets polis",
        "description": "L une des plages les plus sauvages et grandioses du Brésil. Située au-delà du Bonete, elle offre une lagune d eau douce émeraude se jetant dans l océan.",
        "highlights": [
          "Plage déserte et totalement sauvage",
          "Baignade dans la lagune de rivière",
          "Galets polis par les vagues",
          "Spot de pêche et plongée"
        ],
        "ecoTip": "Zone très isolée. Emportez vos vivres et remportez tous vos déchets.",
        "specs": {
          "distance": "Sentier de 1 h 30 depuis Bonete ou bateau",
          "duration": "À pied par Bonete ou en bateau rapide",
          "elevation": "+180 m",
          "access": "Sentier depuis Praia do Bonete ou embarcation",
          "sea": "Mer ouverte puissante, riche vie marine et pierres polies",
          "structure": "Plage entièrement vierge et déserte, sans kiosques ni commerces"
        }
      },
      "es": {
        "title": "Playa da Enchova",
        "subtitle": "Paraíso virgen con río cristalino y piedras pulidas",
        "description": "Una de las playas más salvajes y aisladas de Ilhabela. Un río caudaloso de agua verde forma una laguna antes de unirse al mar abierto.",
        "highlights": [
          "Naturaleza 100% virgen y desierta",
          "Poza de río esmeralda para baño dulce",
          "Piedras pulidas por el océano",
          "Pesca y buceo libre"
        ],
        "ecoTip": "Zona remota. Lleva agua, provisiones y regresa toda tu basura.",
        "specs": {
          "distance": "Sendero de 1 h 30 min desde Bonete o barco",
          "duration": "A pie por Bonete o en lancha",
          "elevation": "+180 m",
          "access": "Sendero desde Praia do Bonete o embarcación",
          "sea": "Mar abierto vigoroso con abundante vida marina y piedras pulidas",
          "structure": "Playa totalmente virgen y desierta, sin quioscos ni comercios"
        }
      },
      "he": {
        "title": "חוף אנשובה (Praia da Enchova)",
        "subtitle": "גן עדן פראי עם נהר מים מתוקים וחלוקי נחל מלוטשים",
        "description": "אחד החופים הפראיים והמבודדים ביותר בברזיל. נהר מים מתוקים צלול יוצר לגונה מרהיבה לפני שהוא נשפך אל האוקיינוס הפתוח.",
        "highlights": [
          "טבע פראי ובתולי לחלוטין ללא אנשים",
          "לגונת מים מתוקים לרחצה",
          "חלוקי נחל ענקיים מלוטשים",
          "אתר דיג ושנירקול נדיר"
        ],
        "ecoTip": "אזור מבודד לחלוטין. קחו עמכם מים ואוכל ואל תשאירו עקבות.",
        "specs": {
          "distance": "שביל של שעה וחצי מ-Bonete או סירה",
          "duration": "ברגל דרך Bonete או בסירת מנוע",
          "elevation": "+180 מ׳",
          "access": "שביל מ-Praia do Bonete או כלי שייט",
          "sea": "ים פתוח עוצמתי עם חיים ימיים עשירים ואבנים מלוטשות",
          "structure": "חוף בתולי ושומם לחלוטין, ללא קיוסקים או חנויות"
        }
      }
    },
    "images": [
      "assets/images/praia-da-enchova_1.jpg"
    ]
  },
  {
    "id": "praia-de-indaiauba",
    "category": "praias",
    "coords": [
      -23.9183,
      -45.3056
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/praia-de-indaiauba_1.jpg",
    "tags": [
      "Águas Turquesa",
      "Areia Branca",
      "Isolada",
      "Paraíso Secreto"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": true,
      "is4x4": false
    },
    "specs": {
      "difficulty": "hard",
      "distance": "Acesso por barco ou trilha avançada",
      "duration": "45 min de barco ou trilha",
      "elevation": "Costeira",
      "access": "Passeios de lancha contratados ou trilha costeira sul",
      "sea": "Águas caribenhas azul-turquesa claríssimas e areia branca finíssima",
      "structure": "Isolada, natureza exuberante sem quiosques"
    },
    "translations": {
      "pt": {
        "title": "Praia de Indaiaúba",
        "subtitle": "O Caribe secreto do sul oceânico de Ilhabela",
        "description": "Um dos segredos mais bem guardados da ilha. Areias brancas finas, mar cristalino de cor turquesa caribenha e encostas verdes cobertas pela densa Mata Atlântica.",
        "highlights": [
          "Águas cristalinas em tom turquesa",
          "Areia branca e fina",
          "Sensação de ilha deserta paradisíaca",
          "Mergulho livre com rica fauna"
        ],
        "ecoTip": "Área de preservação intocada. Não deixe nenhum resíduo.",
        "specs": {
          "distance": "Acesso por barco ou trilha avançada",
          "duration": "45 min de barco ou trilha",
          "elevation": "Costeira",
          "access": "Passeios de lancha contratados ou trilha costeira sul",
          "sea": "Águas caribenhas azul-turquesa claríssimas e areia branca finíssima",
          "structure": "Isolada, natureza exuberante sem quiosques"
        }
      },
      "en": {
        "title": "Indaiaúba Beach",
        "subtitle": "The secret Caribbean oasis of southern Ilhabela",
        "description": "One of the best kept secrets on the archipelago. Fine white sand, striking turquoise Caribbean-like water, and lush rainforest slopes plunging directly into the sea.",
        "highlights": [
          "Vibrant turquoise crystal waters",
          "Powdery white sand",
          "True deserted island paradise feel",
          "Snorkeling with rich marine fauna"
        ],
        "ecoTip": "Pristine conservation zone. Leave nothing behind.",
        "specs": {
          "distance": "Access by boat or advanced trail",
          "duration": "45 min by boat or trail",
          "elevation": "Rocky coast",
          "access": "Booked speedboat tours or southern coastal trail",
          "sea": "Very clear Caribbean-like turquoise waters and fine white sand",
          "structure": "Isolated, lush nature without kiosks"
        }
      },
      "fr": {
        "title": "Plage de Indaiaúba",
        "subtitle": "L oasis caribéenne secrète du sud d Ilhabela",
        "description": "L un des secrets les mieux gardés de l archipel. Sable blanc très fin, eaux turquoise translucides et falaises tropicales plongeant dans l océan.",
        "highlights": [
          "Eaux turquoise caribéennes",
          "Sable blanc immaculé",
          "Atmosphère d île déserte de rêve",
          "Snorkeling extraordinaire"
        ],
        "ecoTip": "Sanctuaire naturel préservé. Respectez les lieux.",
        "specs": {
          "distance": "Accès en bateau ou sentier difficile",
          "duration": "45 min en bateau ou sentier",
          "elevation": "Côte rocheuse",
          "access": "Excursions réservées en bateau rapide ou sentier côtier sud",
          "sea": "Eaux turquoise très claires rappelant les Caraïbes et sable blanc très fin",
          "structure": "Site isolé, nature luxuriante sans kiosques"
        }
      },
      "es": {
        "title": "Playa de Indaiaúba",
        "subtitle": "El Caribe secreto del sur de Ilhabela",
        "description": "Uno de los secretos mejor guardados de la isla. Arena blanca muy fina, aguas turquesas transparentes y selva virgen que llega hasta el agua.",
        "highlights": [
          "Aguas turquesas transparentes",
          "Arena blanca y fina",
          "Sensación de playa desierta de ensueño",
          "Excelente snorkel con peces"
        ],
        "ecoTip": "Zona virgen protegida. No dejes ningún residuo.",
        "specs": {
          "distance": "Acceso en barco o sendero avanzado",
          "duration": "45 min en barco o sendero",
          "elevation": "Costa rocosa",
          "access": "Paseos contratados en lancha o sendero costero sur",
          "sea": "Aguas turquesa muy claras de aspecto caribeño y arena blanca muy fina",
          "structure": "Aislada, naturaleza exuberante sin quioscos"
        }
      },
      "he": {
        "title": "חוף אינדאיאובה (Praia de Indaiaúba)",
        "subtitle": "הקאריביים הסודיים של דרום איליאבלה",
        "description": "אחד הסודות השמורים ביותר באי. חול לבן ודק, מי טורקיז צלולים להפליא בסגנון קאריבי ויער גשם עבות הנושק למים.",
        "highlights": [
          "מי ים בגוון טורקיז קאריבי צלול",
          "חול לבן ורך",
          "תחושה של אי בודד מגן עדן",
          "שנירקול מושלם עם שפע דגים"
        ],
        "ecoTip": "שמורה בתולית מוגנת. קחו את כל הפסולת עמכם.",
        "specs": {
          "distance": "גישה בסירה או בשביל למתקדמים",
          "duration": "45 דקות בסירה או שביל",
          "elevation": "חוף סלעי",
          "access": "סיורי סירת מנוע מוזמנים או שביל החוף הדרומי",
          "sea": "מים טורקיז צלולים מאוד בסגנון קריבי וחול לבן דק במיוחד",
          "structure": "מבודד, טבע עשיר ללא קיוסקים"
        }
      }
    },
    "images": [
      "assets/images/praia-de-indaiauba_1.jpg"
    ]
  },
  {
    "id": "cachoeira-da-laje",
    "category": "cachoeiras",
    "coords": [
      -23.932171146209154,
      -45.40923386772312
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-da-laje_1.jpg",
    "tags": [
      "Tobogã de Pedra",
      "Piscina Profunda",
      "Trilha do Bonete",
      "Aventura"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "Cerca de 4,6 km ida e volta (Parque Estadual)",
      "duration": "Cerca de 2h ida e volta (Prefeitura)",
      "elevation": "+120m",
      "access": "Trilha do Bonete a partir do final da SP-131, Sepituba; agendamento online no Parque Estadual",
      "sea": "Não se aplica (Água doce de rio cristalina e refrescante)",
      "structure": "Ponte pênsil de madeira sobre o rio, área para piquenique natural"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Laje",
        "subtitle": "Trilha até poços naturais; atenção às pedras e à correnteza",
        "description": "A Cachoeira da Laje é a primeira parada da Trilha do Bonete, a partir da Sepituba. O Parque Estadual informa 4,6 km de ida e volta até a Laje, enquanto a Prefeitura cita cerca de 5,1 km para o passeio. Há poços para banho, mas pedras escorregadias e correnteza exigem cautela. Use as passarelas ao atravessar rios.",
        "highlights": [
          "Primeira cachoeira da Trilha do Bonete",
          "Cerca de 4,6 km ida e volta (Parque Estadual)",
          "Poços naturais: observe as condições antes do banho",
          "Pedras escorregadias e travessias por passarela"
        ],
        "ecoTip": "Evite mergulhos e escorregadores com correnteza forte; avalie as condições locais antes de entrar na água.",
        "specs": {
          "distance": "4,6 km ida e volta até a Laje (Parque Estadual)",
          "duration": "Cerca de 2h ida e volta (Prefeitura)",
          "elevation": "+120m",
          "access": "Ponta da Sepituba, final da SP-131; acesso pela Trilha do Bonete e agendamento no Parque Estadual",
          "sea": "Não se aplica (Água doce de rio cristalina e refrescante)",
          "structure": "Ponte pênsil de madeira sobre o rio, área para piquenique natural"
        }
      },
      "en": {
        "title": "Laje Waterfall (Cachoeira da Laje)",
        "subtitle": "Trail to natural pools; beware of slippery rocks and currents",
        "description": "Laje Waterfall is the first major stop on the Bonete trail from Sepituba. The State Park lists a 4.6 km round trip to Laje, while the municipality reports about 5.1 km for the outing. Natural pools may allow bathing, but slippery rocks and currents require caution. Use the footbridges when crossing streams.",
        "highlights": [
          "First waterfall on the Bonete trail",
          "About 4.6 km round trip (State Park)",
          "Check water conditions before bathing",
          "Slippery rocks and designated footbridges"
        ],
        "ecoTip": "Avoid diving or using the rock slide in strong currents; assess conditions before entering the water.",
        "specs": {
          "distance": "4.6 km round trip to Laje (State Park)",
          "duration": "About 2 hours round trip (municipality)",
          "elevation": "+120 m",
          "access": "Start at Sepituba, end of SP-131; follow the Bonete trail and check State Park booking",
          "sea": "Not applicable (clear, refreshing river water)",
          "structure": "Wooden suspension bridge over the river and natural picnic area"
        }
      },
      "fr": {
        "title": "Cascade da Laje",
        "subtitle": "Sentier vers des bassins naturels : rochers glissants et courant",
        "description": "La cascade da Laje est la première grande halte du sentier du Bonete, au départ de Sepituba. Le Parc d'État indique 4,6 km aller-retour jusqu'à Laje, tandis que la municipalité annonce environ 5,1 km. Des bassins permettent parfois la baignade, mais les rochers glissants et le courant exigent de la prudence. Empruntez les passerelles pour traverser les rivières.",
        "highlights": [
          "Première cascade du sentier du Bonete",
          "Environ 4,6 km aller-retour (Parc d'État)",
          "Vérifier les conditions avant la baignade",
          "Rochers glissants et passerelles"
        ],
        "ecoTip": "Évitez les plongeons et le toboggan naturel en cas de courant fort; vérifiez les conditions sur place.",
        "specs": {
          "distance": "4,6 km aller-retour jusqu'à Laje (Parc d'État)",
          "duration": "Environ 2 h aller-retour (municipalité)",
          "elevation": "+120 m",
          "access": "Départ à Sepituba, fin de la SP-131 ; sentier du Bonete, réservation auprès du Parc d'État",
          "sea": "Sans objet (eau de rivière cristalline et rafraîchissante)",
          "structure": "Pont suspendu en bois sur la rivière et aire naturelle de pique-nique"
        }
      },
      "es": {
        "title": "Cascada da Laje",
        "subtitle": "Sendero a pozas naturales: precaución con rocas y corriente",
        "description": "La cascada da Laje es la primera gran parada del sendero a Bonete desde Sepituba. El Parque Estatal indica 4,6 km ida y vuelta hasta Laje y el municipio señala unos 5,1 km para el paseo. Hay pozas naturales, pero las rocas resbaladizas y la corriente exigen precaución. Utiliza las pasarelas para cruzar los ríos.",
        "highlights": [
          "Primera cascada de la ruta a Bonete",
          "Unos 4,6 km ida y vuelta (Parque Estatal)",
          "Comprobar condiciones antes del baño",
          "Rocas resbaladizas y pasarelas"
        ],
        "ecoTip": "Evita saltos y toboganes naturales con corriente fuerte; comprueba las condiciones antes de entrar al agua.",
        "specs": {
          "distance": "4,6 km ida y vuelta hasta Laje (Parque Estatal)",
          "duration": "Unas 2 horas ida y vuelta (municipio)",
          "elevation": "+120 m",
          "access": "Inicio en Sepituba, final de la SP-131; sendero a Bonete, reserva del Parque Estatal",
          "sea": "No corresponde (agua de río cristalina y refrescante)",
          "structure": "Puente colgante de madera sobre el río y zona natural de pícnic"
        }
      },
      "he": {
        "title": "מפל לאז׳י (Cachoeira da Laje)",
        "subtitle": "שביל לבריכות טבעיות; זהירות מסלעים חלקים ומזרם חזק",
        "description": "מפל לאז׳ה הוא התחנה הראשונה בשביל בונטה היוצא מספיטובה. לפי הפארק המדינתי המסלול עד למפל וחזרה הוא כ־4.6 ק״מ, ולפי העירייה כ־5.1 ק״מ. יש בריכות טבעיות, אך סלעים חלקלקים וזרם מים חזק מחייבים זהירות. חצו נחלים רק בגשרים המיועדים לכך.",
        "highlights": [
          "המפל הראשון בשביל בונטה",
          "כ־4.6 ק״מ הלוך ושוב לפי הפארק",
          "יש לבדוק תנאים לפני רחצה",
          "סלעים חלקים וגשרים לחציית נחלים"
        ],
        "ecoTip": "הימנעו מקפיצה למים ומשימוש במגלשת הסלע בזרם חזק; בדקו את התנאים במקום.",
        "specs": {
          "distance": "4.6 ק״מ הלוך ושוב עד למפל (הפארק המדינתי)",
          "duration": "כשעתיים הלוך ושוב (העירייה)",
          "elevation": "+120 מ׳",
          "access": "התחלה בספיטובה בקצה כביש SP-131, בשביל בונטה; בדקו הזמנה בפארק המדינתי",
          "sea": "לא רלוונטי (מי נהר צלולים ומרעננים)",
          "structure": "גשר תלוי מעץ מעל הנהר ואזור פיקניק טבעי"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-da-laje_1.jpg"
    ]
  },
  {
    "id": "cachoeira-da-toca",
    "category": "cachoeiras",
    "coords": [
      -23.8056,
      -45.3489
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-da-toca_1.jpg",
    "tags": [
      "Tobogã 50m",
      "Gruta Histórica",
      "Alambique",
      "Família"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Trecho interno de visitação; confirmar no local",
      "duration": "Tempo de visita variável; confirmar com a administração",
      "elevation": "Fácil",
      "access": "Fazenda da Toca, início da Estrada de Castelhanos; propriedade particular, confirme visitação e ingresso",
      "sea": "Não se aplica (Tobogã de pedra e duchas naturais)",
      "structure": "Estrutura de visitação privada; disponibilidade e taxa devem ser confirmadas"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Toca",
        "subtitle": "Gruta, tobogã natural e engenho em propriedade privada",
        "description": "A Cachoeira da Toca fica na Fazenda da Toca, propriedade particular próxima ao início da Estrada de Castelhanos. É conhecida pela gruta e pelo escorregador natural de pedra, citado com cerca de 50 metros. O local pode cobrar entrada e oferecer serviços, sujeitos a confirmação com a administração. Pedras molhadas, poços profundos e correnteza exigem cuidado; não há garantia de uso seguro do tobogã.",
        "highlights": [
          "Cachoeira e gruta na Fazenda da Toca",
          "Escorregador natural de pedra: avalie os riscos",
          "Propriedade privada com possível cobrança de ingresso",
          "Confirme funcionamento e serviços antes da visita"
        ],
        "ecoTip": "Evite o tobogã e os poços quando não houver condições seguras; siga as orientações do responsável pelo local.",
        "specs": {
          "distance": "Trecho de visitação na fazenda; confirme no local",
          "duration": "Tempo variável conforme a visita",
          "elevation": "Fácil",
          "access": "Fazenda da Toca, início da Estrada de Castelhanos; entrada particular",
          "sea": "Não se aplica (Tobogã de pedra e duchas naturais)",
          "structure": "Estrutura e taxa de entrada sujeitas à confirmação com o local"
        }
      },
      "en": {
        "title": "Toca Waterfall (Cachoeira da Toca)",
        "subtitle": "Grotto, natural rock slide and historic private estate",
        "description": "Toca Waterfall lies on the privately owned Fazenda da Toca near the start of the Castelhanos road. It is known for a grotto and a natural rock slide reportedly about 50 meters long. Admission and visitor facilities may be available; confirm current arrangements with the operator. Wet rocks, deep pools and currents pose risks, and the slide should never be assumed safe to use.",
        "highlights": [
          "Grotto at the historic Fazenda da Toca",
          "Natural rock slide: assess safety first",
          "Private property; admission may be charged",
          "Confirm opening and facilities in advance"
        ],
        "ecoTip": "Avoid the slide and pools when conditions are unsafe; follow the site's staff instructions.",
        "specs": {
          "distance": "Short estate visit; confirm on site",
          "duration": "Variable, depending on your visit",
          "elevation": "Easy",
          "access": "Fazenda da Toca, start of Castelhanos road; privately managed entry",
          "sea": "Not applicable (rock slide and natural showers)",
          "structure": "Facilities and admission subject to confirmation"
        }
      },
      "fr": {
        "title": "Cascade da Toca",
        "subtitle": "Grotte, glissade rocheuse naturelle et ancienne exploitation privée",
        "description": "La cascade da Toca se situe sur la propriété privée Fazenda da Toca, près du début de la route de Castelhanos. On y trouve une grotte et une glissade naturelle sur roche d'environ 50 mètres selon les descriptions locales. L'entrée et les installations peuvent être payantes : renseignez-vous auprès de l'exploitant. Rochers humides, bassins profonds et courant présentent des risques ; la glissade n'est pas garantie sûre.",
        "highlights": [
          "Grotte de la Fazenda da Toca",
          "Glissade rocheuse : vérifier les risques",
          "Propriété privée, entrée possiblement payante",
          "Confirmer les horaires et services"
        ],
        "ecoTip": "Évitez les bassins et la glissade si les conditions sont dangereuses ; suivez les consignes du site.",
        "specs": {
          "distance": "Visite sur la propriété ; à confirmer sur place",
          "duration": "Durée variable selon la visite",
          "elevation": "Facile",
          "access": "Fazenda da Toca, début de la route de Castelhanos ; accès privé",
          "sea": "Sans objet (toboggan rocheux et douches naturelles)",
          "structure": "Services et tarif à confirmer auprès de l'exploitant"
        }
      },
      "es": {
        "title": "Cascada da Toca",
        "subtitle": "Gruta, tobogán natural y antigua hacienda privada",
        "description": "La cascada da Toca está en la propiedad privada Fazenda da Toca, cerca del inicio de la carretera a Castelhanos. Es conocida por una gruta y un tobogán natural de roca de unos 50 metros según referencias locales. Puede cobrarse entrada y haber servicios; confirma las condiciones con la administración. Las rocas mojadas, las pozas profundas y la corriente implican riesgos; no supongas que el tobogán es seguro.",
        "highlights": [
          "Gruta de la histórica Fazenda da Toca",
          "Tobogán de piedra: comprobar riesgos",
          "Propiedad privada con posible entrada de pago",
          "Confirmar horarios y servicios antes de ir"
        ],
        "ecoTip": "Evita los toboganes y pozas si no hay condiciones seguras; sigue las indicaciones del personal.",
        "specs": {
          "distance": "Recorrido dentro de la finca; confirmar",
          "duration": "Duración variable de visita",
          "elevation": "Fácil",
          "access": "Fazenda da Toca, inicio de la carretera de Castelhanos; acceso privado",
          "sea": "No corresponde (tobogán de piedra y duchas naturales)",
          "structure": "Servicios y tarifa sujetos a confirmación"
        }
      },
      "he": {
        "title": "מפל טוקה (Cachoeira da Toca)",
        "subtitle": "מערה, מגלשת סלע טבעית ואתר היסטורי בשטח פרטי",
        "description": "מפל טוקה נמצא בחוות טוקה הפרטית סמוך לתחילת הדרך לקסטליאנוס. המקום ידוע במערה ובמגלשת סלע טבעית שאורכה לפי תיאורים מקומיים כ־50 מטר. ייתכנו דמי כניסה ושירותים למבקרים, ויש לברר מראש עם המפעיל. סלעים רטובים, בריכות עמוקות וזרם חזק מסוכנים; אין להניח שהשימוש במגלשה בטוח.",
        "highlights": [
          "מערה בחוות טוקה ההיסטורית",
          "מגלשת סלע טבעית: יש להעריך סיכונים",
          "שטח פרטי, ייתכן תשלום בכניסה",
          "בדקו שעות פתיחה ושירותים מראש"
        ],
        "ecoTip": "הימנעו ממגלשת הסלע ומהבריכות בתנאים מסוכנים ופעלו לפי הוראות צוות המקום.",
        "specs": {
          "distance": "מסלול בתוך החווה; יש לברר במקום",
          "duration": "משך ביקור משתנה",
          "elevation": "קל",
          "access": "חוות טוקה בתחילת דרך קסטליאנוס; כניסה לשטח פרטי",
          "sea": "לא רלוונטי (מגלשת סלע ומקלחות טבעיות)",
          "structure": "שירותים ומחיר כניסה טעונים אישור מהמפעיל"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-da-toca_1.jpg"
    ]
  },
  {
    "id": "cachoeira-do-veloso",
    "category": "cachoeiras",
    "coords": [
      -23.8767,
      -45.4267
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-do-veloso_1.jpg",
    "tags": [
      "Queda 30m",
      "Samambaias Gigantes",
      "Sul da Ilha",
      "Tranquila"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "1 km a partir do bairro do Veloso",
      "duration": "25 min de caminhada",
      "elevation": "+110m",
      "access": "Trilha sombreada a partir do bairro do Veloso (lado sul)",
      "sea": "Não se aplica (Queda d água de 30m cercada por mata virgem)",
      "structure": "Trilha nativa sinalizada, sem comércio no topo"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira do Veloso",
        "subtitle": "Queda majestosa de 30 metros cercada por samambaias gigantes",
        "description": "Uma das mais belas e preservadas cachoeiras do sul da ilha. A caminhada de 25 minutos atravessa a floresta até um imponente paredão rochoso com ducha refrescante.",
        "highlights": [
          "Queda d água de 30 metros",
          "Samambaias arborescentes gigantes",
          "Ambiente tranquilo e sombreado",
          "Poço de água límpida para banho"
        ],
        "ecoTip": "Use calçado com boa aderência nas pedras.",
        "specs": {
          "distance": "1 km a partir do bairro do Veloso",
          "duration": "25 min de caminhada",
          "elevation": "+110m",
          "access": "Trilha sombreada a partir do bairro do Veloso (lado sul)",
          "sea": "Não se aplica (Queda d água de 30m cercada por mata virgem)",
          "structure": "Trilha nativa sinalizada, sem comércio no topo"
        }
      },
      "en": {
        "title": "Veloso Waterfall",
        "subtitle": "Majestic 100-foot cascade surrounded by giant tree ferns",
        "description": "One of the most serene waterfalls in southern Ilhabela. The 25-minute jungle walk leads to an impressive rock amphitheater with a powerful refreshing shower.",
        "highlights": [
          "30-meter dramatic cascade",
          "Ancient giant tree ferns",
          "Quiet and shaded rainforest setting",
          "Refreshing clear dip pool"
        ],
        "ecoTip": "Wear shoes with good traction on slippery stones.",
        "specs": {
          "distance": "1 km from the Veloso neighborhood",
          "duration": "25 min walk",
          "elevation": "+110 m",
          "access": "Shaded trail from Veloso (south side)",
          "sea": "Not applicable (30 m waterfall surrounded by untouched forest)",
          "structure": "Signposted native trail, no shops at the top"
        }
      },
      "fr": {
        "title": "Cascade do Veloso",
        "subtitle": "Chute majestueuse de 30 mètres au milieu des fougères géantes",
        "description": "L une des cascades les plus préservées du sud de l île. Une marche de 25 minutes mène à un amphithéâtre rocheux grandiose et une douche revigorante.",
        "highlights": [
          "Chute d eau de 30 mètres",
          "Fougères arborescentes géantes",
          "Ambiance calme et ombragée",
          "Bassin de baignade rafraîchissant"
        ],
        "ecoTip": "Portez des chaussures adhérentes pour marcher sur les roches.",
        "specs": {
          "distance": "1 km depuis le quartier Veloso",
          "duration": "25 min de marche",
          "elevation": "+110 m",
          "access": "Sentier ombragé depuis Veloso (côté sud)",
          "sea": "Sans objet (cascade de 30 m entourée de forêt vierge)",
          "structure": "Sentier naturel balisé, aucun commerce au sommet"
        }
      },
      "es": {
        "title": "Cascada do Veloso",
        "subtitle": "Majestuosa caída de 30 metros entre helechos gigantes",
        "description": "Una de las cascadas más hermosas del sur. Una caminata de 25 minutos por la selva te lleva a un anfiteatro rocoso con una ducha natural inolvidable.",
        "highlights": [
          "Caída de agua de 30 metros",
          "Helechos gigantes milenarios",
          "Ambiente sereno y con sombra",
          "Poza cristalina para refrescarse"
        ],
        "ecoTip": "Usa calzado adecuado para no resbalar en las piedras.",
        "specs": {
          "distance": "1 km desde el barrio Veloso",
          "duration": "25 min caminando",
          "elevation": "+110 m",
          "access": "Sendero sombreado desde Veloso (lado sur)",
          "sea": "No corresponde (cascada de 30 m rodeada de bosque virgen)",
          "structure": "Sendero natural señalizado, sin comercios arriba"
        }
      },
      "he": {
        "title": "מפל ולוזו (Cachoeira do Veloso)",
        "subtitle": "מפל מרהיב בגובה 30 מטר המוקף בשרכי ענק טרופיים",
        "description": "אחד המפלים היפים והשלווים בדרום האי. הליכה נעימה של 25 דקות בתוך יער הגשם מובילה למפל מים שוצף עם בריכת מים צלולה ומקלחת טבעית מרעננת.",
        "highlights": [
          "מפל מרשים בגובה 30 מטר",
          "שרכי ענק עתיקים וצמחייה טרופית",
          "אווירה שקטה ומוצלת",
          "בריכת מים קרירה וצלולה"
        ],
        "ecoTip": "נעלו נעליים עם אחיזה טובה בסלעים.",
        "specs": {
          "distance": "1 ק״מ משכונת Veloso",
          "duration": "25 דקות הליכה",
          "elevation": "+110 מ׳",
          "access": "שביל מוצל משכונת Veloso (דרום)",
          "sea": "לא רלוונטי (מפל בגובה 30 מ׳ מוקף יער בתולי)",
          "structure": "שביל טבעי מסומן, ללא מסחר למעלה"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-do-veloso_1.jpg"
    ]
  },
  {
    "id": "cachoeira-do-paqueta",
    "category": "cachoeiras",
    "coords": [
      -23.8572,
      -45.4089
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-do-paqueta_1.jpg",
    "tags": [
      "Alerta de Risco",
      "Área Particular",
      "Pedras Escorregadias",
      "Vista do Canal"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "1.2 km (trilha)",
      "duration": "30 min de caminhada",
      "elevation": "+150m",
      "access": "Acesso na região do Bexiga; área particular com riscos graves alertados pela Prefeitura",
      "sea": "Não se aplica (Água doce de nascente gelada e revigorante)",
      "structure": "Segundo alerta municipal de 2024, falta sinalização e estrutura de segurança adequada"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira do Paquetá",
        "subtitle": "Alerta da Prefeitura: risco de acidentes graves e fatais",
        "description": "A Cachoeira do Paquetá, na região do Bexiga, é conhecida pelo poço com vista para o Canal de São Sebastião. A Prefeitura de Ilhabela alertou oficialmente em 2024 para risco de acidentes graves e até fatais: há pedras escorregadias, sinalização insuficiente e falta de estruturas adequadas. Trata-se de área particular. Não considere a borda elevada um local seguro para banho ou fotografias.",
        "highlights": [
          "Alerta oficial de acidentes graves e fatais",
          "Pedras escorregadias e falta de proteção",
          "Área particular sem estrutura adequada de segurança",
          "Não se aproxime das bordas para fotografias"
        ],
        "ecoTip": "Evite bordas expostas, mergulhos e aproximação de quedas; respeite avisos e possíveis restrições de acesso.",
        "specs": {
          "distance": "1.2 km (trilha)",
          "duration": "30 min de caminhada",
          "elevation": "+150m",
          "access": "Região do Bexiga; área particular e acesso com riscos sinalizados pela Prefeitura",
          "sea": "Não se aplica (Água doce de nascente gelada e revigorante)",
          "structure": "Prefeitura alerta para insuficiência de sinalização e proteção (2024)"
        }
      },
      "en": {
        "title": "Paquetá Waterfall",
        "subtitle": "Municipal warning: serious and potentially fatal accidents",
        "description": "Paquetá Waterfall near Bexiga is known for its elevated pool overlooking the São Sebastião Channel. In 2024, Ilhabela's municipality warned of serious and potentially fatal accidents due to slippery rocks, insufficient signs and inadequate safety structures. This is private property. Do not treat the exposed pool edge as a safe place for swimming or photos.",
        "highlights": [
          "Official warning of serious and fatal accidents",
          "Slippery rocks and inadequate safeguards",
          "Private property with limited safety infrastructure",
          "Keep away from exposed edges for photos"
        ],
        "ecoTip": "Avoid exposed edges, dives and falls; heed warnings and any access restrictions.",
        "specs": {
          "distance": "1.2 km (trail)",
          "duration": "30 min walk",
          "elevation": "+150 m",
          "access": "Bexiga area; private property with officially reported access hazards",
          "sea": "Not applicable (cold, invigorating spring water)",
          "structure": "Municipal warning: inadequate signs and safety infrastructure (2024)"
        }
      },
      "fr": {
        "title": "Cascade do Paquetá",
        "subtitle": "Alerte municipale : accidents graves, voire mortels",
        "description": "La cascade du Paquetá, près de Bexiga, est connue pour son bassin surplombant le canal de São Sebastião. En 2024, la municipalité d'Ilhabela a alerté sur des accidents graves, voire mortels, liés aux rochers glissants, au manque de signalisation et de protections adaptées. Le site est privé. Ne considérez pas le bord surélevé comme un endroit sûr pour nager ou prendre des photos.",
        "highlights": [
          "Alerte officielle sur les accidents graves ou mortels",
          "Rochers glissants et protections insuffisantes",
          "Site privé dépourvu de sécurité adaptée",
          "Ne vous approchez pas du bord pour des photos"
        ],
        "ecoTip": "Évitez les bords exposés, les plongeons et les chutes ; respectez les avertissements et restrictions.",
        "specs": {
          "distance": "1,2 km (sentier)",
          "duration": "30 min de marche",
          "elevation": "+150 m",
          "access": "Secteur Bexiga ; terrain privé, accès présentant des risques signalés",
          "sea": "Sans objet (eau de source froide et revigorante)",
          "structure": "Alerte municipale : signalisation et dispositifs de protection insuffisants (2024)"
        }
      },
      "es": {
        "title": "Cascada do Paquetá",
        "subtitle": "Advertencia municipal: accidentes graves y mortales",
        "description": "La cascada de Paquetá, cerca de Bexiga, es conocida por su poza elevada con vistas al canal de São Sebastião. En 2024, el municipio de Ilhabela advirtió del riesgo de accidentes graves e incluso mortales debido a rocas resbaladizas, señalización insuficiente y falta de protección. Está en una propiedad privada. No consideres seguro el borde elevado para bañarte o tomar fotos.",
        "highlights": [
          "Alerta oficial de accidentes graves o mortales",
          "Rocas resbaladizas y falta de protección",
          "Propiedad privada sin seguridad adecuada",
          "No te acerques a los bordes para hacer fotos"
        ],
        "ecoTip": "Evita bordes expuestos, saltos y caídas; respeta advertencias y restricciones de acceso.",
        "specs": {
          "distance": "1,2 km (sendero)",
          "duration": "30 min caminando",
          "elevation": "+150 m",
          "access": "Zona de Bexiga; propiedad privada con riesgos señalados oficialmente",
          "sea": "No corresponde (agua de manantial fría y revitalizante)",
          "structure": "Alerta municipal: señalización y protección insuficientes (2024)"
        }
      },
      "he": {
        "title": "מפל פאקטה (Cachoeira do Paquetá)",
        "subtitle": "אזהרת העירייה: סכנת תאונות קשות ואף קטלניות",
        "description": "מפל פקטה ליד בקסיגה מוכר בזכות בריכת הסלע המשקיפה על תעלת סאו סבסטיאו. בשנת 2024 פרסמה עיריית איליאבלה אזהרה מפני תאונות קשות ואף קטלניות בשל סלעים חלקים, שילוט חסר ואמצעי בטיחות לא מספקים. המקום נמצא בשטח פרטי. אין לראות בשפת הבריכה הגבוהה מקום בטוח לרחצה או לצילום.",
        "highlights": [
          "אזהרה רשמית מפני תאונות קשות וקטלניות",
          "סלעים חלקים והיעדר אמצעי הגנה",
          "שטח פרטי ללא תשתית בטיחות מתאימה",
          "אין להתקרב לשפה החשופה לצילום"
        ],
        "ecoTip": "הימנעו מקצוות חשופים ומקפיצה למים; כבדו שלטי אזהרה והגבלות כניסה.",
        "specs": {
          "distance": "1.2 ק״מ (שביל)",
          "duration": "30 דקות הליכה",
          "elevation": "+150 מ׳",
          "access": "אזור בקסיגה; שטח פרטי עם סיכונים שפורסמו על ידי העירייה",
          "sea": "לא רלוונטי (מי מעיין קרים ומרעננים)",
          "structure": "אזהרת העירייה על מחסור בשילוט ובהגנות בטיחות (2024)"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-do-paqueta_1.jpg",
      "assets/images/cachoeira-do-paqueta_2.jpg"
    ]
  },
  {
    "id": "cachoeira-do-gato",
    "category": "cachoeiras",
    "coords": [
      -23.8589,
      -45.2819
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-do-gato_1.jpg",
    "tags": [
      "Queda 40m",
      "Trilha na Mata",
      "Castelhanos",
      "Poço Amplo"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": true
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "4 a 5 km (percurso informado pelo Parque Estadual)",
      "duration": "1h a 1h30 (percurso informado pelo Parque Estadual)",
      "elevation": "+90m",
      "access": "Início na Ponta do Gato, Canto do Ribeirão, em Castelhanos; acesso à região por barco ou 4x4",
      "sea": "Não se aplica (Queda de 40 metros em meio à floresta)",
      "structure": "Sem estrutura; trilha sinalizada com passarelas e pontes de madeira suspensas"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira do Gato",
        "subtitle": "Trilha na Mata Atlântica até uma queda para contemplação",
        "description": "A trilha da Ponta do Gato, em Castelhanos, atravessa a Mata Atlântica até a cachoeira. A queda principal é apenas para contemplação: o banho é destinado ao Poço do Gordo. O acesso a Castelhanos é por barco ou pela estrada com veículo 4x4.",
        "highlights": [
          "Cachoeira principal: somente contemplação",
          "Banho permitido no Poço do Gordo, não na queda principal",
          "Trilha por Mata Atlântica e ponte pênsil",
          "Acesso à região por barco ou 4x4"
        ],
        "ecoTip": "Trilha dentro do Parque Estadual. Mantenha-se na rota demarcada.",
        "specs": {
          "distance": "4 a 5 km (percurso informado pelo Parque Estadual)",
          "duration": "1h a 1h30 (percurso informado pelo Parque Estadual)",
          "elevation": "+90m",
          "access": "Início na Ponta do Gato, Canto do Ribeirão, em Castelhanos; acesso à região por barco ou 4x4",
          "sea": "Não se aplica (Queda de 40 metros em meio à floresta)",
          "structure": "Sem estrutura; trilha sinalizada com passarelas e pontes de madeira suspensas"
        }
      },
      "en": {
        "title": "Cat Waterfall (Cachoeira do Gato)",
        "subtitle": "Atlantic Forest hike to a viewing-only waterfall",
        "description": "The trail from Ponta do Gato in Castelhanos crosses the Atlantic Forest to reach the waterfall. The main cascade is for viewing only; swimming is designated for Poço do Gordo. Castelhanos is reached by boat or 4x4.",
        "highlights": [
          "Main waterfall: viewing only",
          "Swimming at Poço do Gordo, not at the main cascade",
          "Atlantic Forest trail and suspension bridge",
          "Reach Castelhanos by boat or 4x4"
        ],
        "ecoTip": "State Park protected zone. Stay on marked trails.",
        "specs": {
          "distance": "4–5 km (State Park route)",
          "duration": "1–1.5 hours (State Park route)",
          "elevation": "+90 m",
          "access": "Trailhead at Ponta do Gato, Canto do Ribeirão, Castelhanos; reach the area by boat or 4x4",
          "sea": "Not applicable (40 m waterfall in the forest)",
          "structure": "No facilities; marked trail with walkways and suspended wooden bridges"
        }
      },
      "fr": {
        "title": "Cascade du Chat (Cachoeira do Gato)",
        "subtitle": "Randonnée en forêt vers une cascade à contempler",
        "description": "Le sentier de Ponta do Gato, à Castelhanos, traverse la forêt atlantique jusqu'à la cascade principale, réservée à la contemplation. La baignade se fait au Poço do Gordo. Accès à Castelhanos par bateau ou 4x4.",
        "highlights": [
          "Cascade principale réservée à la contemplation",
          "Baignade au Poço do Gordo, pas à la cascade",
          "Sentier en forêt et pont suspendu",
          "Accès à Castelhanos par bateau ou 4x4"
        ],
        "ecoTip": "Zone protégée du Parc d État. Restez sur le sentier balisé.",
        "specs": {
          "distance": "4 à 5 km (parcours du Parc d'État)",
          "duration": "1 h à 1 h 30 (parcours du Parc d'État)",
          "elevation": "+90 m",
          "access": "Départ à Ponta do Gato, Canto do Ribeirão, Castelhanos; accès par bateau ou 4x4",
          "sea": "Sans objet (cascade de 40 m au cœur de la forêt)",
          "structure": "Sans équipements ; sentier balisé avec passerelles et ponts suspendus en bois"
        }
      },
      "es": {
        "title": "Cascada do Gato",
        "subtitle": "Sendero por la selva hasta una cascada para contemplar",
        "description": "El sendero de Ponta do Gato, en Castelhanos, atraviesa la Mata Atlántica hasta la cascada principal, destinada solo a la contemplación. El baño se realiza en Poço do Gordo. Se llega a Castelhanos en barco o 4x4.",
        "highlights": [
          "Cascada principal: solo contemplación",
          "Baño en Poço do Gordo, no en la cascada",
          "Sendero de selva y puente colgante",
          "Acceso a Castelhanos en barco o 4x4"
        ],
        "ecoTip": "Zona del Parque Estatal. Respeta el sendero marcado y no dejes basura.",
        "specs": {
          "distance": "4 a 5 km (recorrido del Parque Estatal)",
          "duration": "1 h a 1 h 30 (recorrido del Parque Estatal)",
          "elevation": "+90 m",
          "access": "Inicio en Ponta do Gato, Canto do Ribeirão, Castelhanos; llegada en barco o 4x4",
          "sea": "No corresponde (cascada de 40 m en el bosque)",
          "structure": "Sin infraestructura; sendero señalizado con pasarelas y puentes colgantes de madera"
        }
      },
      "he": {
        "title": "מפל החתול (Cachoeira do Gato)",
        "subtitle": "מסלול ביער אל מפל לצפייה בלבד",
        "description": "השביל מפונטה דו גאטו בקסטליאנוס חוצה את היער האטלנטי עד למפל הראשי, המיועד לצפייה בלבד. הרחצה מיועדת לפוסו דו גורדו. ההגעה לקסטליאנוס היא בסירה או ברכב 4x4.",
        "highlights": [
          "המפל הראשי לצפייה בלבד",
          "הרחצה בפוסו דו גורדו, לא במפל הראשי",
          "שביל ביער וגשר תלוי",
          "הגעה לקסטליאנוס בסירה או 4x4"
        ],
        "ecoTip": "שמורה מוגנת בפארק הלאומי. הישארו בשבילים המסומנים.",
        "specs": {
          "distance": "4–5 ק״מ (לפי הפארק)",
          "duration": "שעה עד שעה וחצי (לפי הפארק)",
          "elevation": "+90 מ׳",
          "access": "תחילת השביל בפונטה דו גאטו, קאנטו דו ריבייראו, קסטליאנוס; הגעה בסירה או 4x4",
          "sea": "לא רלוונטי (מפל בגובה 40 מ׳ בתוך היער)",
          "structure": "ללא תשתיות; שביל מסומן עם מעברים וגשרי עץ תלויים"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-do-gato_1.jpg"
    ]
  },
  {
    "id": "cachoeira-dos-tres-tombos",
    "category": "cachoeiras",
    "coords": [
      -23.8486,
      -45.4019
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-dos-tres-tombos_1.jpg",
    "tags": [
      "Fácil Acesso",
      "Família",
      "Três Quedas",
      "Ducha Natural"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "Cerca de 720 m (ida e volta, Prefeitura)",
      "duration": "Até 1h (Parque Estadual)",
      "elevation": "+30m",
      "access": "Entrada oficial: final da Alameda dos Guapuruvus, Feiticeira; monitoria obrigatória e agendamento online (Parque Estadual)",
      "sea": "Não se aplica (Três quedas e duchas naturais)",
      "structure": "Estacionamento próximo e passarela inicial de madeira"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira dos Três Tombos",
        "subtitle": "Trilha curta com três quedas: atenção às pedras escorregadias",
        "description": "Conjunto de três quedas próximo à Praia da Feiticeira, com trilha curta. Há pontos de banho no início, mas pedras escorregadias e a força da água exigem cuidado. A terceira queda não tem poço para mergulho. O Parque Estadual exige monitoria e informa agendamento online.",
        "highlights": [
          "Trilha curta com monitoria obrigatória",
          "Banho possível apenas nos pontos apropriados",
          "Cuidado com pedras escorregadias",
          "Terceira queda sem poço para mergulho"
        ],
        "ecoTip": "Siga as orientações do monitor; evite entrar na água com correnteza forte ou pedras escorregadias.",
        "specs": {
          "distance": "Cerca de 720 m (ida e volta, Prefeitura)",
          "duration": "Até 1h (Parque Estadual)",
          "elevation": "+30m",
          "access": "Entrada oficial: final da Alameda dos Guapuruvus, Feiticeira; monitoria obrigatória e agendamento online (Parque Estadual)",
          "sea": "Não se aplica (Três quedas e duchas naturais)",
          "structure": "Estacionamento próximo e passarela inicial de madeira"
        }
      },
      "en": {
        "title": "Três Tombos Waterfall",
        "subtitle": "Short three-waterfall trail: beware slippery rocks",
        "description": "Three waterfalls near Praia da Feiticeira, reached by a short trail. Bathing is possible near the start, but slippery rocks and strong currents demand care. There is no plunge pool at the third waterfall. The State Park requires a guide and offers online booking.",
        "highlights": [
          "Short trail with mandatory guide",
          "Swim only where conditions permit",
          "Watch out for slippery rocks",
          "No plunge pool at the third waterfall"
        ],
        "ecoTip": "Follow the guide’s instructions; avoid the water when currents are strong or rocks are slippery.",
        "specs": {
          "distance": "About 720 m round trip (municipality)",
          "duration": "Up to 1 hour (State Park)",
          "elevation": "+30 m",
          "access": "Official trailhead: end of Alameda dos Guapuruvus, Feiticeira; guide required and online booking (State Park)",
          "sea": "Not applicable (three waterfalls and natural showers)",
          "structure": "Nearby parking and an initial wooden walkway"
        }
      },
      "fr": {
        "title": "Cascade des Trois Tombos",
        "subtitle": "Courte randonnée vers trois cascades : rochers glissants",
        "description": "Trois cascades près de Praia da Feiticeira, accessibles par un court sentier. La baignade est possible au début, mais les rochers glissants et le courant exigent de la prudence. La troisième chute n'a pas de bassin de baignade. Le Parc d’État impose un guide et indique une réservation en ligne.",
        "highlights": [
          "Court sentier avec guide obligatoire",
          "Baignade uniquement si les conditions le permettent",
          "Attention aux rochers glissants",
          "Pas de bassin à la troisième chute"
        ],
        "ecoTip": "Suivez les consignes du guide et évitez l’eau si le courant est fort ou les rochers glissants.",
        "specs": {
          "distance": "Environ 720 m aller-retour (municipalité)",
          "duration": "Jusqu'à 1 heure (Parc d'État)",
          "elevation": "+30 m",
          "access": "Départ officiel : bout de l’Alameda dos Guapuruvus, Feiticeira ; guide obligatoire et réservation en ligne (Parc d’État)",
          "sea": "Sans objet (trois cascades et douches naturelles)",
          "structure": "Parking à proximité et passerelle initiale en bois"
        }
      },
      "es": {
        "title": "Cascada de los Tres Tombos",
        "subtitle": "Ruta corta a tres cascadas: cuidado con las rocas resbaladizas",
        "description": "Tres cascadas cerca de Praia da Feiticeira, accesibles por un sendero corto. Se puede bañar al inicio, pero las rocas resbaladizas y la fuerza del agua exigen precaución. La tercera caída no tiene poza para sumergirse. El Parque Estatal exige monitor y señala reserva en línea.",
        "highlights": [
          "Ruta corta con monitor obligatorio",
          "Baño solo donde las condiciones lo permitan",
          "Precaución con rocas resbaladizas",
          "Tercera caída sin poza para zambullirse"
        ],
        "ecoTip": "Sigue las indicaciones del monitor y evita el agua con corriente fuerte o rocas resbaladizas.",
        "specs": {
          "distance": "Unos 720 m ida y vuelta (municipio)",
          "duration": "Hasta 1 hora (Parque Estatal)",
          "elevation": "+30 m",
          "access": "Inicio oficial: final de Alameda dos Guapuruvus, Feiticeira; monitor obligatorio y reserva en línea (Parque Estatal)",
          "sea": "No corresponde (tres cascadas y duchas naturales)",
          "structure": "Estacionamiento cercano y pasarela inicial de madera"
        }
      },
      "he": {
        "title": "מפל שלושת השלבים (Cachoeira dos Três Tombos)",
        "subtitle": "מסלול קצר לשלושה מפלים: זהירות מסלעים חלקלקים",
        "description": "שלושה מפלים ליד חוף פייטיסיירה במסלול קצר. אפשר להתרחץ בתחילת המסלול, אך סלעים חלקלקים וזרם חזק מחייבים זהירות. במפל השלישי אין בריכה לצלילה. הפארק המדינתי מחייב מדריך ומציין הזמנה באינטרנט.",
        "highlights": [
          "מסלול קצר עם מדריך חובה",
          "רחצה רק כאשר התנאים מתאימים",
          "זהירות מסלעים חלקלקים",
          "אין בריכת צלילה במפל השלישי"
        ],
        "ecoTip": "יש להישמע למדריך ולהימנע מכניסה למים כשיש זרם חזק או סלעים חלקלקים.",
        "specs": {
          "distance": "כ־720 מטר הלוך ושוב (העירייה)",
          "duration": "עד שעה (הפארק המדינתי)",
          "elevation": "+30 מ׳",
          "access": "תחילת השביל הרשמית בסוף אלמדה דוס גואפורובוס, פייטיסיירה; מדריך חובה והזמנה מקוונת (הפארק המדינתי)",
          "sea": "לא רלוונטי (שלושה מפלים ומקלחות טבעיות)",
          "structure": "חניה סמוכה ומעבר עץ בתחילת הדרך"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-dos-tres-tombos_1.jpg"
    ]
  },
  {
    "id": "cachoeira-da-friagem",
    "category": "cachoeiras",
    "coords": [
      -23.7456,
      -45.3411
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/cachoeira-da-friagem_1.jpg",
    "tags": [
      "Vista do Canal",
      "Norte da Ilha",
      "Trilha Panorâmica",
      "Ducha"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "hard",
      "distance": "2 a 3 km (percurso do Parque Estadual)",
      "duration": "1h30 a 2h",
      "elevation": "+140m",
      "access": "Final da Alameda dos Pássaros, Siriúba; monitoria obrigatória",
      "sea": "Não se aplica (Ducha natural sobre rochas com vista do canal)",
      "structure": "Trilha monitorada em mata fechada e trechos abertos; confirmar agendamento com Parque Estadual."
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Friagem",
        "subtitle": "Trilha monitorada de 1h30 a 2h; acompanhamento obrigatório",
        "description": "A trilha monitorada da Friagem começa após o trecho urbanizado no final da Alameda dos Pássaros, na Siriúba. São 1h30 a 2h de percurso, entre mata fechada e áreas abertas com vista para o canal, até a queda de aproximadamente 25 metros. Monitoria obrigatória.",
        "highlights": [
          "Monitoria obrigatória",
          "Percurso de 1h30 a 2h",
          "Caminhada por mata e áreas abertas",
          "Vista para o Canal de São Sebastião"
        ],
        "ecoTip": "Traga água potável e use repelente.",
        "specs": {
          "distance": "2 a 3 km (percurso do Parque Estadual)",
          "duration": "1h30 a 2h",
          "elevation": "+140m",
          "access": "Final da Alameda dos Pássaros, Siriúba; monitoria obrigatória",
          "sea": "Não se aplica (Ducha natural sobre rochas com vista do canal)",
          "structure": "Trilha nativa entre bambuzais e mata atlântica"
        }
      },
      "en": {
        "title": "Friagem Waterfall (Cachoeira da Friagem)",
        "subtitle": "Monitored 1.5–2 hour trail; guide required",
        "description": "The monitored Friagem trail starts beyond the built-up area at the end of Alameda dos Pássaros in Siriúba. The route takes 1.5–2 hours through forest and open viewpoints to the approximately 25-meter waterfall. A guide is mandatory.",
        "highlights": [
          "Guide mandatory",
          "1.5–2 hour route",
          "Forest and open sections",
          "São Sebastião Channel views"
        ],
        "ecoTip": "Bring drinking water and insect repellent.",
        "specs": {
          "distance": "2–3 km (State Park route)",
          "duration": "1.5–2 hours",
          "elevation": "+140 m",
          "access": "End of Alameda dos Pássaros, Siriúba; guide mandatory",
          "sea": "Not applicable (natural shower over rocks overlooking the channel)",
          "structure": "Native trail through bamboo groves and Atlantic Forest"
        }
      },
      "fr": {
        "title": "Cascade da Friagem",
        "subtitle": "Sentier de 1 h 30 à 2 h avec guide obligatoire",
        "description": "Le sentier de Friagem commence après la zone urbanisée, au bout de l'Alameda dos Pássaros, à Siriúba. Le parcours dure de 1 h 30 à 2 h entre forêt et points de vue jusqu'à la chute d'environ 25 mètres. Accompagnement obligatoire.",
        "highlights": [
          "Guide obligatoire",
          "Parcours de 1 h 30 à 2 h",
          "Forêt et portions découvertes",
          "Vue sur le canal de São Sebastião"
        ],
        "ecoTip": "Prévoyez de l eau et un répulsif.",
        "specs": {
          "distance": "2 à 3 km (parcours du Parc d'État)",
          "duration": "1 h 30 à 2 h",
          "elevation": "+140 m",
          "access": "Bout de l'Alameda dos Pássaros, Siriúba ; guide obligatoire",
          "sea": "Sans objet (douche naturelle sur les rochers avec vue sur le canal)",
          "structure": "Sentier naturel entre bambouseraies et forêt atlantique"
        }
      },
      "es": {
        "title": "Cascada da Friagem",
        "subtitle": "Sendero de 1 h 30 a 2 h con monitor obligatorio",
        "description": "La ruta de Friagem comienza tras la zona urbanizada, al final de Alameda dos Pássaros, en Siriúba. El recorrido dura de 1 h 30 a 2 h entre bosque y miradores hasta la cascada de unos 25 metros. Monitor obligatorio.",
        "highlights": [
          "Monitor obligatorio",
          "Recorrido de 1 h 30 a 2 h",
          "Tramos de bosque y zonas abiertas",
          "Vistas del canal de São Sebastião"
        ],
        "ecoTip": "Lleva agua y repelente.",
        "specs": {
          "distance": "2 a 3 km (ruta del Parque Estatal)",
          "duration": "1 h 30 a 2 h",
          "elevation": "+140 m",
          "access": "Final de Alameda dos Pássaros, Siriúba; monitor obligatorio",
          "sea": "No corresponde (ducha natural sobre rocas con vista al canal)",
          "structure": "Sendero natural entre bambúes y Mata Atlántica"
        }
      },
      "he": {
        "title": "מפל פריאז׳ם (Cachoeira da Friagem)",
        "subtitle": "מסלול של שעה וחצי עד שעתיים עם מדריך חובה",
        "description": "שביל פריאז׳ם מתחיל אחרי האזור הבנוי בסוף אלמדה דוס פאסארוס בסיריאובה. המסלול נמשך שעה וחצי עד שעתיים דרך יער ונקודות תצפית אל מפל בגובה כ־25 מטר. ליווי מדריך חובה.",
        "highlights": [
          "ליווי מדריך חובה",
          "משך המסלול שעה וחצי עד שעתיים",
          "יער ושטחים פתוחים",
          "נוף לתעלת סאו סבסטיאו"
        ],
        "ecoTip": "קחו מים לשתייה וחומר דוחה יתושים.",
        "specs": {
          "distance": "2–3 ק״מ (לפי הפארק)",
          "duration": "שעה וחצי עד שעתיים",
          "elevation": "+140 מ׳",
          "access": "סוף אלמדה דוס פאסארוס, סיריאובה; ליווי מדריך חובה",
          "sea": "לא רלוונטי (מקלחת טבעית על סלעים עם נוף לתעלה)",
          "structure": "שביל טבעי בין חורשות במבוק והיער האטלנטי"
        }
      }
    },
    "images": [
      "assets/images/cachoeira-da-friagem_1.jpg"
    ]
  },
  {
    "id": "trilha-da-agua-branca",
    "category": "trilhas",
    "coords": [
      -23.8014,
      -45.3589
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/trilha-da-agua-branca_1.jpg",
    "tags": [
      "Cinco Poços",
      "Birdwatching",
      "Trilha Sinalizada",
      "Parque Estadual"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Cerca de 3,6 km ida e volta (Prefeitura)",
      "duration": "Aproximadamente 2h (Prefeitura)",
      "elevation": "+80m",
      "access": "Guarita do Parque Estadual na Estrada de Castelhanos; confirmar agendamento e regras",
      "sea": "Não se aplica (5 poços naturais e cachoeiras de água cristalina)",
      "structure": "Trilha sinalizada e cinco poços; acessibilidade varia conforme o trecho"
    },
    "translations": {
      "pt": {
        "title": "Trilha da Água Branca",
        "subtitle": "Cinco poços naturais em cerca de 3,6 km ida e volta",
        "description": "A Trilha da Água Branca, no Parque Estadual de Ilhabela, tem cerca de 3,6 km ida e volta e duração aproximada de 2 horas, segundo a Prefeitura. O caminho sinalizado passa por cinco poços: Pedra, Escada, Ducha, Jequitibá e Jabuti. A existência de infraestrutura não significa acessibilidade integral, nem que todos os trechos sejam seguros para banho. Confirme regras e condições de visitação com o Parque.",
        "highlights": [
          "Cinco poços naturais ao longo da trilha",
          "Cerca de 3,6 km ida e volta",
          "Aproximadamente 2 horas de caminhada",
          "Acessibilidade e segurança variam conforme o trecho"
        ],
        "ecoTip": "Verifique a correnteza e as pedras antes de entrar na água; confira agendamento e regras de monitoria com o Parque.",
        "specs": {
          "distance": "3,6 km ida e volta (Prefeitura)",
          "duration": "Cerca de 2h (Prefeitura)",
          "elevation": "+80m",
          "access": "Estrada de Castelhanos, guarita do Parque Estadual; confirme agendamento",
          "sea": "Não se aplica (5 poços naturais e cachoeiras de água cristalina)",
          "structure": "Trilha sinalizada; acessibilidade variável"
        }
      },
      "en": {
        "title": "Água Branca State Park Trail",
        "subtitle": "Five natural pools over about 3.6 km round trip",
        "description": "The Água Branca trail in Ilhabela State Park covers approximately 3.6 km round trip and takes around 2 hours, according to the municipality. It passes five natural pools: Pedra, Escada, Ducha, Jequitibá and Jabuti. Visitor facilities do not guarantee step-free access to the entire route or safe bathing everywhere. Check current park entry and booking requirements.",
        "highlights": [
          "Five natural pools along the route",
          "About 3.6 km round trip",
          "Around 2 hours of walking",
          "Access and water safety vary by section"
        ],
        "ecoTip": "Beware of wet rocks and currents; confirm access and guide rules with the Park.",
        "specs": {
          "distance": "3.6 km round trip (municipality)",
          "duration": "About 2 hours (municipality)",
          "elevation": "+80 m",
          "access": "Castelhanos Road, State Park entrance gate; check booking",
          "sea": "Not applicable (5 natural pools and clear-water waterfalls)",
          "structure": "Marked trail; accessibility varies by section"
        }
      },
      "fr": {
        "title": "Sentier d Água Branca",
        "subtitle": "Cinq bassins naturels sur environ 3,6 km aller-retour",
        "description": "Le sentier Água Branca du Parc d'État d'Ilhabela fait environ 3,6 km aller-retour et prend quelque 2 heures selon la municipalité. Il traverse cinq bassins naturels : Pedra, Escada, Ducha, Jequitibá et Jabuti. La présence d'installations ne garantit pas l'accessibilité de tout le parcours ni la sécurité de chaque bassin. Vérifiez les règles et les réservations du Parc.",
        "highlights": [
          "Cinq bassins naturels sur le parcours",
          "Environ 3,6 km aller-retour",
          "Environ 2 heures de marche",
          "Accessibilité et baignade variables"
        ],
        "ecoTip": "Attention aux rochers mouillés et au courant ; vérifiez les règles d'accès et d'accompagnement.",
        "specs": {
          "distance": "3,6 km aller-retour (municipalité)",
          "duration": "Environ 2 h (municipalité)",
          "elevation": "+80 m",
          "access": "Route de Castelhanos, entrée du Parc ; vérifier la réservation",
          "sea": "Sans objet (5 bassins naturels et cascades cristallines)",
          "structure": "Sentier balisé ; accessibilité variable"
        }
      },
      "es": {
        "title": "Sendero de Água Branca",
        "subtitle": "Cinco pozas naturales en unos 3,6 km ida y vuelta",
        "description": "La ruta de Água Branca en el Parque Estatal de Ilhabela mide aproximadamente 3,6 km ida y vuelta y dura unas 2 horas, según el municipio. Pasa por cinco pozas naturales: Pedra, Escada, Ducha, Jequitibá y Jabuti. Tener infraestructura no significa accesibilidad en todo el trayecto ni que sea seguro bañarse en cualquier punto. Consulta las reglas y reservas del Parque.",
        "highlights": [
          "Cinco pozas naturales en el recorrido",
          "Unos 3,6 km ida y vuelta",
          "Aproximadamente 2 horas a pie",
          "Accesibilidad y seguridad variables"
        ],
        "ecoTip": "Ten cuidado con rocas mojadas y corrientes; confirma las reglas de acceso y monitoría.",
        "specs": {
          "distance": "3,6 km ida y vuelta (municipio)",
          "duration": "Unas 2 horas (municipio)",
          "elevation": "+80 m",
          "access": "Carretera a Castelhanos, portería del Parque Estatal; comprobar reserva",
          "sea": "No corresponde (5 pozas naturales y cascadas de agua cristalina)",
          "structure": "Sendero señalizado; accesibilidad variable"
        }
      },
      "he": {
        "title": "שביל אגואה ברנקה (Trilha da Água Branca)",
        "subtitle": "חמש בריכות טבעיות במסלול של כ־3.6 ק״מ הלוך ושוב",
        "description": "שביל אגואה ברנקה בפארק המדינתי איליאבלה הוא באורך כ־3.6 ק״מ הלוך ושוב ונמשך כשעתיים לפי העירייה. הוא עובר בחמש בריכות טבעיות: פדרה, אסקדה, דושה, ז׳קיטיבה וז׳בוטי. קיומם של מתקנים אינו מבטיח נגישות לכל אורך השביל או רחצה בטוחה בכל מקום. בדקו את תנאי הכניסה וההזמנה בפארק.",
        "highlights": [
          "חמש בריכות טבעיות לאורך השביל",
          "כ־3.6 ק״מ הלוך ושוב",
          "כשעתיים של הליכה",
          "נגישות ובטיחות משתנות לאורך הדרך"
        ],
        "ecoTip": "היזהרו מסלעים רטובים ומזרמים; בדקו את כללי הכניסה וההדרכה בפארק.",
        "specs": {
          "distance": "3.6 ק״מ הלוך ושוב (העירייה)",
          "duration": "כשעתיים (העירייה)",
          "elevation": "+80 מ׳",
          "access": "שער הפארק בדרך קסטליאנוס; בדקו הזמנה",
          "sea": "לא רלוונטי (5 בריכות טבעיות ומפלים צלולים)",
          "structure": "שביל מסומן; הנגישות משתנה"
        }
      }
    },
    "images": [
      "assets/images/trilha-da-agua-branca_1.jpg"
    ]
  },
  {
    "id": "trilha-do-bonete",
    "category": "trilhas",
    "coords": [
      -23.8778,
      -45.3917
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/trilha-do-bonete_1.jpg",
    "tags": [
      "12km de Trilha",
      "3 Cachoeiras",
      "Mata Atlântica",
      "Caiçara"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": true,
      "is4x4": false
    },
    "specs": {
      "difficulty": "hard",
      "distance": "Cerca de 12 km só ida / 24 km ida e volta",
      "duration": "4 a 6h só ida (Prefeitura, conforme condições)",
      "elevation": "+380m acumulados",
      "access": "Guarita no final da SP-131, Sepituba; verificar agendamento online",
      "sea": "Deságua na fantástica Praia do Bonete",
      "structure": "Trilha rústica, travessias com passarelas; Bonete sem acesso rodoviário"
    },
    "translations": {
      "pt": {
        "title": "Trilha Tradicional do Bonete",
        "subtitle": "Trilha difícil: 12 km só ida, cerca de 24 km ida e volta",
        "description": "A Trilha do Bonete parte da guarita no final da SP-131, em Sepituba, e atravessa a Mata Atlântica e rios até a comunidade do Bonete. São aproximadamente 12 km só de ida ou 24 km ida e volta; a Prefeitura estima 4 a 6 horas para a ida, conforme as condições. O Parque Estadual classifica a trilha como difícil, informa agendamento online e monitoria opcional. Use as passarelas nas travessias. A volta de barco deve ser confirmada previamente com operador e depende do mar.",
        "highlights": [
          "Cerca de 12 km só ida e 24 km ida e volta",
          "Trilha difícil com travessias de rios",
          "Cachoeiras da Laje, Areado e Saquinho",
          "Chegada à comunidade tradicional do Bonete"
        ],
        "ecoTip": "Um guia local é recomendado mesmo quando opcional. Leve água e planeje o retorno sem presumir disponibilidade de barco.",
        "specs": {
          "distance": "12 km só ida; 24 km ida e volta",
          "duration": "4 a 6h só ida (Prefeitura, variável)",
          "elevation": "+380m acumulados",
          "access": "Final da SP-131, Sepituba; agendamento online no Parque",
          "sea": "Deságua na fantástica Praia do Bonete",
          "structure": "Passarelas nos rios; sem estrada até o Bonete"
        }
      },
      "en": {
        "title": "Bonete Classic Rainforest Trail",
        "subtitle": "Difficult hike: 12 km one way, around 24 km round trip",
        "description": "The Bonete trail begins at the State Park gate at the end of SP-131 in Sepituba, crossing Atlantic Forest and streams to the Bonete community. Allow around 12 km one way or 24 km round trip. The municipality estimates 4–6 hours for the outward walk, depending on conditions. The State Park rates the route difficult, lists online booking and says guiding is optional. Use footbridges across streams. Any return boat must be arranged in advance and depends on sea conditions.",
        "highlights": [
          "Around 12 km each way, 24 km round trip",
          "Difficult trail and river crossings",
          "Laje, Areado and Saquinho waterfalls",
          "Traditional Bonete community"
        ],
        "ecoTip": "A local guide is recommended even where optional. Carry water and plan the return without assuming a boat will be available.",
        "specs": {
          "distance": "12 km one way; 24 km round trip",
          "duration": "4–6 hours one way (municipality)",
          "elevation": "+380 m cumulative ascent",
          "access": "State Park gate at end of SP-131 in Sepituba; online booking",
          "sea": "Ends at spectacular Praia do Bonete",
          "structure": "Footbridges at streams; no road access to Bonete"
        }
      },
      "fr": {
        "title": "Sentier Traditionnel do Bonete",
        "subtitle": "Randonnée difficile : 12 km à l'aller, 24 km aller-retour",
        "description": "Le sentier du Bonete part de la guérite du Parc au bout de la SP-131 à Sepituba, et traverse la forêt et des rivières jusqu'à la communauté du Bonete. Le trajet fait environ 12 km à l'aller ou 24 km aller-retour. La municipalité estime 4 à 6 heures pour l'aller selon les conditions. Le Parc classe la randonnée comme difficile, indique une réservation en ligne et un guide facultatif. Utilisez les passerelles pour les rivières. Tout retour en bateau doit être confirmé à l'avance et dépend de la mer.",
        "highlights": [
          "Environ 12 km par sens, 24 km aller-retour",
          "Sentier difficile et passages de rivières",
          "Cascades Laje, Areado et Saquinho",
          "Communauté traditionnelle du Bonete"
        ],
        "ecoTip": "Un guide local reste conseillé même s'il est facultatif. Prévoyez eau et retour sans compter sur un bateau non confirmé.",
        "specs": {
          "distance": "12 km à l'aller ; 24 km aller-retour",
          "duration": "4 à 6 h pour l'aller (municipalité)",
          "elevation": "+380 m de dénivelé cumulé",
          "access": "Guérite au bout de la SP-131, Sepituba ; réservation en ligne",
          "sea": "Débouche sur la superbe Praia do Bonete",
          "structure": "Passerelles sur les rivières ; pas de route jusqu'au Bonete"
        }
      },
      "es": {
        "title": "Sendero Tradicional do Bonete",
        "subtitle": "Ruta difícil: 12 km por trayecto, unos 24 km ida y vuelta",
        "description": "La ruta al Bonete comienza en la portería del Parque Estatal al final de la SP-131, en Sepituba, y cruza bosques y ríos hasta la comunidad del Bonete. Son unos 12 km solo ida o 24 km ida y vuelta. El municipio estima 4–6 horas para la ida según las condiciones. El Parque clasifica la ruta como difícil, indica reserva en línea y monitoría opcional. Usa las pasarelas al cruzar los ríos. El regreso en barco debe acordarse previamente y depende del mar.",
        "highlights": [
          "12 km por trayecto y 24 km ida y vuelta",
          "Ruta difícil con cruces de ríos",
          "Cascadas Laje, Areado y Saquinho",
          "Comunidad tradicional del Bonete"
        ],
        "ecoTip": "Se recomienda guía local aunque sea opcional. Lleva agua y planea el regreso sin contar con un barco sin confirmar.",
        "specs": {
          "distance": "12 km solo ida; 24 km ida y vuelta",
          "duration": "4–6 horas solo ida (municipio)",
          "elevation": "+380 m de ascenso acumulado",
          "access": "Portería del Parque al final de SP-131, Sepituba; reserva en línea",
          "sea": "Desemboca en la fantástica Praia do Bonete",
          "structure": "Pasarelas sobre ríos; sin carretera al Bonete"
        }
      },
      "he": {
        "title": "טרק בונטה הקלאסי (Trilha do Bonete)",
        "subtitle": "מסלול קשה: כ־12 ק״מ לכל כיוון, כ־24 ק״מ הלוך ושוב",
        "description": "שביל בונטה מתחיל בשער הפארק בקצה כביש SP-131 בספיטובה ועובר ביער האטלנטי ובנחלים עד לקהילת בונטה. אורכו כ־12 ק״מ לכיוון אחד או 24 ק״מ הלוך ושוב. לפי העירייה ההליכה לכיוון אחד נמשכת 4–6 שעות בהתאם לתנאים. הפארק מסווג את המסלול כקשה, מציין הזמנה מקוונת ומדריך כאפשרות שאינה חובה. חצו נחלים על הגשרים. יש לתאם מראש כל חזרה בסירה ולבדוק את מצב הים.",
        "highlights": [
          "כ־12 ק״מ לכל כיוון, 24 ק״מ הלוך ושוב",
          "שביל קשה עם חציית נחלים",
          "מפלי לאז׳ה, אראדו וסאקיניו",
          "הקהילה המסורתית של בונטה"
        ],
        "ecoTip": "מומלץ מדריך מקומי גם אם אינו חובה. קחו מים ותכננו חזרה בלי להסתמך על סירה שלא תואמה.",
        "specs": {
          "distance": "12 ק״מ לכיוון; 24 ק״מ הלוך ושוב",
          "duration": "4–6 שעות לכיוון אחד (העירייה)",
          "elevation": "+380 מ׳ עלייה מצטברת",
          "access": "שער הפארק בקצה SP-131 בספיטובה; הזמנה מקוונת",
          "sea": "מסתיים ב-Praia do Bonete המרהיב",
          "structure": "גשרים בנחלים; אין כביש לבונטה"
        }
      }
    },
    "images": [
      "assets/images/trilha-do-bonete_1.jpg"
    ]
  },
  {
    "id": "trilha-da-cabecuda-farol",
    "category": "trilhas",
    "coords": [
      -23.8370139,
      -45.2268194
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/trilha-da-cabecuda-farol_1.jpg",
    "tags": [
      "Ponta da Cabeçuda",
      "Costa Oceânica",
      "Baía de Castelhanos",
      "Referência Geográfica"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "unknown",
      "distance": "Acesso público não confirmado",
      "duration": "Não estimada",
      "elevation": "Não confirmada",
      "access": "O guia ainda não possui um acesso terrestre público validado para este ponto",
      "sea": "Costa oceânica exposta na extremidade norte da Baía de Castelhanos",
      "structure": "Sem estrutura turística confirmada"
    },
    "translations": {
      "pt": {
        "title": "Ponta da Cabeçuda",
        "subtitle": "Referência geográfica na costa oceânica da Baía de Castelhanos",
        "description": "A Ponta da Cabeçuda marca o limite norte da área costeira da Baía de Castelhanos. A coordenada foi corrigida com base em referência oficial da Prefeitura. Não há, neste guia, trilha pública, farol ou acesso terrestre validados para visitação.",
        "highlights": [
          "Ponto costeiro oficial da Baía de Castelhanos",
          "Costa oceânica preservada",
          "Referência geográfica da face leste de Ilhabela",
          "Acesso turístico ainda não validado"
        ],
        "ecoTip": "Não tente acessar por trilhas não oficiais ou sem orientação local.",
        "specs": {
          "distance": "Acesso público não confirmado",
          "duration": "Não estimada",
          "elevation": "Não confirmada",
          "access": "Sem acesso terrestre público validado no guia",
          "sea": "Costa oceânica exposta",
          "structure": "Sem estrutura turística confirmada"
        }
      },
      "en": {
        "title": "Ponta da Cabeçuda",
        "subtitle": "Geographic landmark on the ocean-facing coast of Castelhanos Bay",
        "description": "Ponta da Cabeçuda marks the northern limit of the coastal area of Castelhanos Bay. Its coordinate was corrected from an official municipal reference. This guide does not currently have a validated public trail, lighthouse or overland visitor access for this point.",
        "highlights": [
          "Official coastal reference in Castelhanos Bay",
          "Preserved ocean-facing coastline",
          "Geographic landmark on Ilhabela's east coast",
          "Visitor access not yet validated"
        ],
        "ecoTip": "Do not attempt unverified trails or access routes without local guidance.",
        "specs": {
          "distance": "Public access not confirmed",
          "duration": "Not estimated",
          "elevation": "Not confirmed",
          "access": "No validated public overland access in the guide",
          "sea": "Exposed ocean-facing coast",
          "structure": "No confirmed visitor infrastructure"
        }
      },
      "fr": {
        "title": "Ponta da Cabeçuda",
        "subtitle": "Repère géographique sur la côte océanique de la baie de Castelhanos",
        "description": "La Ponta da Cabeçuda marque la limite nord de la zone côtière de la baie de Castelhanos. Sa coordonnée a été corrigée à partir d'une référence officielle municipale. Le guide ne dispose pas encore d'un sentier public, d'un phare ou d'un accès terrestre validé pour la visite.",
        "highlights": [
          "Repère côtier officiel de la baie de Castelhanos",
          "Côte océanique préservée",
          "Repère géographique de la côte est d'Ilhabela",
          "Accès touristique non encore validé"
        ],
        "ecoTip": "N'empruntez pas de sentiers ou d'accès non vérifiés sans accompagnement local.",
        "specs": {
          "distance": "Accès public non confirmé",
          "duration": "Non estimée",
          "elevation": "Non confirmée",
          "access": "Aucun accès terrestre public validé dans le guide",
          "sea": "Côte océanique exposée",
          "structure": "Aucune infrastructure touristique confirmée"
        }
      },
      "es": {
        "title": "Ponta da Cabeçuda",
        "subtitle": "Referencia geográfica en la costa oceánica de la Bahía de Castelhanos",
        "description": "Ponta da Cabeçuda marca el límite norte del área costera de la Bahía de Castelhanos. Su coordenada fue corregida a partir de una referencia oficial municipal. El guía no dispone todavía de un sendero público, faro o acceso terrestre validado para visitas.",
        "highlights": [
          "Referencia costera oficial de la Bahía de Castelhanos",
          "Costa oceánica preservada",
          "Referencia geográfica de la costa este de Ilhabela",
          "Acceso turístico aún no validado"
        ],
        "ecoTip": "No intentes rutas o senderos no verificados sin orientación local.",
        "specs": {
          "distance": "Acceso público no confirmado",
          "duration": "No estimada",
          "elevation": "No confirmada",
          "access": "Sin acceso terrestre público validado en el guía",
          "sea": "Costa oceánica expuesta",
          "structure": "Sin infraestructura turística confirmada"
        }
      },
      "he": {
        "title": "Ponta da Cabeçuda",
        "subtitle": "נקודת ציון גאוגרפית בחוף האוקייני של מפרץ קסטליאנוס",
        "description": "Ponta da Cabeçuda מסמנת את הגבול הצפוני של אזור החוף במפרץ קסטליאנוס. הקואורדינטה תוקנה לפי מקור עירוני רשמי. במדריך עדיין אין שביל ציבורי, מגדלור או גישה יבשתית מאומתים לביקור בנקודה זו.",
        "highlights": [
          "נקודת חוף רשמית במפרץ קסטליאנוס",
          "חוף אוקייני שמור",
          "נקודת ציון בחוף המזרחי של איליאבלה",
          "גישה תיירותית טרם אומתה"
        ],
        "ecoTip": "אל תנסו שבילים או דרכי גישה שלא אומתו ללא ליווי מקומי.",
        "specs": {
          "distance": "גישה ציבורית לא אושרה",
          "duration": "לא הוערך",
          "elevation": "לא אושרה",
          "access": "אין במדריך גישה יבשתית ציבורית מאומתת",
          "sea": "חוף אוקייני חשוף",
          "structure": "אין תשתית תיירותית מאומתת"
        }
      }
    },
    "images": [
      "assets/images/trilha-da-cabecuda-farol_1.jpg"
    ]
  },
  {
    "id": "pico-de-sao-sebastiao",
    "category": "picos",
    "coords": [
      -23.8755592,
      -45.3787239
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/pico-de-sao-sebastiao_1.jpg",
    "tags": [
      "Referência geográfica",
      "Cume elevado",
      "Área protegida",
      "Rota não validada"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "unknown",
      "distance": "Não validada para visitação",
      "duration": "Não estimada sem rota confirmada",
      "elevation": "+1.378 m de altitude (referência geográfica)",
      "access": "Acesso público e monitoria não confirmados; consulte o Parque Estadual",
      "sea": "Não se aplica (Cume supremo acima das nuvens)",
      "structure": "Sem infraestrutura turística confirmada no percurso"
    },
    "translations": {
      "pt": {
        "title": "Pico de São Sebastião",
        "subtitle": "Cume de 1.378 m; trilha e condições de visitação não confirmadas",
        "description": "O Pico de São Sebastião é uma referência geográfica de montanha na área protegida de Ilhabela. Este guia não confirmou, junto ao Parque Estadual, uma trilha pública autorizada de subida, nem extensão, duração ou exigências de monitoria específicas. Não utilize a posição no mapa como entrada da trilha ou autorização de acesso. Antes de planejar qualquer expedição, consulte a gestão do Parque Estadual de Ilhabela.",
        "highlights": [
          "Referência de alta montanha do arquipélago",
          "Trilha pública e itinerário ainda não validados",
          "Distância e duração não confirmadas",
          "Consultar o Parque antes de qualquer tentativa"
        ],
        "ecoTip": "Área protegida e terreno remoto: não entre por rotas informais nem planeje visita ao pôr do sol. Confirme visitação e condições com o Parque.",
        "specs": {
          "distance": "Não validada para visitação",
          "duration": "Não estimada sem rota confirmada",
          "elevation": "+1.378 m de altitude (referência geográfica)",
          "access": "Acesso público e monitoria não confirmados; consulte o Parque Estadual",
          "sea": "Não se aplica (Cume supremo acima das nuvens)",
          "structure": "Sem infraestrutura turística confirmada no percurso"
        }
      },
      "en": {
        "title": "São Sebastião Peak (Pico de São Sebastião)",
        "subtitle": "1,378 m summit; public trail and visitor access unverified",
        "description": "São Sebastião Peak is a mountain landmark within Ilhabela's protected landscape. This guide has not verified an authorized public summit trail, its length or time, or specific guiding requirements with the State Park. Do not use the map pin as a trail entrance or a permit to visit. Check directly with Ilhabela State Park management before planning an expedition.",
        "highlights": [
          "Protected high-mountain landmark",
          "Public summit route not verified",
          "Walking time and distance unconfirmed",
          "Check with State Park management first"
        ],
        "ecoTip": "This is remote protected terrain. Do not attempt informal routes or plan a sunset ascent; check access and conditions with the Park.",
        "specs": {
          "distance": "Visitor route not verified",
          "duration": "Unknown without confirmed trail",
          "elevation": "+1,378 m elevation (geographic reference)",
          "access": "Public trail access and guiding rules unverified; check with State Park",
          "sea": "Not applicable (highest summit above the clouds)",
          "structure": "No confirmed visitor facilities on the route"
        }
      },
      "fr": {
        "title": "Pic de São Sebastião",
        "subtitle": "Sommet de 1 378 m ; sentier et accès public non vérifiés",
        "description": "Le Pico de São Sebastião est un sommet de référence dans l'espace protégé d'Ilhabela. Ce guide n'a pas confirmé auprès du Parc d'État l'existence d'un itinéraire public autorisé jusqu'au sommet, ni sa longueur, sa durée ou les règles précises d'accompagnement. Ne considérez pas le point sur la carte comme un départ de sentier ou une autorisation de visite. Renseignez-vous auprès de la gestion du Parc avant toute expédition.",
        "highlights": [
          "Sommet remarquable en zone protégée",
          "Itinéraire public non validé",
          "Durée et distance non confirmées",
          "Vérifier auprès du Parc avant le départ"
        ],
        "ecoTip": "Ne suivez pas de chemins improvisés et ne prévoyez pas de randonnée au coucher du soleil. Contactez le Parc.",
        "specs": {
          "distance": "Itinéraire public non vérifié",
          "duration": "Indéterminée sans sentier confirmé",
          "elevation": "+1 378 m d'altitude (référence géographique)",
          "access": "Accès public et accompagnement non confirmés ; contacter le Parc d'État",
          "sea": "Sans objet (sommet le plus élevé au-dessus des nuages)",
          "structure": "Aucun équipement touristique confirmé sur le parcours"
        }
      },
      "es": {
        "title": "Pico de São Sebastião",
        "subtitle": "Cumbre de 1.378 m; acceso y sendero público sin confirmar",
        "description": "El Pico de São Sebastião es una referencia geográfica de alta montaña en un área protegida de Ilhabela. Esta guía no ha confirmado con el Parque Estatal una ruta pública autorizada a la cumbre, ni su distancia, duración o requisitos específicos de monitoría. No utilices la coordenada del mapa como entrada al sendero ni como permiso de acceso. Consulta directamente con la administración del Parque antes de planear una expedición.",
        "highlights": [
          "Referencia de alta montaña protegida",
          "Ruta pública a la cumbre sin validar",
          "Duración y distancia no confirmadas",
          "Consultar al Parque antes de visitar"
        ],
        "ecoTip": "No accedas por rutas informales ni planees una visita al atardecer. Verifica el acceso con el Parque Estatal.",
        "specs": {
          "distance": "Ruta pública no validada",
          "duration": "Sin estimación sin ruta confirmada",
          "elevation": "+1.378 m de altitud (referencia geográfica)",
          "access": "Acceso y requisitos de monitoría sin confirmar; consultar al Parque Estatal",
          "sea": "No corresponde (cumbre más alta sobre las nubes)",
          "structure": "Sin instalaciones turísticas confirmadas en la ruta"
        }
      },
      "he": {
        "title": "פסגת סאו סבסטיאו (Pico de São Sebastião)",
        "subtitle": "פסגה בגובה 1,378 מטר; מסלול וגישה לציבור טרם אומתו",
        "description": "פסגת סאו סבסטיאו היא נקודת ציון הררית בשטח מוגן באיליאבלה. המדריך עדיין לא אימת מול הנהלת הפארק המדינתי שביל ציבורי מורשה לפסגה, את אורכו, את משך ההליכה או את דרישות ההדרכה הספציפיות. אין לראות בנקודה על המפה כניסה לשביל או אישור לביקור. יש לברר ישירות מול הנהלת הפארק לפני תכנון כל מסע.",
        "highlights": [
          "נקודת ציון הררית בשטח מוגן",
          "אין מסלול ציבורי מאומת לפסגה",
          "המרחק והמשך לא אושרו",
          "יש לבדוק עם הפארק לפני ביקור"
        ],
        "ecoTip": "אין להשתמש בדרכים לא רשמיות או לתכנן עלייה בשקיעה. בדקו את תנאי הביקור מול הנהלת הפארק.",
        "specs": {
          "distance": "מסלול ציבורי טרם אומת",
          "duration": "לא ידוע ללא מסלול מאומת",
          "elevation": "+1,378 מטר גובה (נקודת ציון גאוגרפית)",
          "access": "גישה ודרישות הדרכה לא אומתו; יש לפנות לפארק",
          "sea": "לא רלוונטי (הפסגה הגבוהה מעל העננים)",
          "structure": "לא אושרו מתקני תיירות לאורך המסלול"
        }
      }
    },
    "images": [
      "assets/images/pico-de-sao-sebastiao_1.jpg"
    ]
  },
  {
    "id": "mirante-do-coracao",
    "category": "picos",
    "coords": [
      -23.86293,
      -45.28732
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/mirante-do-coracao_1.jpg",
    "tags": [
      "Formato de Coração",
      "Mirante Panorâmico",
      "Castelhanos",
      "Fotografia"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": true
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Caminho curto com escadaria a partir da praia",
      "duration": "Tempo variável conforme condições",
      "elevation": "Altitude não confirmada",
      "access": "Chegue a Castelhanos por 4x4 autorizado, passeio contratado ou barco; na praia siga ao canto direito olhando o mar",
      "sea": "Vista espetacular da baía oceânica",
      "structure": "Escadaria suspensa e deck com piso metálico e grades vazadas"
    },
    "translations": {
      "pt": {
        "title": "Mirante do Coração de Castelhanos",
        "subtitle": "Vista do coração de Castelhanos, com escadaria e deck reformados",
        "description": "O Mirante do Coração fica no canto direito da Praia de Castelhanos para quem olha o mar. Depois de chegar à praia por transporte autorizado ou barco, siga a trilha curta e a escadaria de subida. A Prefeitura informou que o mirante foi reformado em 2024, com degraus suspensos e deck de piso metálico e grades vazadas. O acesso tem escadas e inclinação, portanto não deve ser apresentado como percurso inteiramente acessível.",
        "highlights": [
          "Vista da baía em formato de coração",
          "Acesso pelo canto direito da praia",
          "Escadaria reformada e deck metálico",
          "Planeje previamente a chegada a Castelhanos"
        ],
        "ecoTip": "Permaneça na escadaria e no deck; evite beiradas e degraus molhados. Confirme condições de acesso a Castelhanos.",
        "specs": {
          "distance": "Caminho curto com escadaria a partir da praia",
          "duration": "Tempo variável conforme condições",
          "elevation": "Altitude não confirmada",
          "access": "Chegue a Castelhanos por 4x4 autorizado, passeio contratado ou barco; na praia siga ao canto direito olhando o mar",
          "sea": "Vista espetacular da baía oceânica",
          "structure": "Escadaria suspensa e deck com piso metálico e grades vazadas"
        }
      },
      "en": {
        "title": "Heart Overlook (Mirante do Coração)",
        "subtitle": "Heart-shaped bay view with renovated stairs and metal deck",
        "description": "The Heart Lookout is at the right-hand end of Castelhanos Beach when facing the ocean. After reaching the beach with authorized transport or by boat, follow the short trail and staircase uphill. The municipality reported renovations in 2024, including suspended steps and a metal-floor lookout deck with open grilles. The climb involves steps and a slope, so do not assume step-free accessibility.",
        "highlights": [
          "Famous heart-shaped bay view",
          "Approach from the right-hand end of the beach",
          "Renovated staircase and metal lookout deck",
          "Arrange transport to Castelhanos first"
        ],
        "ecoTip": "Stay on the staircase and designated deck. Avoid wet steps and exposed edges, and check Castelhanos access conditions.",
        "specs": {
          "distance": "Short uphill path with stairs from the beach",
          "duration": "Varies with conditions",
          "elevation": "Elevation not verified",
          "access": "Reach Castelhanos by authorized 4x4, organized tour or boat; follow the beach to the right when facing the sea",
          "sea": "Spectacular view of the ocean bay",
          "structure": "Suspended steps and lookout deck with metal flooring and open grilles"
        }
      },
      "fr": {
        "title": "Belvédère du Cœur de Castelhanos",
        "subtitle": "Vue sur la baie en cœur, escalier et plateforme rénovés",
        "description": "Le belvédère du Cœur se trouve à l'extrémité droite de la plage de Castelhanos en regardant la mer. Après avoir rejoint la plage en transport autorisé ou en bateau, suivez le court sentier puis les escaliers en montée. La municipalité a annoncé en 2024 la rénovation des marches suspendues et d'une plateforme à sol métallique et grilles ajourées. L'accès comprend des marches et une pente ; il ne doit pas être considéré comme entièrement accessible.",
        "highlights": [
          "Vue célèbre sur la baie en forme de cœur",
          "Accès depuis le côté droit de la plage",
          "Escaliers et plateforme métallique rénovés",
          "Organiser d'abord le trajet vers Castelhanos"
        ],
        "ecoTip": "Restez sur les escaliers et la plateforme ; évitez les marches mouillées et les bords exposés.",
        "specs": {
          "distance": "Court sentier et escaliers depuis la plage",
          "duration": "Variable selon les conditions",
          "elevation": "Altitude non confirmée",
          "access": "Rejoignez Castelhanos en 4x4 autorisé, excursion ou bateau ; depuis la plage, prenez à droite face à la mer",
          "sea": "Vue spectaculaire sur la baie océanique",
          "structure": "Marches suspendues et plateforme à sol métallique ajouré"
        }
      },
      "es": {
        "title": "Mirador del Corazón de Castelhanos",
        "subtitle": "Vista de la bahía en forma de corazón con escaleras renovadas",
        "description": "El Mirante do Coração está en el extremo derecho de la Playa de Castelhanos al mirar hacia el mar. Tras llegar a la playa en transporte autorizado o barco, sigue el sendero corto y las escaleras de subida. El municipio informó de una reforma en 2024 con peldaños suspendidos y una plataforma de piso metálico y rejillas abiertas. Hay escalones y pendiente, por lo que no debe asumirse accesibilidad sin barreras.",
        "highlights": [
          "Bahía con forma de corazón",
          "Acceso por el extremo derecho de la playa",
          "Escaleras y plataforma metálica renovadas",
          "Organiza primero la llegada a Castelhanos"
        ],
        "ecoTip": "Permanece en la escalera y en la plataforma; evita peldaños mojados y bordes expuestos.",
        "specs": {
          "distance": "Sendero corto y escaleras desde la playa",
          "duration": "Variable según las condiciones",
          "elevation": "Altitud no confirmada",
          "access": "Llega a Castelhanos en 4x4 autorizado, tour o barco; en la playa, ve a la derecha mirando al mar",
          "sea": "Vista espectacular de la bahía oceánica",
          "structure": "Escaleras suspendidas y plataforma de piso metálico y rejillas"
        }
      },
      "he": {
        "title": "תצפית הלב של קסטליאנוס (Mirante do Coração)",
        "subtitle": "תצפית על המפרץ בצורת לב עם מדרגות ומשטח מחודשים",
        "description": "תצפית הלב נמצאת בקצה הימני של חוף קסטליאנוס כשפונים אל הים. לאחר שמגיעים לחוף ברכב מורשה או בסירה, הולכים בשביל קצר ועולים במדרגות לנקודת התצפית. לפי העירייה, המקום שופץ בשנת 2024 ונוספו מדרגות תלויות ומשטח תצפית עם רצפת מתכת וסורגים פתוחים. הגישה כוללת שיפוע ומדרגות, ולכן אין להניח שהיא נגישה ללא מכשולים.",
        "highlights": [
          "מראה המפרץ המפורסם בצורת לב",
          "כניסה מהקצה הימני של החוף",
          "מדרגות ומשטח מתכת מחודשים",
          "יש לתאם מראש הגעה לקסטליאנוס"
        ],
        "ecoTip": "הישארו במדרגות ובמשטח התצפית והיזהרו ממדרגות רטובות ומשפת המדרון.",
        "specs": {
          "distance": "שביל קצר ומדרגות בעלייה מהחוף",
          "duration": "המשך משתנה לפי התנאים",
          "elevation": "הגובה לא אומת",
          "access": "מגיעים לקסטליאנוס ברכב שטח מורשה, בסיור או בסירה; בחוף פונים ימינה כשמביטים לים",
          "sea": "נוף מרהיב של המפרץ האוקייני",
          "structure": "מדרגות תלויות ומשטח תצפית עם רצפת מתכת וסורגים פתוחים"
        }
      }
    },
    "images": [
      "assets/images/mirante-do-coracao_1.jpg"
    ]
  },
  {
    "id": "pico-do-baepi",
    "category": "picos",
    "coords": [
      -23.7936,
      -45.3358
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/pico-do-baepi_1.jpg",
    "tags": [
      "Monitoria Obrigatória",
      "Pico 1.048m",
      "Trilha Difícil",
      "Mata Atlântica"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "hard",
      "distance": "7 a 8 km (Parque Estadual)",
      "duration": "5h30 a 6h (Parque Estadual)",
      "elevation": "+1.048m de altitude",
      "access": "Final da Rua Morro da Cruz, Itaguaçu; monitoria obrigatória e agendamento online",
      "sea": "Não se aplica (Cume com vista 360° do canal, oceano e Serra do Mar)",
      "structure": "Trilha íngreme; não presumir instalações ao longo do percurso"
    },
    "translations": {
      "pt": {
        "title": "Pico do Baepi",
        "subtitle": "Trilha difícil de 5h30 a 6h com monitoria obrigatória",
        "description": "A Trilha do Pico do Baepi começa no final da Rua Morro da Cruz, em Itaguaçu, e sobe pela Mata Atlântica até o cume de 1.048 metros. O Parque Estadual informa percurso de 7 a 8 km, duração de 5h30 a 6h, dificuldade alta, monitoria obrigatória e agendamento online. O mirante a cerca de 400 metros do início é um passeio distinto da subida completa. Respeite os horários da trilha e não planeje retornar após escurecer.",
        "highlights": [
          "Monitoria obrigatória e agendamento online",
          "7 a 8 km e cerca de 5h30 a 6h",
          "Mirante inicial a cerca de 400 metros",
          "Pico de 1.048 m com vista panorâmica"
        ],
        "ecoTip": "Agende um monitor e leve água, calçado aderente e agasalho. Não planeje subir para ver o pôr do sol.",
        "specs": {
          "distance": "7 a 8 km (Parque Estadual)",
          "duration": "5h30 a 6h (Parque Estadual)",
          "elevation": "+1.048m de altitude",
          "access": "Final da Rua Morro da Cruz, Itaguaçu; monitoria obrigatória",
          "sea": "Não se aplica (Cume com vista 360° do canal, oceano e Serra do Mar)",
          "structure": "Trilha íngreme sem estrutura garantida no cume"
        }
      },
      "en": {
        "title": "Baepi Peak",
        "subtitle": "Difficult 5.5–6 hour hike with mandatory guiding",
        "description": "The Baepi Peak trail starts at the end of Rua Morro da Cruz in Itaguaçu and climbs through Atlantic Forest to the 1,048-meter summit. The State Park lists 7–8 km, a 5.5–6 hour hike, difficult terrain, mandatory guiding and online booking. A lookout about 400 meters from the entrance is separate from reaching the summit. Follow official trail hours and do not plan to descend after dark.",
        "highlights": [
          "Mandatory guide and online booking",
          "7–8 km and approximately 5.5–6 hours",
          "Early lookout around 400 meters from start",
          "Panoramic 1,048-meter summit"
        ],
        "ecoTip": "Book an authorized guide and carry water, suitable shoes and warm clothing. Do not plan a sunset ascent.",
        "specs": {
          "distance": "7–8 km (State Park)",
          "duration": "5.5–6 hours (State Park)",
          "elevation": "+1,048 m altitude",
          "access": "End of Rua Morro da Cruz, Itaguaçu; guide required",
          "sea": "Not applicable (summit with 360° views of the channel, ocean and Serra do Mar)",
          "structure": "Steep forest hike; summit facilities not guaranteed"
        }
      },
      "fr": {
        "title": "Pic du Baepi",
        "subtitle": "Ascension difficile de 5 h 30 à 6 h avec guide obligatoire",
        "description": "Le sentier du Pico do Baepi part du bout de la Rua Morro da Cruz à Itaguaçu et grimpe dans la forêt jusqu'au sommet de 1 048 mètres. Le Parc d'État indique 7 à 8 km, une durée de 5 h 30 à 6 h, une difficulté élevée, un guide obligatoire et une réservation en ligne. Un belvédère situé à environ 400 mètres du départ ne correspond pas à l'ascension complète. Respectez les horaires et ne prévoyez pas de descendre de nuit.",
        "highlights": [
          "Guide obligatoire et réservation en ligne",
          "7 à 8 km pour 5 h 30 à 6 h",
          "Belvédère à environ 400 mètres du départ",
          "Sommet panoramique de 1 048 mètres"
        ],
        "ecoTip": "Réservez avec un guide habilité, apportez eau, chaussures adaptées et vêtements chauds. Ne partez pas pour voir le coucher du soleil.",
        "specs": {
          "distance": "7 à 8 km (Parc d'État)",
          "duration": "5 h 30 à 6 h (Parc d'État)",
          "elevation": "+1 048 m d’altitude",
          "access": "Bout de la Rua Morro da Cruz, Itaguaçu ; guide obligatoire",
          "sea": "Sans objet (sommet avec vue à 360° sur le canal, l’océan et Serra do Mar)",
          "structure": "Sentier escarpé sans services garantis au sommet"
        }
      },
      "es": {
        "title": "Pico do Baepi",
        "subtitle": "Ruta difícil de 5,5 a 6 horas con monitor obligatorio",
        "description": "La ruta al Pico do Baepi empieza al final de Rua Morro da Cruz, en Itaguaçu, y sube por la Mata Atlántica hasta la cumbre de 1.048 metros. El Parque Estatal informa 7–8 km, duración de 5,5–6 horas, dificultad alta, monitor obligatorio y reserva en línea. Hay un mirador a unos 400 metros del inicio, pero no equivale a llegar a la cumbre. Respeta los horarios y no planees bajar de noche.",
        "highlights": [
          "Monitor obligatorio y reserva en línea",
          "7–8 km y 5,5–6 horas",
          "Mirador inicial a unos 400 metros",
          "Cumbre panorámica de 1.048 metros"
        ],
        "ecoTip": "Reserva un monitor autorizado y lleva agua, calzado adecuado y abrigo. No programes la subida al atardecer.",
        "specs": {
          "distance": "7–8 km (Parque Estatal)",
          "duration": "5,5–6 horas (Parque Estatal)",
          "elevation": "+1.048 m de altitud",
          "access": "Final de Rua Morro da Cruz, Itaguaçu; monitor obligatorio",
          "sea": "No corresponde (cumbre con vista de 360° al canal, océano y Serra do Mar)",
          "structure": "Sendero empinado sin servicios garantizados en la cima"
        }
      },
      "he": {
        "title": "פסגת באפי (Pico do Baepi)",
        "subtitle": "מסלול קשה של 5.5–6 שעות עם מדריך חובה",
        "description": "שביל פסגת באפי מתחיל בסוף רחוב מורו דה קרוז באיטגואסו ומטפס ביער עד לפסגה בגובה 1,048 מטר. לפי הפארק המדינתי אורך המסלול 7–8 ק״מ, משכו 5.5–6 שעות, דרגת הקושי גבוהה, ונדרשים מדריך והזמנה מקוונת. נקודת תצפית במרחק כ־400 מטר מהכניסה אינה זהה לעלייה המלאה לפסגה. יש לכבד את שעות השביל ולא לתכנן ירידה בחשכה.",
        "highlights": [
          "מדריך חובה והזמנה מקוונת",
          "7–8 ק״מ, 5.5–6 שעות",
          "נקודת תצפית כ־400 מטר מהכניסה",
          "פסגה בגובה 1,048 מטר עם נוף פנורמי"
        ],
        "ecoTip": "הזמינו מדריך מוסמך והביאו מים, נעליים מתאימות וביגוד חם. אל תתכננו טיפוס לקראת השקיעה.",
        "specs": {
          "distance": "7–8 ק״מ (הפארק המדינתי)",
          "duration": "5.5–6 שעות (הפארק המדינתי)",
          "elevation": "גובה +1,048 מ׳",
          "access": "סוף רחוב מורו דה קרוז באיטגואסו; מדריך חובה",
          "sea": "לא רלוונטי (פסגה עם נוף של 360° לתעלה, לאוקיינוס ול-Serra do Mar)",
          "structure": "שביל תלול ללא שירותים מובטחים בפסגה"
        }
      }
    },
    "images": [
      "assets/images/pico-do-baepi_1.jpg"
    ]
  },
  {
    "id": "ponto-baleias-sul-sepituba",
    "category": "baleias",
    "coords": [
      -23.8889,
      -45.4389
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/ponto-baleias-sul-sepituba_1.jpg",
    "tags": [
      "Baleias Jubarte",
      "Junho a Agosto",
      "Golfinhos",
      "Ponta da Sepituba"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Acesso costeiro ou passeios embarcados",
      "duration": "Passeios de barco: 3h a 4h",
      "elevation": "Costeira",
      "access": "Pela estrada sul até Sepituba ou passeios de lancha autorizados pelo Projeto Viva Baleias",
      "sea": "Mar aberto com rica passagem de correntes marinhas e krill",
      "structure": "Embarcações credenciadas com biólogos e sonares para escuta de cantos"
    },
    "translations": {
      "pt": {
        "title": "Santuário de Baleias - Ponta da Sepituba",
        "subtitle": "Rota nobre de migração de Baleias Jubarte e Francas",
        "description": "Durante o inverno (junho a agosto), as águas do sul de Ilhabela se transformam na rota de migração das majestosas baleias Jubarte e Franca rumo a Abrolhos. Golfinhos e tartarugas são avistados o ano inteiro.",
        "highlights": [
          "Saltos e acrobacias de baleias Jubarte",
          "Golfinhos nariz-de-garrafa e toninhas",
          "Escuta de cantos de baleia com hidrofones",
          "Passeios guiados por biólogos"
        ],
        "ecoTip": "Mantenha distância regulamentada de navegação (mínimo 100m) e nunca persiga os cetáceos.",
        "specs": {
          "distance": "Acesso costeiro ou passeios embarcados",
          "duration": "Passeios de barco: 3h a 4h",
          "elevation": "Costeira",
          "access": "Pela estrada sul até Sepituba ou passeios de lancha autorizados pelo Projeto Viva Baleias",
          "sea": "Mar aberto com rica passagem de correntes marinhas e krill",
          "structure": "Embarcações credenciadas com biólogos e sonares para escuta de cantos"
        }
      },
      "en": {
        "title": "Whale Watching Sanctuary - Sepituba Point",
        "subtitle": "Prime migration corridor for Humpback and Right Whales",
        "description": "Between June and August, the deep waters off southern Ilhabela become a bustling highway for migrating Humpback and Southern Right whales heading north. Dolphins are sighted year-round.",
        "highlights": [
          "Spectacular Humpback whale breaches",
          "Playful Bottlenose & Atlantic spotted dolphins",
          "Live hydrophone whale song listening",
          "Marine biologist guided expeditions"
        ],
        "ecoTip": "Maintain certified safe boat distances (100m minimum) and practice ethical wildlife observation.",
        "specs": {
          "distance": "Coastal access or boat tours",
          "duration": "Boat tours: 3–4 h",
          "elevation": "Rocky coast",
          "access": "Southern road to Sepituba or speedboat tours authorized by Projeto Viva Baleias",
          "sea": "Open sea with abundant currents and krill",
          "structure": "Accredited boats with biologists and sonar for listening to whale songs"
        }
      },
      "fr": {
        "title": "Sanctuaire des Baleines - Pointe de Sepituba",
        "subtitle": "Couloir de migration des baleines à bosse et baleines franches",
        "description": "De juin à août, le sud d Ilhabela accueille le passage grandiose des baleines à bosse en migration. Dauphins et tortues marines sont visibles toute l année.",
        "highlights": [
          "Sauts spectaculaires de baleines à bosse",
          "Dauphins souffleurs et dauphins tachetés",
          "Écoute sous-marine des chants de baleines",
          "Excursions guidées par des biologistes"
        ],
        "ecoTip": "Respectez les distances de sécurité de navigation (100 m minimum).",
        "specs": {
          "distance": "Accès côtier ou excursions en bateau",
          "duration": "Sorties en bateau : 3 à 4 h",
          "elevation": "Côte rocheuse",
          "access": "Route du sud jusqu’à Sepituba ou sorties autorisées par Projeto Viva Baleias",
          "sea": "Mer ouverte riche en courants marins et en krill",
          "structure": "Bateaux agréés avec biologistes et sonars pour écouter les chants"
        }
      },
      "es": {
        "title": "Santuario de Ballenas - Punta da Sepituba",
        "subtitle": "Ruta principal de migración de ballenas jorobadas y francas",
        "description": "De junio a agosto, las aguas del sur de la isla se convierten en un corredor migratorio de ballenas jorobadas. Los delfines y tortugas pueden observarse todo el año.",
        "highlights": [
          "Saltos acrobáticos de ballenas jorobadas",
          "Delfines nariz de botella y toninas",
          "Escucha de cantos con hidrófonos",
          "Expediciones con biólogos marinos"
        ],
        "ecoTip": "Respeta la distancia mínima reglamentaria de navegación (100 m).",
        "specs": {
          "distance": "Acceso costero o paseos en barco",
          "duration": "Paseos en barco: 3 a 4 h",
          "elevation": "Costa rocosa",
          "access": "Carretera sur hasta Sepituba o paseos autorizados por Projeto Viva Baleias",
          "sea": "Mar abierto con abundantes corrientes marinas y krill",
          "structure": "Embarcaciones acreditadas con biólogos y sonares para escuchar cantos"
        }
      },
      "he": {
        "title": "שמורת הלווייתנים - פונטה דה ספיטובה (Sepituba)",
        "subtitle": "מסדרון הנדידה הראשי של לווייתנים גדולי-סנפיר (יונק הדבש הימי)",
        "description": "בין החודשים יוני לאוגוסט, מי הדרום העמוקים של איליאבלה הופכים לנתיב נדידה שוקק של לווייתנים גדולי-סנפיר. דולפינים וצבי ים נצפים באזור לאורך כל השנה.",
        "highlights": [
          "קפיצות ומצגים אקרובטיים של לווייתנים",
          "להקות דולפינים ידידותיים",
          "האזנה לשירת הלווייתנים באמצעות הידרופון",
          "סיורים מודרכים עם ביולוגים ימיים"
        ],
        "ecoTip": "שמרו על מרחק שייט בטוח כחוק (לפחות 100 מטר) ולעולם אל תרדפו אחרי היונקים.",
        "specs": {
          "distance": "גישה מהחוף או בסיורי שייט",
          "duration": "סיורי שייט: 3–4 שעות",
          "elevation": "חוף סלעי",
          "access": "הכביש הדרומי עד Sepituba או סיורים מורשים של Projeto Viva Baleias",
          "sea": "ים פתוח עם זרמים ימיים עשירים וקריל",
          "structure": "כלי שייט מורשים עם ביולוגים וסונאר להאזנה לשירת לווייתנים"
        }
      }
    },
    "images": [
      "assets/images/ponto-baleias-sul-sepituba_1.jpg"
    ]
  },
  {
    "id": "ponto-baleias-canal",
    "category": "baleias",
    "coords": [
      -23.785,
      -45.385
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/ponto-baleias-canal_1.jpg",
    "tags": [
      "Golfinhos Botos",
      "Canal Abrigado",
      "Passeio de Barco",
      "Ano Todo"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "Embarcações a partir da Vila ou Perequê",
      "duration": "2h de navegação",
      "elevation": "Nível do mar",
      "access": "Passeios náuticos de lancha, veleiro ou escuna",
      "sea": "Canal abrigado entre a ilha e o continente",
      "structure": "Marinas estruturadas, aluguel de veleiros e passeios guiados"
    },
    "translations": {
      "pt": {
        "title": "Rota dos Golfinhos & Botos do Canal",
        "subtitle": "Águas calmas do canal habitadas o ano inteiro por golfinhos e botos",
        "description": "O canal de São Sebastião é um santuário protegido onde famílias de golfinhos-nariz-de-garrafa, botos-cinza e toninhas nadam e caçam tranquilamente. É muito comum avistá-los acompanhando as proas dos barcos.",
        "highlights": [
          "Avistamento de golfinhos em seu habitat natural",
          "Navegação calma e segura para toda a família",
          "Pôr do sol dourado no canal",
          "Fotografia de fauna marinha"
        ],
        "ecoTip": "Não jogue alimentos e mantenha os motores em baixa rotação próximo aos animais.",
        "specs": {
          "distance": "Embarcações a partir da Vila ou Perequê",
          "duration": "2h de navegação",
          "elevation": "Nível do mar",
          "access": "Passeios náuticos de lancha, veleiro ou escuna",
          "sea": "Canal abrigado entre a ilha e o continente",
          "structure": "Marinas estruturadas, aluguel de veleiros e passeios guiados"
        }
      },
      "en": {
        "title": "Channel Dolphin & Porpoise Route",
        "subtitle": "Sheltered waters inhabited year-round by playful wild dolphins",
        "description": "The channel of São Sebastião is a protected sanctuary where pods of Bottlenose and Guiana dolphins forage and swim year-round, often riding the boat bow waves.",
        "highlights": [
          "Year-round wild dolphin encounters",
          "Gentle and family-safe boat cruising",
          "Golden hour sunset over the channel",
          "Marine photography"
        ],
        "ecoTip": "Never feed wildlife and maintain idle boat speeds near dolphins.",
        "specs": {
          "distance": "Boats from Vila or Perequê",
          "duration": "2 h by boat",
          "elevation": "Sea level",
          "access": "Speedboat, sailboat or schooner tours",
          "sea": "Sheltered channel between island and mainland",
          "structure": "Equipped marinas, sailboat rentals and guided tours"
        }
      },
      "fr": {
        "title": "Route des Dauphins du Canal",
        "subtitle": "Eaux abritées fréquentées toute l année par des dauphins sauvages",
        "description": "Le canal de São Sebastião est un refuge naturel où évoluent des groupes de dauphins souffleurs et dauphins de Guyane, accompagnant souvent les bateaux.",
        "highlights": [
          "Observation de dauphins en liberté",
          "Croisière calme adaptée aux familles",
          "Coucher de soleil doré sur l eau",
          "Superbes photos marines"
        ],
        "ecoTip": "Ne nourrissez pas les animaux sauvages.",
        "specs": {
          "distance": "Embarcations depuis Vila ou Perequê",
          "duration": "2 h de navigation",
          "elevation": "Niveau de la mer",
          "access": "Excursions en bateau rapide, voilier ou goélette",
          "sea": "Canal abrité entre l’île et le continent",
          "structure": "Marinas équipées, location de voiliers et excursions guidées"
        }
      },
      "es": {
        "title": "Ruta de los Delfines del Canal",
        "subtitle": "Aguas mansas habitadas todo el año por delfines y toninas",
        "description": "El canal de São Sebastião es un santuario natural donde familias de delfines cazan y nadan cerca de las embarcaciones durante todo el año.",
        "highlights": [
          "Avistamiento de delfines silvestres",
          "Navegación tranquila para familias",
          "Puesta de sol dorada en el canal",
          "Fotografía marina de cerca"
        ],
        "ecoTip": "No arrojes comida y mantén velocidad lenta cerca de ellos.",
        "specs": {
          "distance": "Embarcaciones desde Vila o Perequê",
          "duration": "2 h de navegación",
          "elevation": "Nivel del mar",
          "access": "Paseos en lancha, velero o goleta",
          "sea": "Canal protegido entre la isla y el continente",
          "structure": "Marinas equipadas, alquiler de veleros y paseos guiados"
        }
      },
      "he": {
        "title": "נתיב הדולפינים של תעלת סאו סבסטיאו",
        "subtitle": "מים רגועים שבהם שוחות להקות דולפינים לאורך כל ימות השנה",
        "description": "תעלת הים השקטה שבין האי ליבשת מהווה מקלט טבעי שבו משפחות של דולפינים שוחות ומשחקות לצד חרטומי הסירות בכל עונות השנה.",
        "highlights": [
          "מפגש עם דולפינים בסביבתם הטבעית",
          "שייט רגוע ובטוח לכל המשפחה",
          "שקיעות זהובות מעל המים",
          "צילום ימי מרהיב"
        ],
        "ecoTip": "אין להאכיל את חיות הבר ויש לשוט במהירות איטית בסמוך אליהן.",
        "specs": {
          "distance": "סירות מ-Vila או Perequê",
          "duration": "שעתיים שייט",
          "elevation": "גובה פני הים",
          "access": "סיורי סירת מנוע, מפרשית או סקונר",
          "sea": "תעלה מוגנת בין האי ליבשת",
          "structure": "מרינות מצוידות, השכרת מפרשיות וסיורים מודרכים"
        }
      }
    },
    "images": [
      "assets/images/ponto-baleias-canal_1.jpg"
    ]
  },
  {
    "id": "naufragio-aymore",
    "category": "mergulho",
    "coords": [
      -23.8703,
      -45.4381
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/naufragio-aymore_1.jpg",
    "tags": [
      "Vapor 1920",
      "Mergulho Livre",
      "Corais",
      "Tartarugas"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "A 100m da costeira da Praia do Curral / Veloso",
      "duration": "1h de mergulho",
      "elevation": "Profundidade de 4m a 18m",
      "access": "Mergulho a partir da praia ou barco de operadora",
      "sea": "Águas calmas com excelente visibilidade no inverno e outono",
      "structure": "Próximo a operadoras de mergulho credenciadas"
    },
    "translations": {
      "pt": {
        "title": "Naufrágio do Vapor Aymoré",
        "subtitle": "Navio cargueiro naufragado em 1920 rico em corais e vida marinha",
        "description": "O navio a vapor Aymoré encalhou em 1920 no sul de Ilhabela. Hoje suas caldeiras, eixos e peças centenárias estão cobertos de gorgônias e anêmonas, atraindo polvos, raias e tartarugas marinhas.",
        "highlights": [
          "Caldeiras e peças de 1920 visíveis em mergulho livre",
          "Rico recife de corais e esponjas",
          "Avistamento frequente de tartarugas e raias",
          "Acesso fácil próximo à costa"
        ],
        "ecoTip": "Não toque nos animais marinhos e preserve as peças históricas.",
        "specs": {
          "distance": "A 100m da costeira da Praia do Curral / Veloso",
          "duration": "1h de mergulho",
          "elevation": "Profundidade de 4m a 18m",
          "access": "Mergulho a partir da praia ou barco de operadora",
          "sea": "Águas calmas com excelente visibilidade no inverno e outono",
          "structure": "Próximo a operadoras de mergulho credenciadas"
        }
      },
      "en": {
        "title": "Aymoré Steamship Wreck",
        "subtitle": "1920 sunken cargo steamer thriving with colorful reef life",
        "description": "The steamship Aymoré ran aground in 1920. Today its boilers, shafts, and century-old wreckage form a bustling artificial reef frequented by octopuses, stingrays, and sea turtles.",
        "highlights": [
          "Historic 1920 boilers accessible by snorkel",
          "Vibrant sponge & coral reef habitat",
          "Frequent sea turtle and ray encounters",
          "Close and easy coastal access"
        ],
        "ecoTip": "Do not touch marine wildlife and leave historic artifacts undisturbed.",
        "specs": {
          "distance": "100 m from the Praia do Curral / Veloso coast",
          "duration": "1 h diving",
          "elevation": "4–18 m deep",
          "access": "Dive from the beach or an operator’s boat",
          "sea": "Calm waters with excellent visibility in winter and autumn",
          "structure": "Near accredited diving operators"
        }
      },
      "fr": {
        "title": "Épave du Vapeur Aymoré",
        "subtitle": "Cargo coulé en 1920 transformé en récif de corail",
        "description": "Le navire à vapeur Aymoré a fait naufrage en 1920. Ses chaudières et structures centenaires abritent aujourd hui pieuvres, raies et tortues de mer.",
        "highlights": [
          "Chaudières de 1920 visibles en snorkeling",
          "Récif de coraux et anémones",
          "Tortues et raies marines",
          "Accès facile depuis la côte"
        ],
        "ecoTip": "Ne touchez pas aux animaux marins et respectez le site.",
        "specs": {
          "distance": "À 100 m de la côte de Praia do Curral / Veloso",
          "duration": "1 h de plongée",
          "elevation": "Profondeur de 4 à 18 m",
          "access": "Plongée depuis la plage ou le bateau d’un opérateur",
          "sea": "Eaux calmes avec excellente visibilité en hiver et en automne",
          "structure": "À proximité d’opérateurs de plongée agréés"
        }
      },
      "es": {
        "title": "Naufragio del Vapor Aymoré",
        "subtitle": "Carguero a vapor hundido en 1920 lleno de corales y peces",
        "description": "El barco de vapor Aymoré encalló en 1920. Hoy sus calderas y restos centenarios forman un arrecife poblado de pulpos, rayas y tortugas marinas.",
        "highlights": [
          "Calderas de 1920 accesibles con snorkel",
          "Arrecife de esponjas y corales",
          "Encuentros con tortugas y rayas",
          "Fácil acceso cercano a la costa"
        ],
        "ecoTip": "No toques la fauna marina y respeta las piezas históricas.",
        "specs": {
          "distance": "A 100 m de la costa de Praia do Curral / Veloso",
          "duration": "1 h de buceo",
          "elevation": "Profundidad de 4 a 18 m",
          "access": "Buceo desde la playa o barco de operador",
          "sea": "Aguas tranquilas con excelente visibilidad en invierno y otoño",
          "structure": "Cerca de operadores de buceo acreditados"
        }
      },
      "he": {
        "title": "ספינת הקיטור הטבועה איימור (Vapor Aymoré)",
        "subtitle": "ספינת משא שטבעה ב-1920 ושופעת אלמוגים וחיים ימיים",
        "description": "ספינת הקיטור איימור טבעה בשנת 1920. כיום דוודי הקיטור ושרידי הספינה הפכו לשונית אלמוגים שוקקת חיים בה שוחים תמנונים, חתולי ים וצבי ים.",
        "highlights": [
          "דוודי קיטור מ-1920 הנגישים בשנירקול",
          "שונית אלמוגים וספוגים עשירה",
          "מפגשים תכופים עם צבי ים וחתולי ים",
          "גישה נוחה וקרובה לקו החוף"
        ],
        "ecoTip": "אל תיגעו בבעלי החיים הימיים ושמרו על שרידי הספינה ההיסטורית.",
        "specs": {
          "distance": "100 מ׳ מחוף Praia do Curral / Veloso",
          "duration": "שעת צלילה",
          "elevation": "עומק 4–18 מ׳",
          "access": "צלילה מהחוף או מסירת מפעיל",
          "sea": "מים רגועים עם ראות מצוינת בחורף ובסתיו",
          "structure": "בסמוך למפעילי צלילה מורשים"
        }
      }
    },
    "images": [
      "assets/images/naufragio-aymore_1.jpg"
    ]
  },
  {
    "id": "santuario-ilha-das-cabras",
    "category": "mergulho",
    "coords": [
      -23.8569,
      -45.4208
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/santuario-ilha-das-cabras_1.jpg",
    "tags": [
      "Santuário Marinho",
      "Estátua de Netuno",
      "Tartarugas",
      "Mergulho Livre"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": true,
      "isKiosk": true,
      "isWild": false,
      "isFamily": true,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "easy",
      "distance": "A 50 metros da costa (Praia das Pedras Miúdas)",
      "duration": "1h a 2h de mergulho",
      "elevation": "Profundidade de 3m a 12m",
      "access": "Entrada direta pela Praia das Pedras Miúdas ou barco de mergulho",
      "sea": "Águas abrigadas e transparentes, protegidas por lei desde 1992",
      "structure": "Escolas de mergulho PADI, aluguel de snorkel, caiaques e quiosques"
    },
    "translations": {
      "pt": {
        "title": "Santuário Ecológico da Ilha das Cabras",
        "subtitle": "Reserva marinha protegida com tartarugas, raias e a Estátua de Netuno",
        "description": "O melhor ponto de mergulho livre e com cilindro para iniciantes e avançados em Ilhabela. A reserva abriga cardumes coloridos, polvos, cavalos-marinhos e a famosa estátua submersa de Netuno a 7 metros de profundidade.",
        "highlights": [
          "Nado ao lado de tartarugas marinhas",
          "Estátua de Netuno submersa",
          "Cardumes multicoloridos e corais",
          "Excelente para batismo de mergulho"
        ],
        "ecoTip": "Área de preservação permanente. É expressamente proibida a caça submarina e a pesca.",
        "specs": {
          "distance": "A 50 metros da costa (Praia das Pedras Miúdas)",
          "duration": "1h a 2h de mergulho",
          "elevation": "Profundidade de 3m a 12m",
          "access": "Entrada direta pela Praia das Pedras Miúdas ou barco de mergulho",
          "sea": "Águas abrigadas e transparentes, protegidas por lei desde 1992",
          "structure": "Escolas de mergulho PADI, aluguel de snorkel, caiaques e quiosques"
        }
      },
      "en": {
        "title": "Ilha das Cabras Marine Sanctuary",
        "subtitle": "Protected underwater reserve with sea turtles, rays, and Neptune Statue",
        "description": "The premier snorkeling and scuba diving destination in Ilhabela. Home to colorful tropical schools, seahorses, stingrays, and the iconic submerged Neptune statue at 23 feet depth.",
        "highlights": [
          "Swim alongside friendly sea turtles",
          "Submerged bronze Neptune statue",
          "Rich coral reefs and tropical marine life",
          "Ideal for first-time scuba discovery dives"
        ],
        "ecoTip": "Strict marine sanctuary. Fishing and underwater hunting are strictly prohibited.",
        "specs": {
          "distance": "50 m offshore (Praia das Pedras Miúdas)",
          "duration": "1–2 h diving",
          "elevation": "3–12 m deep",
          "access": "Direct entry from Praia das Pedras Miúdas or dive boat",
          "sea": "Sheltered, clear waters protected by law since 1992",
          "structure": "PADI diving schools, snorkel and kayak rentals, and kiosks"
        }
      },
      "fr": {
        "title": "Sanctuaire Marin d Ilha das Cabras",
        "subtitle": "Réserve sous-marine protégée avec tortues marines et statue de Neptune",
        "description": "Le spot incontournable de snorkeling et plongée sous-marine à Ilhabela. On y observe des tortues, des raies et la célèbre statue immergée de Neptune à 7 m de fond.",
        "highlights": [
          "Nagez avec les tortues marines",
          "Statue de Neptune immergée",
          "Poissons tropicaux multicolores",
          "Idéal pour baptême de plongée"
        ],
        "ecoTip": "Réserve protégée. Pêche et chasse sous-marine strictement interdites.",
        "specs": {
          "distance": "À 50 m de la côte (Praia das Pedras Miúdas)",
          "duration": "1 à 2 h de plongée",
          "elevation": "Profondeur de 3 à 12 m",
          "access": "Entrée directe depuis Praia das Pedras Miúdas ou bateau de plongée",
          "sea": "Eaux abritées et transparentes, protégées par la loi depuis 1992",
          "structure": "Écoles de plongée PADI, location de matériel de snorkeling, kayaks et kiosques"
        }
      },
      "es": {
        "title": "Santuario Marino Ilha das Cabras",
        "subtitle": "Reserva submarina protegida con tortugas marinas y Estatua de Neptuno",
        "description": "El mejor punto de snorkel y buceo de la isla. Alberga bancos de peces tropicales, mantarrayas, tortugas y la famosa estatua sumergida de Neptuno a 7 metros.",
        "highlights": [
          "Nado con tortugas marinas",
          "Estatua sumergida de Neptuno",
          "Corales y rica vida marina",
          "Ideal para bautismos de buceo"
        ],
        "ecoTip": "Reserva marina protegida. La pesca y caza submarina están terminantemente prohibidas.",
        "specs": {
          "distance": "A 50 m de la costa (Praia das Pedras Miúdas)",
          "duration": "1 a 2 h de buceo",
          "elevation": "Profundidad de 3 a 12 m",
          "access": "Entrada directa desde Praia das Pedras Miúdas o barco de buceo",
          "sea": "Aguas protegidas y transparentes, amparadas por ley desde 1992",
          "structure": "Escuelas de buceo PADI, alquiler de esnórquel, kayaks y quioscos"
        }
      },
      "he": {
        "title": "שמורת הטבע הימית איליה דאס קברס (Ilha das Cabras)",
        "subtitle": "שמורה ימית מוגנת עם צבי ים, חתולי ים ופסל נפטון התת-ימי",
        "description": "אתר הצלילה והשנירקול המוביל באיליאבלה. השמורה עשירה בלהקות דגים טרופיים צבעוניים, צבי ים ופסל הברונזה המפורסם של נפטון השקוע בעומק 7 מטרים.",
        "highlights": [
          "שחייה לצד צבי ים ידידותיים",
          "פסל נפטון התת-ימי המפורסם",
          "שוניות אלמוגים ודגים צבעוניים",
          "אידיאלי לצלילות היכרות ושנירקול"
        ],
        "ecoTip": "שמורה מוגנת בחוק. חל איסור מוחלט על דיג או פגיעה בחי הימי.",
        "specs": {
          "distance": "50 מ׳ מהחוף (Praia das Pedras Miúdas)",
          "duration": "שעה עד שעתיים צלילה",
          "elevation": "עומק 3–12 מ׳",
          "access": "כניסה ישירה מ-Praia das Pedras Miúdas או מסירת צלילה",
          "sea": "מים מוגנים וצלולים, מוגנים בחוק מאז 1992",
          "structure": "בתי ספר לצלילה PADI, השכרת שנורקלים, קיאקים וקיוסקים"
        }
      }
    },
    "images": [
      "assets/images/santuario-ilha-das-cabras_1.jpg"
    ]
  },
  {
    "id": "naufragio-principe-de-asturias",
    "category": "mergulho",
    "coords": [
      -23.9167,
      -45.2833
    ],
    "rating": null,
    "reviews": 0,
    "image": "assets/images/naufragio-principe-de-asturias_1.jpg",
    "tags": [
      "O Titanic Brasileiro",
      "História 1916",
      "Mergulho Avançado",
      "Ponta da Pirabura"
    ],
    "attributes": {
      "isDiving": true,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": false
    },
    "specs": {
      "difficulty": "extreme",
      "distance": "Acesso exclusivo por embarcação especializada",
      "duration": "Mergulho técnico / avançado",
      "elevation": "Profundidade de 18m a 45m",
      "access": "Lanchas de operadoras de mergulho credenciadas",
      "sea": "Mar aberto com correntes e vida marinha exuberante ao redor do casco",
      "structure": "Apenas acompanhado por guias de mergulho técnico e instrutores"
    },
    "translations": {
      "pt": {
        "title": "Naufrágio Príncipe de Astúrias",
        "subtitle": "O Titanic Brasileiro (Naufragado em 1916 na Ponta da Pirabura)",
        "description": "O mais famoso e trágico transatlântico a naufragar na costa brasileira. Com mais de 150 metros de comprimento, o navio hoje repousa coberto de corais, abrigando garoupas gigantes, tartarugas e cardumes de passagem.",
        "highlights": [
          "Maior patrimônio histórico subaquático do país",
          "Peças preservadas: caldeiras e hélices gigantes",
          "Biodiversidade marinha exuberante",
          "Mergulho de naufrágio lendário"
        ],
        "ecoTip": "Sítio arqueológico subaquático protegido. É proibido recolher qualquer artefato do navio.",
        "specs": {
          "distance": "Acesso exclusivo por embarcação especializada",
          "duration": "Mergulho técnico / avançado",
          "elevation": "Profundidade de 18m a 45m",
          "access": "Lanchas de operadoras de mergulho credenciadas",
          "sea": "Mar aberto com correntes e vida marinha exuberante ao redor do casco",
          "structure": "Apenas acompanhado por guias de mergulho técnico e instrutores"
        }
      },
      "en": {
        "title": "Príncipe de Asturias Shipwreck",
        "subtitle": "The Brazilian Titanic (Sunk in 1916 off Pirabura Point)",
        "description": "The most legendary ocean liner shipwreck in South America. Stretching over 490 feet long, the vessel now forms an artificial reef teeming with giant groupers, rays, and sea turtles.",
        "highlights": [
          "Iconic maritime historic treasure",
          "Intact boilers and giant bronze propellers",
          "Thriving artificial reef ecosystem",
          "Legendary world-class wreck dive"
        ],
        "ecoTip": "Protected underwater heritage site. Taking artifacts is strictly forbidden.",
        "specs": {
          "distance": "Access only by specialist boat",
          "duration": "Technical / advanced diving",
          "elevation": "18–45 m deep",
          "access": "Speedboats from accredited diving operators",
          "sea": "Open sea with currents and abundant marine life around the hull",
          "structure": "Only with technical dive guides and instructors"
        }
      },
      "fr": {
        "title": "Épave du Príncipe de Asturias",
        "subtitle": "Le Titanic Brésilien (Coulé en 1916 à la pointe Pirabura)",
        "description": "Le paquebot le plus célèbre de l histoire maritime brésilienne. L épave de 150 m de long est aujourd hui un sanctuaire marin abritant mérous géants et coraux.",
        "highlights": [
          "Trésor archéologique sous-marin",
          "Hélices géantes et chaudières intactes",
          "Écosystème récifal exceptionnel",
          "Plongée d épave mythique"
        ],
        "ecoTip": "Site archéologique protégé. Il est interdit de prélever des objets.",
        "specs": {
          "distance": "Accès exclusivement en embarcation spécialisée",
          "duration": "Plongée technique / avancée",
          "elevation": "Profondeur de 18 à 45 m",
          "access": "Bateaux rapides d’opérateurs de plongée agréés",
          "sea": "Mer ouverte avec courants et vie marine abondante autour de la coque",
          "structure": "Uniquement avec guides de plongée technique et instructeurs"
        }
      },
      "es": {
        "title": "Naufragio Príncipe de Asturias",
        "subtitle": "El Titanic Brasileño (Hundido en 1916 en Punta Pirabura)",
        "description": "El transatlántico más famoso y misterioso hundido en aguas brasileñas. Sus más de 150 metros de eslora forman un arrecife poblado por meros gigantes y tortugas.",
        "highlights": [
          "Patrimonio histórico submarino legendario",
          "Calderas y hélices gigantescas",
          "Gran biodiversidad marina",
          "Inmersión de pecio inolvidable"
        ],
        "ecoTip": "Sitio histórico protegido. Prohibido extraer cualquier elemento del pecio.",
        "specs": {
          "distance": "Acceso exclusivo en embarcación especializada",
          "duration": "Buceo técnico / avanzado",
          "elevation": "Profundidad de 18 a 45 m",
          "access": "Lanchas de operadores de buceo acreditados",
          "sea": "Mar abierto con corrientes y abundante vida marina alrededor del casco",
          "structure": "Solo con guías de buceo técnico e instructores"
        }
      },
      "he": {
        "title": "ספינת הענק הטבועה פרינסיפה דה אסטוריאס",
        "subtitle": "הטיטאניק הברזילאית (טבעה ב-1916 מול פונטה פיראבורה)",
        "description": "ספינת הנוסעים המפוארת והמפורסמת ביותר שטבעה בדרום אמריקה. אורכה מעל 150 מטרים וכיום היא מהווה שונית מלאכותית מדהימה המלאה בדגי לוקוס ענקיים וצבי ים.",
        "highlights": [
          "אתר מורשת תת-ימי היסטורי מהשורה הראשונה",
          "דוודי קיטור ומדחפי ענק שמורים",
          "עולם חי ימי שופע ומרשים",
          "צלילת ספינה טבועה אגדית"
        ],
        "ecoTip": "אתר מורשת מוגן. חל איסור מוחלט על לקיחת פריטים מהספינה.",
        "specs": {
          "distance": "גישה רק בכלי שייט ייעודי",
          "duration": "צלילה טכנית / מתקדמת",
          "elevation": "עומק 18–45 מ׳",
          "access": "סירות מנוע של מפעילי צלילה מורשים",
          "sea": "ים פתוח עם זרמים וחיים ימיים עשירים סביב גוף הספינה",
          "structure": "רק בליווי מדריכי צלילה טכנית ומדריכים מוסמכים"
        }
      }
    },
    "images": [
      "assets/images/naufragio-principe-de-asturias_1.jpg"
    ]
  }
];

const guidesData = [
  {
    "id": "guide-trilhabela",
    "name": "Trilhabela Turismo",
    "verification": { "type": "peib", "label": "PEIB", "source": "https://trilhabela.com.br/sobre-trilhabela/" },
    "specialtyKey": "guideSpecTrails",
    "specialties": ["Trilhas Guiadas", "Travessias", "Pico do Baepi", "Bonete"],
    "languages": ["Português"],
    "languagesList": ["pt"],
    "phone": "+5512991226986",
    "url": "https://trilhabela.com.br/",
    "whatsappText": "Olá! Vi a Trilhabela no Ilhabela Trip e gostaria de informações sobre um passeio guiado.",
    "translations": {
      "pt": {"role":"Guias locais & ecoturismo","bio":"Trilhabela Turismo, fundada pelo guia Ernani Sousa, atua há mais de 20 anos com trilhas, picos, travessias e passeios em Ilhabela, com guiamento credenciado pelo Parque Estadual.","specialties":["Trilhas Guiadas","Travessias","Pico do Baepi","Bonete"]},
      "en": {"role":"Local guides & ecotourism","bio":"Trilhabela Turismo, founded by guide Ernani Sousa, has over 20 years of experience with trails, peaks, crossings and tours in Ilhabela, with guiding accredited by the State Park.","specialties":["Guided trails","Crossings","Baepi Peak","Bonete"]},
      "fr": {"role":"Guides locaux & écotourisme","bio":"Trilhabela Turismo, fondée par le guide Ernani Sousa, propose depuis plus de 20 ans des sentiers, sommets, traversées et excursions à Ilhabela, avec un guidage accrédité par le parc d'État.","specialties":["Randonnées guidées","Traversées","Pico do Baepi","Bonete"]},
      "es": {"role":"Guías locales y ecoturismo","bio":"Trilhabela Turismo, fundada por el guía Ernani Sousa, cuenta con más de 20 años de experiencia en senderos, picos, travesías y paseos en Ilhabela, con guiado acreditado por el Parque Estatal.","specialties":["Senderos guiados","Travesías","Pico do Baepi","Bonete"]},
      "he": {"role":"מדריכים מקומיים ותיירות אקולוגית","bio":"Trilhabela Turismo, שנוסדה על ידי המדריך Ernani Sousa, פועלת יותר מ-20 שנה במסלולים, פסגות, חציות וסיורים באיליאבלה, עם הדרכה המוסמכת על ידי הפארק המדינתי.","specialties":["מסלולים מודרכים","חציות","Pico do Baepi","Bonete"]}
    }
  },
  {
    "id": "guide-pato-ilhabela",
    "name": "Pato Guia Ilhabela",
    "specialtyKey": "guideSpecBirdwatching",
    "specialties": ["Guia Nativo", "Castelhanos 4x4", "Bonete", "Avistamento de Baleias"],
    "languages": ["Português"],
    "languagesList": ["pt"],
    "phone": "+5512991675467",
    "url": "https://www.patopasseioilhabela.com/",
    "whatsappText": "Olá! Vi o Pato Guia no Ilhabela Trip e gostaria de informações sobre um passeio.",
    "translations": {
      "pt": {"role":"Guia nativo & experiências locais","bio":"Guia nativo de Ilhabela com mais de 11 anos de experiência, fundador da Rosa Norte e especializado em praias, trilhas, cachoeiras, Castelhanos, Bonete e avistamento de baleias.","specialties":["Guia Nativo","Castelhanos 4x4","Bonete","Avistamento de Baleias"]},
      "en": {"role":"Native guide & local experiences","bio":"Ilhabela-born guide with over 11 years of experience, founder of Rosa Norte and specialized in beaches, trails, waterfalls, Castelhanos, Bonete and whale watching.","specialties":["Native guide","Castelhanos 4x4","Bonete","Whale watching"]},
      "fr": {"role":"Guide natif & expériences locales","bio":"Guide natif d'Ilhabela avec plus de 11 ans d'expérience, fondateur de Rosa Norte et spécialiste des plages, sentiers, cascades, Castelhanos, Bonete et observation des baleines.","specialties":["Guide natif","Castelhanos 4x4","Bonete","Observation des baleines"]},
      "es": {"role":"Guía nativo y experiencias locales","bio":"Guía nativo de Ilhabela con más de 11 años de experiencia, fundador de Rosa Norte y especializado en playas, senderos, cascadas, Castelhanos, Bonete y avistamiento de ballenas.","specialties":["Guía nativo","Castelhanos 4x4","Bonete","Avistamiento de ballenas"]},
      "he": {"role":"מדריך יליד וחוויות מקומיות","bio":"מדריך יליד איליאבלה עם יותר מ-11 שנות ניסיון, מייסד Rosa Norte ומתמחה בחופים, מסלולים, מפלים, Castelhanos, Bonete וצפייה בלווייתנים.","specialties":["מדריך מקומי","Castelhanos 4x4","Bonete","צפייה בלווייתנים"]}
    }
  },

  {
    "id": "guide-vivaventura",
    "name": "Vivaventura Ecoturismo",
    "specialtyKey": "guideSpecWaterfalls",
    "specialties": ["Trilhas Guiadas", "Cachoeiras", "Castelhanos 4x4", "Passeios de Barco"],
    "languages": ["Português"],
    "languagesList": ["pt"],
    "phone": "+5512982934171",
    "url": "https://www.vivaventurailhabela.com/",
    "whatsappText": "Olá! Vi a Vivaventura no Ilhabela Trip e gostaria de informações sobre um passeio.",
    "translations": {
      "pt": {"role":"Ecoturismo & aventuras locais","bio":"Operação local em Ilhabela com trilhas guiadas, cachoeiras, passeios de jipe 4x4, barco e experiências de observação de cetáceos.","specialties":["Trilhas Guiadas","Cachoeiras","Castelhanos 4x4","Passeios de Barco"]},
      "en": {"role":"Ecotourism & local adventures","bio":"Local Ilhabela operator offering guided trails, waterfalls, 4x4 jeep tours, boat trips and whale-watching experiences.","specialties":["Guided trails","Waterfalls","Castelhanos 4x4","Boat tours"]},
      "fr": {"role":"Écotourisme & aventures locales","bio":"Opérateur local d'Ilhabela proposant randonnées guidées, cascades, excursions en 4x4, sorties en bateau et observation des cétacés.","specialties":["Randonnées guidées","Cascades","Castelhanos en 4x4","Excursions en bateau"]},
      "es": {"role":"Ecoturismo y aventuras locales","bio":"Operador local de Ilhabela con senderos guiados, cascadas, paseos en jeep 4x4, barco y experiencias de avistamiento de cetáceos.","specialties":["Senderos guiados","Cascadas","Castelhanos 4x4","Paseos en barco"]},
      "he": {"role":"תיירות אקולוגית והרפתקאות מקומיות","bio":"מפעיל מקומי באיליאבלה המציע מסלולים מודרכים, מפלים, טיולי 4x4, שיט וחוויות צפייה בלווייתנים.","specialties":["מסלולים מודרכים","מפלים","Castelhanos 4x4","סיורי שיט"]}
    }
  },
  {
    "id": "guide-castelhanos-turismo",
    "name": "Castelhanos Turismo",
    "specialtyKey": "guideSpecHistory",
    "specialties": ["Castelhanos 4x4", "Cultura Caiçara", "Passeios de Barco", "Bonete"],
    "languages": ["Português"],
    "languagesList": ["pt"],
    "phone": "+5512997676558",
    "url": "https://castelhanostur.com.br/",
    "whatsappText": "Olá! Vi a Castelhanos Turismo no Ilhabela Trip e gostaria de informações sobre um passeio.",
    "translations": {
      "pt": {"role":"Guia caiçara & ecoturismo 4x4","bio":"Operação local conduzida por Rodrigo, caiçara nativo de Ilhabela, com 25 anos de experiência em passeios pela ilha, incluindo Castelhanos, barco, Bonete e temporada de baleias.","specialties":["Castelhanos 4x4","Cultura Caiçara","Passeios de Barco","Bonete"]},
      "en": {"role":"Caiçara guide & 4x4 ecotourism","bio":"Local operation led by Rodrigo, an Ilhabela-born caiçara guide with 25 years of experience on island tours, including Castelhanos, boat trips, Bonete and whale season.","specialties":["Castelhanos 4x4","Caiçara culture","Boat tours","Bonete"]},
      "fr": {"role":"Guide caiçara & écotourisme 4x4","bio":"Opération locale menée par Rodrigo, guide caiçara natif d'Ilhabela avec 25 ans d'expérience, notamment à Castelhanos, en bateau, à Bonete et pendant la saison des baleines.","specialties":["Castelhanos 4x4","Culture caiçara","Excursions en bateau","Bonete"]},
      "es": {"role":"Guía caiçara y ecoturismo 4x4","bio":"Operación local dirigida por Rodrigo, guía caiçara nativo de Ilhabela con 25 años de experiencia en paseos por la isla, incluyendo Castelhanos, barco, Bonete y temporada de ballenas.","specialties":["Castelhanos 4x4","Cultura caiçara","Paseos en barco","Bonete"]},
      "he": {"role":"מדריך קאיסרה ותיירות אקולוגית 4x4","bio":"פעילות מקומית בהובלת Rodrigo, מדריך קאיסרה יליד איליאבלה עם 25 שנות ניסיון בסיורים באי, כולל Castelhanos, שיט, Bonete ועונת הלווייתנים.","specialties":["Castelhanos 4x4","תרבות קאיסרה","סיורי שיט","Bonete"]}
    }
  }
];
