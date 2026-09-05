// Attraction facts and localized content. Keep every supported language complete.
const touristSpots = [
  {
    "id": "praia-do-bonete",
    "category": "praias",
    "coords": [
      -23.9022,
      -45.3524
    ],
    "rating": 4.9,
    "reviews": 342,
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
    "rating": 4.9,
    "reviews": 489,
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
    "rating": 4.9,
    "reviews": 230,
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
    "rating": 4.8,
    "reviews": 380,
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
    "rating": 4.8,
    "reviews": 512,
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
    "rating": 4.8,
    "reviews": 310,
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
    "rating": 4.7,
    "reviews": 195,
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
    "rating": 4.8,
    "reviews": 210,
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
    "rating": 4.9,
    "reviews": 120,
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
    "rating": 5,
    "reviews": 98,
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
      -23.8892,
      -45.3847
    ],
    "rating": 4.9,
    "reviews": 310,
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
      "distance": "3.5 km na Trilha do Bonete",
      "duration": "1h de caminhada a partir de Sepituba",
      "elevation": "+120m",
      "access": "Pela Trilha do Bonete a partir da Ponta da Sepituba",
      "sea": "Não se aplica (Água doce de rio cristalina e refrescante)",
      "structure": "Ponte pênsil de madeira sobre o rio, área para piquenique natural"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Laje",
        "subtitle": "O famoso escorregador natural de pedra de 30 metros",
        "description": "A primeira grande parada na Trilha do Bonete. Famosa pela laje lisa de pedra inclinada que serve como um escorregador natural gigante que deságua em um poço fundo de águas esmeralda.",
        "highlights": [
          "Tobogã de pedra natural de 30m",
          "Poço amplo e profundo para mergulho",
          "Ponte pênsil suspensa sobre o rio",
          "Parada obrigatória dos trilheiros"
        ],
        "ecoTip": "Desça no tobogã apenas sentado e verifique a profundidade antes de mergulhar.",
        "specs": {
          "distance": "3.5 km na Trilha do Bonete",
          "duration": "1h de caminhada a partir de Sepituba",
          "elevation": "+120m",
          "access": "Pela Trilha do Bonete a partir da Ponta da Sepituba",
          "sea": "Não se aplica (Água doce de rio cristalina e refrescante)",
          "structure": "Ponte pênsil de madeira sobre o rio, área para piquenique natural"
        }
      },
      "en": {
        "title": "Laje Waterfall (Cachoeira da Laje)",
        "subtitle": "Famous 100-foot natural rock water slide and deep emerald pool",
        "description": "The premier stop along the Bonete trail. Renowned for its smooth granite rock face that creates a thrilling natural water slide plunging into deep crystal pool.",
        "highlights": [
          "30-meter natural rock water slide",
          "Deep emerald swimming pool",
          "Scenic suspension bridge across the river",
          "Top hiker rest spot"
        ],
        "ecoTip": "Slide only in a seated position and check pool depth first.",
        "specs": {
          "distance": "3.5 km along the Bonete trail",
          "duration": "1 h walk from Sepituba",
          "elevation": "+120 m",
          "access": "Bonete trail from Ponta da Sepituba",
          "sea": "Not applicable (clear, refreshing river water)",
          "structure": "Wooden suspension bridge over the river and natural picnic area"
        }
      },
      "fr": {
        "title": "Cascade da Laje",
        "subtitle": "Toboggan naturel en roche de 30 mètres et vasque profonde",
        "description": "L escale incontournable du sentier de Bonete. Une dalle de granit lisse forme un toboggan aquatique naturel débouchant dans une vasque d eau émeraude.",
        "highlights": [
          "Toboggan naturel de 30 mètres",
          "Grand bassin profond de baignade",
          "Pont suspendu au-dessus du torrent",
          "Halte favorite des randonneurs"
        ],
        "ecoTip": "Glissez assis et vérifiez la profondeur avant de sauter.",
        "specs": {
          "distance": "3,5 km sur le sentier du Bonete",
          "duration": "1 h de marche depuis Sepituba",
          "elevation": "+120 m",
          "access": "Sentier du Bonete depuis Ponta da Sepituba",
          "sea": "Sans objet (eau de rivière cristalline et rafraîchissante)",
          "structure": "Pont suspendu en bois sur la rivière et aire naturelle de pique-nique"
        }
      },
      "es": {
        "title": "Cascada da Laje",
        "subtitle": "Tobogán natural de piedra de 30 metros y poza profunda",
        "description": "La parada más famosa del sendero a Bonete. Una gran roca lisa sirve de tobogán acuático natural que desemboca en una poza de aguas cristalinas.",
        "highlights": [
          "Tobogán natural de piedra de 30 m",
          "Poza profunda para nadar",
          "Puente colgante de madera",
          "Parada obligada de senderistas"
        ],
        "ecoTip": "Deslízate sentado y revisa la profundidad del agua.",
        "specs": {
          "distance": "3,5 km por el sendero de Bonete",
          "duration": "1 h caminando desde Sepituba",
          "elevation": "+120 m",
          "access": "Sendero de Bonete desde Ponta da Sepituba",
          "sea": "No corresponde (agua de río cristalina y refrescante)",
          "structure": "Puente colgante de madera sobre el río y zona natural de pícnic"
        }
      },
      "he": {
        "title": "מפל לאז׳י (Cachoeira da Laje)",
        "subtitle": "מגלשת סלע טבעית באורך 30 מטר ובריכת מים עמוקה",
        "description": "העצירה המפורסמת ביותר בטרק לחוף בונטה. משטח סלע גרניט חלק משמש כמגלשת מים טבעית ענקית הנשפכת לתוך בריכת מים צלולים ומרעננים.",
        "highlights": [
          "מגלשת סלע טבעית באורך 30 מטר",
          "בריכת מים עמוקה לשחייה",
          "גשר תלוי מעל הנהר",
          "תחנת מנוחה מושלמת למטיילים"
        ],
        "ecoTip": "התגלשו בישיבה בלבד ובדקו את עומק המים לפני קפיצה.",
        "specs": {
          "distance": "3.5 ק״מ בשביל Bonete",
          "duration": "שעת הליכה מ-Sepituba",
          "elevation": "+120 מ׳",
          "access": "שביל Bonete מ-Ponta da Sepituba",
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
    "rating": 4.8,
    "reviews": 360,
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
      "distance": "100m da entrada (estrada de Castelhanos)",
      "duration": "5 min de caminhada",
      "elevation": "Fácil",
      "access": "Início da Estrada de Castelhanos (bairro Reino)",
      "sea": "Não se aplica (Tobogã de pedra e duchas naturais)",
      "structure": "Alambique histórico, restaurante, banheiros, estacionamento e duchas"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Toca",
        "subtitle": "Tobogã natural de 50 metros, gruta e alambique centenário",
        "description": "Uma das atrações históricas e divertidas mais famosas da ilha. Conta com um tobogã de pedra natural de 50 metros, gruta sob a cachoeira e visitação ao alambique tradicional de cachaça da Toca.",
        "highlights": [
          "Tobogã de pedra super emocionante de 50m",
          "Gruta natural da Toca",
          "Degustação no alambique histórico",
          "Estrutura completa com restaurante e banheiros"
        ],
        "ecoTip": "Propriedade privada preservada com taxa simbólica de manutenção.",
        "specs": {
          "distance": "100m da entrada (estrada de Castelhanos)",
          "duration": "5 min de caminhada",
          "elevation": "Fácil",
          "access": "Início da Estrada de Castelhanos (bairro Reino)",
          "sea": "Não se aplica (Tobogã de pedra e duchas naturais)",
          "structure": "Alambique histórico, restaurante, banheiros, estacionamento e duchas"
        }
      },
      "en": {
        "title": "Toca Waterfall (Cachoeira da Toca)",
        "subtitle": "160-foot natural water slide, grotto, and historic distillery",
        "description": "One of the most famous historic attractions in Ilhabela. Features an exhilarating 50-meter natural granite slide, a rock grotto beneath the cascade, and an artisanal sugar-cane distillery.",
        "highlights": [
          "Thrilling 50-meter natural rock slide",
          "Natural cavern grotto",
          "Artisanal cachaça tasting",
          "Full family amenities & restaurant"
        ],
        "ecoTip": "Preserved private reserve with a nominal maintenance entrance fee.",
        "specs": {
          "distance": "100 m from the entrance (Castelhanos road)",
          "duration": "5 min walk",
          "elevation": "Easy",
          "access": "Start of Estrada de Castelhanos (Reino neighborhood)",
          "sea": "Not applicable (rock slide and natural showers)",
          "structure": "Historic distillery, restaurant, toilets, parking and showers"
        }
      },
      "fr": {
        "title": "Cascade da Toca",
        "subtitle": "Toboggan naturel de 50 mètres, grotte et distillerie historique",
        "description": "Une attraction incontournable mêlant fun et patrimoine. Grand toboggan rocheux naturel, grotte sous la cascade et visite d une distillerie artisanale de cachaça.",
        "highlights": [
          "Toboggan naturel palpitant de 50 m",
          "Grotte naturelle de la Toca",
          "Dégustation à la distillerie historique",
          "Infrastructures complètes et restaurant"
        ],
        "ecoTip": "Réserve privée avec petit droit d entrée pour l entretien du site.",
        "specs": {
          "distance": "100 m de l’entrée (route de Castelhanos)",
          "duration": "5 min de marche",
          "elevation": "Facile",
          "access": "Début de Estrada de Castelhanos (quartier Reino)",
          "sea": "Sans objet (toboggan rocheux et douches naturelles)",
          "structure": "Distillerie historique, restaurant, toilettes, parking et douches"
        }
      },
      "es": {
        "title": "Cascada da Toca",
        "subtitle": "Tobogán natural de 50 metros, gruta y destilería histórica",
        "description": "Una de las atracciones más divertidas e históricas. Cuenta con un tobogán de piedra de 50 metros, gruta natural y visita a la destilería de cachaça tradicional.",
        "highlights": [
          "Emocionante tobogán de roca de 50 m",
          "Gruta natural bajo la cascada",
          "Degustación en el alambique tradicional",
          "Restaurante y servicios completos"
        ],
        "ecoTip": "Propiedad privada con tarifa simbólica para conservación.",
        "specs": {
          "distance": "100 m de la entrada (carretera de Castelhanos)",
          "duration": "5 min caminando",
          "elevation": "Fácil",
          "access": "Inicio de Estrada de Castelhanos (barrio Reino)",
          "sea": "No corresponde (tobogán de piedra y duchas naturales)",
          "structure": "Destilería histórica, restaurante, baños, estacionamiento y duchas"
        }
      },
      "he": {
        "title": "מפל טוקה (Cachoeira da Toca)",
        "subtitle": "מגלשת סלע ענקית באורך 50 מטר, מערה ומזקקה היסטורית",
        "description": "אחת האטרקציות המהנות וההיסטוריות באיליאבלה. כולל מגלשת סלע טבעית באורך 50 מטר, מערה מתחת למפל וטעימות במזקקת קשאסה מסורתית.",
        "highlights": [
          "מגלשת סלע טבעית ומרגשת באורך 50 מטר",
          "מערת סלעים טבעית",
          "טעימות במזקקה היסטורית",
          "מסעדה ושירותים מסודרים לכל המשפחה"
        ],
        "ecoTip": "שמורה פרטית מטופחת עם דמי כניסה סמליים לתחזוקה.",
        "specs": {
          "distance": "100 מ׳ מהכניסה (כביש Castelhanos)",
          "duration": "5 דקות הליכה",
          "elevation": "קל",
          "access": "תחילת Estrada de Castelhanos (שכונת Reino)",
          "sea": "לא רלוונטי (מגלשת סלע ומקלחות טבעיות)",
          "structure": "מזקקה היסטורית, מסעדה, שירותים, חניה ומקלחות"
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
    "rating": 4.8,
    "reviews": 180,
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
    "rating": 4.9,
    "reviews": 390,
    "image": "assets/images/cachoeira-do-paqueta_1.jpg",
    "tags": [
      "Piscina Infinita",
      "Vista para o Mar",
      "Trilha Média",
      "Bordegol"
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
      "access": "Início no bairro do Bexiga (lado sul), subida em trilha",
      "sea": "Não se aplica (Água doce de nascente gelada e revigorante)",
      "structure": "Sem estrutura comercial no topo; natureza 100% nativa"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira do Paquetá",
        "subtitle": "A famosa piscina de borda infinita natural com vista para o oceano",
        "description": "Composta por três níveis de quedas d água, Paquetá é mundialmente conhecida pelo poço superior que forma uma piscina infinita de pedra suspensa sobre o canal de São Sebastião.",
        "highlights": [
          "Piscina infinita natural suspensa",
          "Vista panorâmica do pôr do sol",
          "Hidromassagem natural na queda intermediária",
          "Águas cristalinas da serra"
        ],
        "ecoTip": "Cuidado nas pedras molhadas pois são escorregadias.",
        "specs": {
          "distance": "1.2 km (trilha)",
          "duration": "30 min de caminhada",
          "elevation": "+150m",
          "access": "Início no bairro do Bexiga (lado sul), subida em trilha",
          "sea": "Não se aplica (Água doce de nascente gelada e revigorante)",
          "structure": "Sem estrutura comercial no topo; natureza 100% nativa"
        }
      },
      "en": {
        "title": "Paquetá Waterfall",
        "subtitle": "Natural infinity pool overlooking the open ocean",
        "description": "Featuring three breathtaking tiers of cascades, Paquetá is famous for its top pool that forms a natural stone infinity ledge floating above the ocean channel.",
        "highlights": [
          "Natural infinity pool ledge",
          "Sunset ocean vista",
          "Natural hydromassage plunge pools",
          "Pristine rainforest mountain water"
        ],
        "ecoTip": "Rocks can be slippery. Tread carefully.",
        "specs": {
          "distance": "1.2 km (trail)",
          "duration": "30 min walk",
          "elevation": "+150 m",
          "access": "Starts in Bexiga (south side), uphill trail",
          "sea": "Not applicable (cold, invigorating spring water)",
          "structure": "No commercial facilities at the top; entirely native nature"
        }
      },
      "fr": {
        "title": "Cascade do Paquetá",
        "subtitle": "Piscine naturelle à débordement avec vue sur l océan",
        "description": "Composée de trois cascades successives, Paquetá est célèbre pour son bassin supérieur formant une piscine à débordement naturelle suspendue au-dessus du canal.",
        "highlights": [
          "Piscine naturelle à débordement",
          "Vue imprenable sur le coucher de soleil",
          "Bassin d hydromassage naturel",
          "Eaux pures des montagnes"
        ],
        "ecoTip": "Attention aux roches glissantes.",
        "specs": {
          "distance": "1,2 km (sentier)",
          "duration": "30 min de marche",
          "elevation": "+150 m",
          "access": "Départ du quartier Bexiga (sud), montée par sentier",
          "sea": "Sans objet (eau de source froide et revigorante)",
          "structure": "Aucun équipement commercial au sommet ; nature entièrement indigène"
        }
      },
      "es": {
        "title": "Cascada do Paquetá",
        "subtitle": "Piscina de borde infinito natural con vista al mar",
        "description": "Compuesta por tres niveles de caídas de agua, destaca por su poza superior que forma una increíble piscina infinita de piedra con vistas al canal.",
        "highlights": [
          "Piscina infinita natural",
          "Vista panorámica al mar y puesta de sol",
          "Hidromasaje natural entre rocas",
          "Agua de vertiente cristalina"
        ],
        "ecoTip": "Camina con cuidado sobre las rocas húmedas.",
        "specs": {
          "distance": "1,2 km (sendero)",
          "duration": "30 min caminando",
          "elevation": "+150 m",
          "access": "Inicio en Bexiga (lado sur), subida por sendero",
          "sea": "No corresponde (agua de manantial fría y revitalizante)",
          "structure": "Sin infraestructura comercial arriba; naturaleza totalmente nativa"
        }
      },
      "he": {
        "title": "מפל פאקטה (Cachoeira do Paquetá)",
        "subtitle": "בריכת אינסוף טבעית עם נוף מרהיב לאוקיינוס",
        "description": "מפל בעל 3 מדרגות מים, כאשר המדרגה העליונה יוצרת בריכת אינסוף טבעית תלויה בין הסלעים עם נוף פנורמי מרהיב לשקיעה.",
        "highlights": [
          "בריכת אינסוף טבעית בסלע",
          "נוף שקיעה פנורמי מעל הים",
          "זרמי מים לג׳קוזי טבעי",
          "מים צלולים ממעיינות ההר"
        ],
        "ecoTip": "הסלעים חלקים, יש ללכת בזהירות.",
        "specs": {
          "distance": "1.2 ק״מ (שביל)",
          "duration": "30 דקות הליכה",
          "elevation": "+150 מ׳",
          "access": "תחילה בשכונת Bexiga (דרום), עלייה בשביל",
          "sea": "לא רלוונטי (מי מעיין קרים ומרעננים)",
          "structure": "ללא תשתיות מסחריות למעלה; טבע מקומי לחלוטין"
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
    "rating": 4.9,
    "reviews": 310,
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
      "distance": "2 km a partir de Castelhanos",
      "duration": "45 min de caminhada",
      "elevation": "+90m",
      "access": "Início no canto esquerdo da Baía de Castelhanos",
      "sea": "Não se aplica (Queda de 40 metros em meio à floresta)",
      "structure": "Sem estrutura; trilha sinalizada com passarelas e pontes de madeira suspensas"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira do Gato",
        "subtitle": "Imponente queda de 40 metros na Baía de Castelhanos",
        "description": "Uma das maiores e mais volumosas quedas d água de Ilhabela. A trilha parte da praia de Castelhanos e cruza passarelas suspensas cercadas por samambaias gigantes e árvores centenárias.",
        "highlights": [
          "Queda colossal de 40 metros",
          "Poço amplo para banho refrescante",
          "Trilha com pontes suspensas",
          "Observação de aves raras"
        ],
        "ecoTip": "Trilha dentro do Parque Estadual. Mantenha-se na rota demarcada.",
        "specs": {
          "distance": "2 km a partir de Castelhanos",
          "duration": "45 min de caminhada",
          "elevation": "+90m",
          "access": "Início no canto esquerdo da Baía de Castelhanos",
          "sea": "Não se aplica (Queda de 40 metros em meio à floresta)",
          "structure": "Sem estrutura; trilha sinalizada com passarelas e pontes de madeira suspensas"
        }
      },
      "en": {
        "title": "Cat Waterfall (Cachoeira do Gato)",
        "subtitle": "Magnificent 130-foot cascade in Castelhanos Bay",
        "description": "One of the tallest and most powerful waterfalls on the island. The trail starts from Castelhanos beach, passing wooden bridges and giant ferns in the heart of primary rainforest.",
        "highlights": [
          "Colossal 40-meter waterfall",
          "Large refreshing swimming pool",
          "Scenic suspension bridge paths",
          "Rare tropical birdwatching"
        ],
        "ecoTip": "State Park protected zone. Stay on marked trails.",
        "specs": {
          "distance": "2 km from Castelhanos",
          "duration": "45 min walk",
          "elevation": "+90 m",
          "access": "Starts at the left end of Baía de Castelhanos",
          "sea": "Not applicable (40 m waterfall in the forest)",
          "structure": "No facilities; marked trail with walkways and suspended wooden bridges"
        }
      },
      "fr": {
        "title": "Cascade du Chat (Cachoeira do Gato)",
        "subtitle": "Majestueuse chute de 40 mètres à Castelhanos",
        "description": "L une des plus hautes cascades d Ilhabela. Le sentier commence à la baie de Castelhanos et traverse des ponts suspendus sous une canopée tropicale luxuriante.",
        "highlights": [
          "Chute monumentale de 40 mètres",
          "Grand bassin pour une baignade vivifiante",
          "Passerelles en bois suspendues",
          "Observation d oiseaux tropicaux"
        ],
        "ecoTip": "Zone protégée du Parc d État. Restez sur le sentier balisé.",
        "specs": {
          "distance": "2 km depuis Castelhanos",
          "duration": "45 min de marche",
          "elevation": "+90 m",
          "access": "Départ à l’extrémité gauche de Baía de Castelhanos",
          "sea": "Sans objet (cascade de 40 m au cœur de la forêt)",
          "structure": "Sans équipements ; sentier balisé avec passerelles et ponts suspendus en bois"
        }
      },
      "es": {
        "title": "Cascada do Gato",
        "subtitle": "Imponente caída de 40 metros en Castelhanos",
        "description": "Una de las cascadas más grandes y caudalosas de la isla. El sendero parte desde la playa de Castelhanos a través de puentes colgantes rodeados de selva virgen.",
        "highlights": [
          "Impresionante caída de 40 metros",
          "Poza profunda para nadar",
          "Sendero con puentes de madera",
          "Avistamiento de aves silvestres"
        ],
        "ecoTip": "Zona del Parque Estatal. Respeta el sendero marcado y no dejes basura.",
        "specs": {
          "distance": "2 km desde Castelhanos",
          "duration": "45 min caminando",
          "elevation": "+90 m",
          "access": "Inicio en el extremo izquierdo de Baía de Castelhanos",
          "sea": "No corresponde (cascada de 40 m en el bosque)",
          "structure": "Sin infraestructura; sendero señalizado con pasarelas y puentes colgantes de madera"
        }
      },
      "he": {
        "title": "מפל החתול (Cachoeira do Gato)",
        "subtitle": "מפל מים שוצף בגובה 40 מטר במפרץ קסטליאנוס",
        "description": "אחד המפלים הגבוהים והמרשימים ביותר באיליאבלה. המסלול יוצא ישירות מחוף קסטליאנוס ועובר דרך גשרי עץ תלויים בתוך יער גשם בתולי.",
        "highlights": [
          "מפל ענק בגובה 40 מטר",
          "בריכת שחייה טבעית גדולה ומרעננת",
          "גשרים תלויים וצמחייה טרופית",
          "תצפיות על ציפורים נדירות"
        ],
        "ecoTip": "שמורה מוגנת בפארק הלאומי. הישארו בשבילים המסומנים.",
        "specs": {
          "distance": "2 ק״מ מ-Castelhanos",
          "duration": "45 דקות הליכה",
          "elevation": "+90 מ׳",
          "access": "תחילה בקצה השמאלי של Baía de Castelhanos",
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
    "rating": 4.7,
    "reviews": 265,
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
      "difficulty": "easy",
      "distance": "400m de caminhada leve",
      "duration": "10 min",
      "elevation": "+30m",
      "access": "Acesso asfaltado próximo à Praia da Feiticeira",
      "sea": "Não se aplica (Três quedas e duchas naturais)",
      "structure": "Estacionamento próximo e passarela inicial de madeira"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira dos Três Tombos",
        "subtitle": "Perfeita para famílias, crianças e banho de ducha natural",
        "description": "Composta por 3 quedas distintas a poucos metros uma da outra. A primeira queda conta com um poço amplo de águas calmas e uma ducha natural de fácil acesso para todas as idades.",
        "highlights": [
          "Acesso super fácil e rápido",
          "Ótima para crianças e idosos",
          "Ducha natural sob a queda d água",
          "Poço raso e seguro"
        ],
        "ecoTip": "Ideal para um mergulho refrescante após um dia de praia na Feiticeira.",
        "specs": {
          "distance": "400m de caminhada leve",
          "duration": "10 min",
          "elevation": "+30m",
          "access": "Acesso asfaltado próximo à Praia da Feiticeira",
          "sea": "Não se aplica (Três quedas e duchas naturais)",
          "structure": "Estacionamento próximo e passarela inicial de madeira"
        }
      },
      "en": {
        "title": "Três Tombos Waterfall",
        "subtitle": "Family-friendly triple cascades with natural massage showers",
        "description": "Features three separate falls within short walking distance. The main pool is shallow, safe, and easily accessible for families with children and seniors.",
        "highlights": [
          "Very easy and short walk",
          "Safe for kids and all ages",
          "Natural invigorating shower cascade",
          "Calm and shallow pool"
        ],
        "ecoTip": "Great refreshing stop right next to Feiticeira beach.",
        "specs": {
          "distance": "400 m easy walk",
          "duration": "10 min",
          "elevation": "+30 m",
          "access": "Paved access near Praia da Feiticeira",
          "sea": "Not applicable (three waterfalls and natural showers)",
          "structure": "Nearby parking and an initial wooden walkway"
        }
      },
      "fr": {
        "title": "Cascade des Trois Tombos",
        "subtitle": "Idéale pour les familles et douche naturelle sous la chute",
        "description": "Composée de 3 cascades successives très faciles d accès. Le premier bassin peu profond permet une baignade en toute sécurité pour petits et grands.",
        "highlights": [
          "Accès très facile et rapide",
          "Parfait pour enfants et seniors",
          "Massage naturel sous la cascade",
          "Bassin calme et peu profond"
        ],
        "ecoTip": "Parfait pour se rafraîchir après la plage de Feiticeira.",
        "specs": {
          "distance": "400 m de marche facile",
          "duration": "10 min",
          "elevation": "+30 m",
          "access": "Accès goudronné près de Praia da Feiticeira",
          "sea": "Sans objet (trois cascades et douches naturelles)",
          "structure": "Parking à proximité et passerelle initiale en bois"
        }
      },
      "es": {
        "title": "Cascada de los Tres Tombos",
        "subtitle": "Ideal para familias con duchas naturales refrescantes",
        "description": "Compuesta por 3 caídas sucesivas a pasos de la entrada. Su poza principal es poco profunda y segura, ideal para relajarse bajo el chorro de agua natural.",
        "highlights": [
          "Acceso fácil y muy corto",
          "Apta para todas las edades",
          "Ducha natural relajante",
          "Poza segura y tranquila"
        ],
        "ecoTip": "Excelente parada después de disfrutar la playa da Feiticeira.",
        "specs": {
          "distance": "400 m de caminata fácil",
          "duration": "10 min",
          "elevation": "+30 m",
          "access": "Acceso asfaltado cerca de Praia da Feiticeira",
          "sea": "No corresponde (tres cascadas y duchas naturales)",
          "structure": "Estacionamiento cercano y pasarela inicial de madera"
        }
      },
      "he": {
        "title": "מפל שלושת השלבים (Cachoeira dos Três Tombos)",
        "subtitle": "מושלם למשפחות עם ילדים ורחצה מרעננת",
        "description": "שלושה מפלים סמוכים במרחק הליכה קצרה וקלה ביותר. הבריכה הראשונה רדודה, בטוחה וכוללת מקלחת מים טבעית מושלמת לכל המשפחה.",
        "highlights": [
          "הגעה קלה ומהירה של 10 דקות",
          "מתאים ביותר לילדים ולכל גיל",
          "מקלחת מים טבעית",
          "בריכה רדודה ובטוחה"
        ],
        "ecoTip": "מומלץ לשלב עצירה מרעננת לאחר ביקור בחוף פייטיסיירה.",
        "specs": {
          "distance": "400 מ׳ של הליכה קלה",
          "duration": "10 דקות",
          "elevation": "+30 מ׳",
          "access": "גישה סלולה ליד Praia da Feiticeira",
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
    "rating": 4.8,
    "reviews": 140,
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
      "difficulty": "moderate",
      "distance": "1.5 km (trilha)",
      "duration": "35 min",
      "elevation": "+140m",
      "access": "Início no bairro da Praia da Siriúba (norte)",
      "sea": "Não se aplica (Ducha natural sobre rochas com vista do canal)",
      "structure": "Trilha nativa entre bambuzais e mata atlântica"
    },
    "translations": {
      "pt": {
        "title": "Cachoeira da Friagem",
        "subtitle": "Ducha natural refrescante no norte com vista do canal de São Sebastião",
        "description": "Localizada no norte da ilha a partir da Siriúba, a trilha sobe em meio a bambuzais até uma queda de 25 metros que se despenha sobre pedras lisas com vista para o canal.",
        "highlights": [
          "Vista panorâmica do canal de São Sebastião",
          "Ducha natural revigorante",
          "Trilha sombreada e fresca",
          "Pouco movimentada e privativa"
        ],
        "ecoTip": "Traga água potável e use repelente.",
        "specs": {
          "distance": "1.5 km (trilha)",
          "duration": "35 min",
          "elevation": "+140m",
          "access": "Início no bairro da Praia da Siriúba (norte)",
          "sea": "Não se aplica (Ducha natural sobre rochas com vista do canal)",
          "structure": "Trilha nativa entre bambuzais e mata atlântica"
        }
      },
      "en": {
        "title": "Friagem Waterfall (Cachoeira da Friagem)",
        "subtitle": "Northern mountain shower cascade with sea channel views",
        "description": "Located in the north near Siriúba, this serene trail ascends through lush bamboo groves to a 80-foot cascade spilling over granite rocks with panoramic coastal views.",
        "highlights": [
          "Panoramic sea channel vista",
          "Invigorating natural power shower",
          "Shaded cool bamboo trail",
          "Quiet and private atmosphere"
        ],
        "ecoTip": "Bring drinking water and insect repellent.",
        "specs": {
          "distance": "1.5 km (trail)",
          "duration": "35 min",
          "elevation": "+140 m",
          "access": "Starts in the Praia da Siriúba neighborhood (north)",
          "sea": "Not applicable (natural shower over rocks overlooking the channel)",
          "structure": "Native trail through bamboo groves and Atlantic Forest"
        }
      },
      "fr": {
        "title": "Cascade da Friagem",
        "subtitle": "Douche naturelle rafraîchissante avec vue sur le canal marin",
        "description": "Située au nord près de Siriúba, le sentier monte à travers les bambous vers une chute de 25 mètres offrant une vue splendide sur le canal.",
        "highlights": [
          "Vue panoramique sur le canal",
          "Douche naturelle énergisante",
          "Sentier ombragé agréable",
          "Site calme et peu fréquenté"
        ],
        "ecoTip": "Prévoyez de l eau et un répulsif.",
        "specs": {
          "distance": "1,5 km (sentier)",
          "duration": "35 min",
          "elevation": "+140 m",
          "access": "Départ du quartier Praia da Siriúba (nord)",
          "sea": "Sans objet (douche naturelle sur les rochers avec vue sur le canal)",
          "structure": "Sentier naturel entre bambouseraies et forêt atlantique"
        }
      },
      "es": {
        "title": "Cascada da Friagem",
        "subtitle": "Ducha natural refrescante con vistas panorámicas al canal",
        "description": "Ubicada en el norte de la isla, el sendero sube entre cañaverales de bambú hasta una caída de 25 metros con vistas al mar.",
        "highlights": [
          "Vista panorámica al canal de São Sebastião",
          "Ducha natural revitalizante",
          "Sendero fresco con sombra",
          "Ambiente tranquilo y privado"
        ],
        "ecoTip": "Lleva agua y repelente.",
        "specs": {
          "distance": "1,5 km (sendero)",
          "duration": "35 min",
          "elevation": "+140 m",
          "access": "Inicio en el barrio Praia da Siriúba (norte)",
          "sea": "No corresponde (ducha natural sobre rocas con vista al canal)",
          "structure": "Sendero natural entre bambúes y Mata Atlántica"
        }
      },
      "he": {
        "title": "מפל פריאז׳ם (Cachoeira da Friagem)",
        "subtitle": "מפל מים מרענן בצפון האי עם נוף פנורמי לתעלת הים",
        "description": "ממוקם בצפון האי מעל חוף סיריאובה. המסלול עולה בין עצי חזרן (במבוק) אל מפל בגובה 25 מטר הנשפך על סלעי גרניט ומשקיף אל הים.",
        "highlights": [
          "נוף פנורמי אל תעלת הים",
          "מקלחת מים טבעית ממריצה",
          "שביל מוצל וקריר",
          "אתר שקט ואינטימי"
        ],
        "ecoTip": "קחו מים לשתייה וחומר דוחה יתושים.",
        "specs": {
          "distance": "1.5 ק״מ (שביל)",
          "duration": "35 דקות",
          "elevation": "+140 מ׳",
          "access": "תחילה בשכונת Praia da Siriúba (צפון)",
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
    "rating": 4.8,
    "reviews": 290,
    "image": "assets/images/trilha-da-agua-branca_1.jpg",
    "tags": [
      "Auto-guiada",
      "Birdwatching",
      "Poços para Banho",
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
      "distance": "2.2 km (circuito estruturado)",
      "duration": "1h30 a 2h",
      "elevation": "+80m",
      "access": "Guarita do Parque Estadual de Ilhabela (Estrada de Castelhanos)",
      "sea": "Não se aplica (5 poços naturais e cachoeiras de água cristalina)",
      "structure": "Centro de visitantes, banheiros, torres de observação de aves e passarelas"
    },
    "translations": {
      "pt": {
        "title": "Trilha da Água Branca",
        "subtitle": "Trilha estruturada do Parque Estadual com 5 poços e birdwatching",
        "description": "A trilha mais acessível e educativa de Ilhabela. Conta com passarelas, placas de interpretação botânica, torres para observação de aves e cinco poços naturais cristalinos para banho.",
        "highlights": [
          "5 poços naturais de águas límpidas",
          "Torres para observação de aves (Birdwatching)",
          "Excelente para crianças e famílias",
          "Centro de visitantes do Parque Estadual"
        ],
        "ecoTip": "Excelente opção para dias nublados ou para caminhadas leves com crianças.",
        "specs": {
          "distance": "2.2 km (circuito estruturado)",
          "duration": "1h30 a 2h",
          "elevation": "+80m",
          "access": "Guarita do Parque Estadual de Ilhabela (Estrada de Castelhanos)",
          "sea": "Não se aplica (5 poços naturais e cachoeiras de água cristalina)",
          "structure": "Centro de visitantes, banheiros, torres de observação de aves e passarelas"
        }
      },
      "en": {
        "title": "Água Branca State Park Trail",
        "subtitle": "Educational nature trail with 5 natural plunge pools & birding towers",
        "description": "The most accessible and family-friendly trail on the island. Features raised wooden walkways, botanical interpretation signs, birdwatching observation towers, and five crystal pools.",
        "highlights": [
          "5 pristine natural swimming holes",
          "Birdwatching canopy towers",
          "Perfect for children and families",
          "State Park visitor center amenities"
        ],
        "ecoTip": "Ideal for cloudy days or gentle family rainforest walks.",
        "specs": {
          "distance": "2.2 km (developed circuit)",
          "duration": "1 h 30 min–2 h",
          "elevation": "+80 m",
          "access": "Ilhabela State Park checkpoint (Estrada de Castelhanos)",
          "sea": "Not applicable (5 natural pools and clear-water waterfalls)",
          "structure": "Visitor center, toilets, birdwatching towers and walkways"
        }
      },
      "fr": {
        "title": "Sentier d Água Branca",
        "subtitle": "Sentier éducatif du parc avec 5 vasques et tours d observation",
        "description": "Le sentier le plus accessible d Ilhabela. Aménagé avec des passerelles en bois, des tours d observation d oiseaux et cinq bassins naturels cristallins pour la baignade.",
        "highlights": [
          "5 bassins naturels d eau pure",
          "Tours d observation ornithologique",
          "Parfait pour les familles et enfants",
          "Centre d accueil du Parc d État"
        ],
        "ecoTip": "Idéal pour une sortie nature facile en famille.",
        "specs": {
          "distance": "2,2 km (circuit aménagé)",
          "duration": "1 h 30 à 2 h",
          "elevation": "+80 m",
          "access": "Poste du parc d’État d’Ilhabela (Estrada de Castelhanos)",
          "sea": "Sans objet (5 bassins naturels et cascades cristallines)",
          "structure": "Centre d’accueil, toilettes, tours d’observation des oiseaux et passerelles"
        }
      },
      "es": {
        "title": "Sendero de Água Branca",
        "subtitle": "Sendero educativo del Parque con 5 pozas y torres de aves",
        "description": "El sendero más accesible y educativo de la isla. Cuenta con pasarelas de madera, señalización botánica, miradores de aves y cinco pozas cristalinas para bañarse.",
        "highlights": [
          "5 pozas naturales de agua cristalina",
          "Torres de observación de aves",
          "Ideal para familias y niños",
          "Centro de visitantes del Parque"
        ],
        "ecoTip": "Opción perfecta para caminatas familiares relajadas.",
        "specs": {
          "distance": "2,2 km (circuito acondicionado)",
          "duration": "1 h 30 min a 2 h",
          "elevation": "+80 m",
          "access": "Puesto del Parque Estatal de Ilhabela (Estrada de Castelhanos)",
          "sea": "No corresponde (5 pozas naturales y cascadas de agua cristalina)",
          "structure": "Centro de visitantes, baños, torres de observación de aves y pasarelas"
        }
      },
      "he": {
        "title": "שביל אגואה ברנקה (Trilha da Água Branca)",
        "subtitle": "שביל טבע מוסדר בפארק הלאומי עם 5 בריכות ומגדלי צפרות",
        "description": "השביל הנגיש והנוח ביותר באי למשפחות. כולל שבילי עץ מסודרים, מגדלי תצפית על ציפורים טרופיות ו-5 בריכות מים טבעיות וצלולות לרחצה.",
        "highlights": [
          "5 בריכות מים טבעיות ומרעננות",
          "מגדלי תצפית על ציפורים",
          "מושלם למשפחות עם ילדים",
          "מרכז מבקרים של הפארק הלאומי"
        ],
        "ecoTip": "אפשרות מצוינת לטיול משפחתי קליל ומהנה בטבע.",
        "specs": {
          "distance": "2.2 ק״מ (מסלול מוסדר)",
          "duration": "שעה וחצי עד שעתיים",
          "elevation": "+80 מ׳",
          "access": "עמדת פארק המדינה של Ilhabela (Estrada de Castelhanos)",
          "sea": "לא רלוונטי (5 בריכות טבעיות ומפלים צלולים)",
          "structure": "מרכז מבקרים, שירותים, מגדלי צפרות ומעברים"
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
    "rating": 4.9,
    "reviews": 350,
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
      "distance": "12 km (só ida)",
      "duration": "4h30 a 5h30",
      "elevation": "+380m acumulados",
      "access": "Início na Ponta da Sepituba (extremo sul da ilha)",
      "sea": "Deságua na fantástica Praia do Bonete",
      "structure": "Trilha rústica com pontes e paradas na Cachoeira da Laje e Areado"
    },
    "translations": {
      "pt": {
        "title": "Trilha Tradicional do Bonete",
        "subtitle": "A travessia clássica de 12 km pela Mata Atlântica até a praia isolada",
        "description": "Uma das trilhas mais clássicas do ecoturismo brasileiro. Corta a densa floresta costeira, atravessando três cachoeiras com poços cristalinos antes de revelar a majestosa Praia do Bonete.",
        "highlights": [
          "Parada para banho na Cachoeira da Laje",
          "Cachoeira do Areado com praia de rio",
          "Vista do mirante costeiro",
          "Chegada triunfal ao Bonete"
        ],
        "ecoTip": "Contrate um guia local credenciado para apoio, segurança e relatos da história caiçara.",
        "specs": {
          "distance": "12 km (só ida)",
          "duration": "4h30 a 5h30",
          "elevation": "+380m acumulados",
          "access": "Início na Ponta da Sepituba (extremo sul da ilha)",
          "sea": "Deságua na fantástica Praia do Bonete",
          "structure": "Trilha rústica com pontes e paradas na Cachoeira da Laje e Areado"
        }
      },
      "en": {
        "title": "Bonete Classic Rainforest Trail",
        "subtitle": "The iconic 7.5-mile trek through pristine rainforest to an isolated paradise",
        "description": "One of Brazil most famous coastal hiking trails. Traverses deep Atlantic jungle, crossing three stunning river cascades before descending onto remote Bonete Beach.",
        "highlights": [
          "Natural slide at Laje Waterfall",
          "Areado river beach stop",
          "Dramatic coastal ocean viewpoints",
          "Triumphant arrival at Bonete Beach"
        ],
        "ecoTip": "Hiring a certified local guide ensures safety and enriches your trip with native caiçara lore.",
        "specs": {
          "distance": "12 km (one way)",
          "duration": "4 h 30 min–5 h 30 min",
          "elevation": "+380 m cumulative ascent",
          "access": "Starts at Ponta da Sepituba (far south of the island)",
          "sea": "Ends at spectacular Praia do Bonete",
          "structure": "Rustic trail with bridges and stops at Cachoeira da Laje and Areado"
        }
      },
      "fr": {
        "title": "Sentier Traditionnel do Bonete",
        "subtitle": "La grande traversée de 12 km à travers la forêt tropicale",
        "description": "Une randonnée légendaire de l écotourisme brésilien. Elle serpente à travers la forêt dense, franchissant trois cascades limpides avant d atteindre la plage sauvage de Bonete.",
        "highlights": [
          "Baignade à la cascade da Laje",
          "Halte à la cascade do Areado",
          "Vues spectaculaires sur l océan",
          "Arrivée magique au village caiçara"
        ],
        "ecoTip": "L accompagnement par un guide certifié est vivement recommandé pour votre sécurité.",
        "specs": {
          "distance": "12 km (aller simple)",
          "duration": "4 h 30 à 5 h 30",
          "elevation": "+380 m de dénivelé cumulé",
          "access": "Départ à Ponta da Sepituba (extrême sud de l’île)",
          "sea": "Débouche sur la superbe Praia do Bonete",
          "structure": "Sentier rustique avec ponts et arrêts à Cachoeira da Laje et Areado"
        }
      },
      "es": {
        "title": "Sendero Tradicional do Bonete",
        "subtitle": "La travesía clásica de 12 km por la selva hasta la playa aislada",
        "description": "Una de las caminatas más famosas de Brasil. Atraviesa la selva atlántica costera cruzando tres cascadas cristalinas antes de llegar a la increíble playa de Bonete.",
        "highlights": [
          "Tobogán natural en Cascada da Laje",
          "Playa de río en Cascada do Areado",
          "Miradores sobre el océano",
          "Llegada triunfal a Bonete"
        ],
        "ecoTip": "Se aconseja contratar un guía local certificado para una experiencia segura y enriquecedora.",
        "specs": {
          "distance": "12 km (solo ida)",
          "duration": "4 h 30 min a 5 h 30 min",
          "elevation": "+380 m de ascenso acumulado",
          "access": "Inicio en Ponta da Sepituba (extremo sur de la isla)",
          "sea": "Desemboca en la fantástica Praia do Bonete",
          "structure": "Sendero rústico con puentes y paradas en Cachoeira da Laje y Areado"
        }
      },
      "he": {
        "title": "טרק בונטה הקלאסי (Trilha do Bonete)",
        "subtitle": "מסע של 12 ק״מ ביער הגשם אל אחד החופים המבודדים והיפים בעולם",
        "description": "אחד הטרקים המפורסמים והאהובים בברזיל. המסלול חוצה את יער הגשם העבות, עובר דרך 3 מפלים עם בריכות מים צלולות ומסתיים בחוף בונטה המרהיב.",
        "highlights": [
          "מגלשת סלע טבעית במפל לאז׳י",
          "עצירה במפל אראדו",
          "תצפיות מרהיבות על האוקיינוס",
          "הגעה מרגשת לכפר הדייגים בונטה"
        ],
        "ecoTip": "מומלץ בחום לשכור מדריך מקומי מוסמך לבטיחות ולהכרת סיפורי המקום.",
        "specs": {
          "distance": "12 ק״מ (לכיוון אחד)",
          "duration": "4.5–5.5 שעות",
          "elevation": "+380 מ׳ עלייה מצטברת",
          "access": "תחילה ב-Ponta da Sepituba (הקצה הדרומי של האי)",
          "sea": "מסתיים ב-Praia do Bonete המרהיב",
          "structure": "שביל כפרי עם גשרים ועצירות ב-Cachoeira da Laje וב-Areado"
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
      -23.8806,
      -45.2417
    ],
    "rating": 4.9,
    "reviews": 135,
    "image": "assets/images/trilha-da-cabecuda-farol_1.jpg",
    "tags": [
      "Farol Histórico 1930",
      "Costeira Oceânica",
      "Castelhanos",
      "Vista Aberta"
    ],
    "attributes": {
      "isDiving": false,
      "isSunset": false,
      "isKiosk": false,
      "isWild": true,
      "isFamily": false,
      "isSurf": false,
      "is4x4": true
    },
    "specs": {
      "difficulty": "moderate",
      "distance": "3.8 km a partir do canto leste de Castelhanos",
      "duration": "1h20 de caminhada",
      "elevation": "+130m",
      "access": "A partir da Praia de Castelhanos",
      "sea": "Mar aberto do Atlântico batendo nas imensas falésias rochosas",
      "structure": "Farol centenário da Marinha do Brasil e mirante natural"
    },
    "translations": {
      "pt": {
        "title": "Trilha do Farol da Ponta da Cabeçuda",
        "subtitle": "Caminhada costeira até o farol histórico de 1930 no mar aberto",
        "description": "Partindo da extremidade leste da Baía de Castelhanos, a trilha contorna a costa rochosa atlântica até o imponente Farol da Ponta da Cabeçuda, com vista monumental para o oceano sem fim.",
        "highlights": [
          "Farol histórico da Marinha de 1930",
          "Vista espetacular do mar aberto",
          "Avistamento de aves oceânicas e tartarugas",
          "Sensação incrível de isolamento e imensidão"
        ],
        "ecoTip": "Leve chapéu e protetor solar pois a caminhada costeira tem trechos expostos ao sol.",
        "specs": {
          "distance": "3.8 km a partir do canto leste de Castelhanos",
          "duration": "1h20 de caminhada",
          "elevation": "+130m",
          "access": "A partir da Praia de Castelhanos",
          "sea": "Mar aberto do Atlântico batendo nas imensas falésias rochosas",
          "structure": "Farol centenário da Marinha do Brasil e mirante natural"
        }
      },
      "en": {
        "title": "Cabeçuda Lighthouse Coastal Trail",
        "subtitle": "Scenic ocean hike to the historic 1930 maritime lighthouse",
        "description": "Starting from the eastern tip of Castelhanos Bay, this coastal trail winds along rugged Atlantic cliffs to the iconic 1930 lighthouse, offering boundless ocean panoramas.",
        "highlights": [
          "Historic 1930 navy lighthouse",
          "Dramatic open ocean cliff panoramas",
          "Pelagic seabird and turtle spotting",
          "Unforgettable sense of wild frontier"
        ],
        "ecoTip": "Wear sun protection and a hat for sun-exposed coastal segments.",
        "specs": {
          "distance": "3.8 km from the east end of Castelhanos",
          "duration": "1 h 20 min walk",
          "elevation": "+130 m",
          "access": "From Praia de Castelhanos",
          "sea": "Open Atlantic waters striking immense rocky cliffs",
          "structure": "Century-old Brazilian Navy lighthouse and natural viewpoint"
        }
      },
      "fr": {
        "title": "Sentier du Phare de Ponta da Cabeçuda",
        "subtitle": "Randonnée côtière vers le phare historique de 1930",
        "description": "Au départ de la baie de Castelhanos, ce sentier côtier longe des falaises impressionnantes jusqu au phare maritime de 1930 face à l océan infini.",
        "highlights": [
          "Phare historique de la marine de 1930",
          "Vue grandiose sur le large",
          "Oiseaux marins et tortues",
          "Atmosphère sauvage unique"
        ],
        "ecoTip": "Prévoyez protection solaire et eau en abondance.",
        "specs": {
          "distance": "3,8 km depuis l’extrémité est de Castelhanos",
          "duration": "1 h 20 de marche",
          "elevation": "+130 m",
          "access": "Depuis Praia de Castelhanos",
          "sea": "Mer ouverte de l’Atlantique frappant d’immenses falaises rocheuses",
          "structure": "Phare centenaire de la marine brésilienne et belvédère naturel"
        }
      },
      "es": {
        "title": "Sendero del Faro de Ponta da Cabeçuda",
        "subtitle": "Caminata costera hasta el faro histórico de 1930 frente al océano",
        "description": "Desde el extremo este de Castelhanos, el sendero bordea los acantilados hasta el faro marítimo de 1930 con vistas panorámicas al Atlántico abierto.",
        "highlights": [
          "Faro histórico de la Armada de 1930",
          "Vistas monumentales al mar abierto",
          "Avistamiento de aves marinas",
          "Aventura costera inolvidable"
        ],
        "ecoTip": "Lleva protección solar para tramos despejados.",
        "specs": {
          "distance": "3,8 km desde el extremo este de Castelhanos",
          "duration": "1 h 20 min caminando",
          "elevation": "+130 m",
          "access": "Desde Praia de Castelhanos",
          "sea": "Mar abierto del Atlántico golpeando inmensos acantilados rocosos",
          "structure": "Faro centenario de la Marina de Brasil y mirador natural"
        }
      },
      "he": {
        "title": "טרק המגדלור ההיסטורי של פונטה דה קבסודה",
        "subtitle": "מסלול חופי מרהיב אל מגדלור ימי היסטורי מ-1930 אל מול האוקיינוס",
        "description": "יוצא מחלקו המזרחי של מפרץ קסטליאנוס. השביל עובר לאורך מצוקי חוף מרשימים עד למגדלור היסטורי של חיל הים מ-1930 המשקיף על האוקיינוס הפתוח.",
        "highlights": [
          "מגדלור היסטורי מ-1930",
          "נופי אוקיינוס פתוח עוצרי נשימה",
          "צפייה בעופות ים וצבי ים",
          "תחושת מרחב ופראיות אמיתית"
        ],
        "ecoTip": "הצטיידו בכובע ובקרם הגנה לשטחים החשופים לשמש.",
        "specs": {
          "distance": "3.8 ק״מ מהקצה המזרחי של Castelhanos",
          "duration": "שעה ו-20 דקות הליכה",
          "elevation": "+130 מ׳",
          "access": "מ-Praia de Castelhanos",
          "sea": "מי האוקיינוס האטלנטי הפתוח פוגעים במצוקי סלע עצומים",
          "structure": "מגדלור בן מאה שנה של הצי הברזילאי ותצפית טבעית"
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
    "rating": 5,
    "reviews": 112,
    "image": "assets/images/pico-de-sao-sebastiao_1.jpg",
    "tags": [
      "1.378m - Ponto Mais Alto",
      "Montanhismo",
      "Extremo",
      "Mata Virgem"
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
      "difficulty": "extreme",
      "distance": "14 km (ida e volta)",
      "duration": "8h a 10h de expedição",
      "elevation": "+1.378m (cume mais alto da ilha)",
      "access": "Obrigatório acompanhamento de guia credenciado do Parque Estadual",
      "sea": "Não se aplica (Cume supremo acima das nuvens)",
      "structure": "Área 100% selvagem e protegida"
    },
    "translations": {
      "pt": {
        "title": "Pico de São Sebastião",
        "subtitle": "O ponto culminante de Ilhabela a 1.378 metros de altitude",
        "description": "O cume mais alto de todo o arquipélago de Ilhabela. Uma expedição de montanhismo avançado que cruza a floresta nebular intocada até atingir o topo da ilha, frequentemente acima do mar de nuvens.",
        "highlights": [
          "Ponto mais alto do arquipélago (1.378m)",
          "Florestas nebulares de altitude com orquídeas raras",
          "Vista sem limites para o oceano e continente",
          "A maior conquista de montanha da ilha"
        ],
        "ecoTip": "Expedição extrema de preservação integral. Obrigatório contratar guia credenciado.",
        "specs": {
          "distance": "14 km (ida e volta)",
          "duration": "8h a 10h de expedição",
          "elevation": "+1.378m (cume mais alto da ilha)",
          "access": "Obrigatório acompanhamento de guia credenciado do Parque Estadual",
          "sea": "Não se aplica (Cume supremo acima das nuvens)",
          "structure": "Área 100% selvagem e protegida"
        }
      },
      "en": {
        "title": "São Sebastião Peak (Pico de São Sebastião)",
        "subtitle": "The highest summit in Ilhabela at 4,521 feet (1,378m)",
        "description": "The crowning summit of the entire island. An advanced mountaineering expedition ascending through pristine cloud forests to stand above the clouds with panoramic vistas of the ocean.",
        "highlights": [
          "Highest point on the archipelago (1,378m)",
          "High-altitude cloud rainforest & rare orchids",
          "Boundless views over the Atlantic ocean",
          "The ultimate mountaineering achievement"
        ],
        "ecoTip": "Strict conservation zone. Certified mountain guide required.",
        "specs": {
          "distance": "14 km (round trip)",
          "duration": "8–10 h expedition",
          "elevation": "+1,378 m (island’s highest summit)",
          "access": "An accredited State Park guide is mandatory",
          "sea": "Not applicable (highest summit above the clouds)",
          "structure": "Entirely wild, protected area"
        }
      },
      "fr": {
        "title": "Pic de São Sebastião",
        "subtitle": "Le point culminant d Ilhabela à 1 378 mètres d altitude",
        "description": "Le plus haut sommet de tout l archipel. Une expédition de haute montagne traversant la forêt de nuages jusqu au sommet souvent au-dessus d une mer de brume.",
        "highlights": [
          "Point culminant de l île (1 378 m)",
          "Forêt de nuages et orchidées rares",
          "Vue infinie sur l océan et la côte",
          "Le défi suprême de randonnée"
        ],
        "ecoTip": "Zone de réserve intégrale. Guide certifié obligatoire.",
        "specs": {
          "distance": "14 km (aller-retour)",
          "duration": "8 à 10 h d’expédition",
          "elevation": "+1 378 m (plus haut sommet de l’île)",
          "access": "Accompagnement obligatoire par un guide agréé du parc d’État",
          "sea": "Sans objet (sommet le plus élevé au-dessus des nuages)",
          "structure": "Zone entièrement sauvage et protégée"
        }
      },
      "es": {
        "title": "Pico de São Sebastião",
        "subtitle": "El punto más alto de Ilhabela a 1.378 metros de altitud",
        "description": "La cumbre máxima de la isla. Una expedición de montañismo avanzado que asciende por bosques de niebla vírgenes hasta superar las nubes con vistas panorámicas únicas.",
        "highlights": [
          "Punto más alto del archipiélago (1.378 m)",
          "Bosque de niebla con orquídeas endémicas",
          "Vistas espectaculares sobre el océano",
          "La mayor conquista de montaña"
        ],
        "ecoTip": "Zona de máxima protección. Guía certificado obligatorio.",
        "specs": {
          "distance": "14 km (ida y vuelta)",
          "duration": "8 a 10 h de expedición",
          "elevation": "+1.378 m (cumbre más alta de la isla)",
          "access": "Acompañamiento obligatorio de guía acreditado del Parque Estatal",
          "sea": "No corresponde (cumbre más alta sobre las nubes)",
          "structure": "Zona totalmente salvaje y protegida"
        }
      },
      "he": {
        "title": "פסגת סאו סבסטיאו (Pico de São Sebastião)",
        "subtitle": "הנקודה הגבוהה ביותר באיליאבלה בגובה 1,378 מטר",
        "description": "הפסגה הגבוהה ביותר בכל הארכיפלג. מסע טיפוס הרים מתקדם העובר דרך יער עננים בתולי עד לפסגה החולשת מעל שכבת העננים עם נוף פנורמי אינסופי.",
        "highlights": [
          "הנקודה הגבוהה ביותר באי (1,378 מ׳)",
          "יער עננים נדיר וסחלבים פראיים",
          "נוף אינסופי של האוקיינוס והיבשת",
          "ההישג האולטימטיבי לחובבי טיפוס הרים"
        ],
        "ecoTip": "שמורה מוגנת ברמה הגבוהה ביותר. חובה לצאת בליווי מדריך מוסמך.",
        "specs": {
          "distance": "14 ק״מ (הלוך וחזור)",
          "duration": "מסע של 8–10 שעות",
          "elevation": "+1,378 מ׳ (הפסגה הגבוהה באי)",
          "access": "חובה בליווי מדריך מורשה של פארק המדינה",
          "sea": "לא רלוונטי (הפסגה הגבוהה מעל העננים)",
          "structure": "אזור פראי ומוגן לחלוטין"
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
      -23.8601,
      -45.2956
    ],
    "rating": 5,
    "reviews": 320,
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
      "distance": "Mirante na beira da descida de Castelhanos",
      "duration": "10 min de parada fotográfica",
      "elevation": "+220m de altitude",
      "access": "Estrada do Parque Estadual de Castelhanos (jipe 4x4 ou caminhada)",
      "sea": "Vista espetacular da baía oceânica",
      "structure": "Deck de madeira com vista panorâmica"
    },
    "translations": {
      "pt": {
        "title": "Mirante do Coração de Castelhanos",
        "subtitle": "O ângulo perfeito que revela o contorno de coração da baía",
        "description": "Localizado no alto da serra durante a descida para a Baía de Castelhanos, este mirante é o ponto exato onde se avistam os dois lados da praia formando um perfeito coração verde-esmeralda cercado pela Mata Atlântica.",
        "highlights": [
          "Vista do formato de coração mais famoso do Brasil",
          "Ponto alto para fotografias memoráveis",
          "Encontro da serra com o oceano aberto",
          "Parada clássica dos passeios 4x4"
        ],
        "ecoTip": "Tenha cuidado na beirada da encosta e utilize o deck de observação.",
        "specs": {
          "distance": "Mirante na beira da descida de Castelhanos",
          "duration": "10 min de parada fotográfica",
          "elevation": "+220m de altitude",
          "access": "Estrada do Parque Estadual de Castelhanos (jipe 4x4 ou caminhada)",
          "sea": "Vista espetacular da baía oceânica",
          "structure": "Deck de madeira com vista panorâmica"
        }
      },
      "en": {
        "title": "Heart Overlook (Mirante do Coração)",
        "subtitle": "The vantage point revealing Castelhanos iconic heart contour",
        "description": "Perched high on the mountain pass descending toward Castelhanos Bay, this panoramic lookout offers the iconic bird-eye view of the beach forming a heart outlined by emerald ocean and rainforest.",
        "highlights": [
          "Famous heart-shaped coastal contour",
          "Unbeatable postcard photography spot",
          "Where mountain peaks meet open ocean",
          "Signature stop on 4x4 tours"
        ],
        "ecoTip": "Stay on designated observation decks.",
        "specs": {
          "distance": "Roadside viewpoint on the descent to Castelhanos",
          "duration": "10 min photo stop",
          "elevation": "+220 m altitude",
          "access": "Castelhanos State Park road (4x4 or on foot)",
          "sea": "Spectacular view of the ocean bay",
          "structure": "Wooden deck with panoramic views"
        }
      },
      "fr": {
        "title": "Belvédère du Cœur de Castelhanos",
        "subtitle": "Le point de vue révélant la forme de cœur de la baie",
        "description": "Surplombant la descente vers Castelhanos, ce mirador offre la vue célèbre où la baie dessine un cœur parfait entouré par la forêt tropicale.",
        "highlights": [
          "Vue célèbre de la baie en forme de cœur",
          "Spot photo inoubliable",
          "Rencontre de la montagne et de l océan",
          "Arrêt incontournable des 4x4"
        ],
        "ecoTip": "Restez sur les plateformes aménagées.",
        "specs": {
          "distance": "Belvédère au bord de la descente de Castelhanos",
          "duration": "Arrêt photo de 10 min",
          "elevation": "+220 m d’altitude",
          "access": "Route du parc d’État de Castelhanos (4x4 ou marche)",
          "sea": "Vue spectaculaire sur la baie océanique",
          "structure": "Terrasse en bois avec vue panoramique"
        }
      },
      "es": {
        "title": "Mirador del Corazón de Castelhanos",
        "subtitle": "El punto panorámico que revela la bahía en forma de corazón",
        "description": "Ubicado en lo alto del paso de montaña hacia Castelhanos, este mirador permite contemplar la silueta en forma de corazón que forma la playa con el mar.",
        "highlights": [
          "Silueta en forma de corazón famosa",
          "Postal fotográfica obligada",
          "Encuentro de la selva y el mar",
          "Parada clásica en 4x4"
        ],
        "ecoTip": "Permanece en los miradores designados.",
        "specs": {
          "distance": "Mirador junto al descenso a Castelhanos",
          "duration": "Parada fotográfica de 10 min",
          "elevation": "+220 m de altitud",
          "access": "Carretera del Parque Estatal de Castelhanos (4x4 o caminata)",
          "sea": "Vista espectacular de la bahía oceánica",
          "structure": "Plataforma de madera con vista panorámica"
        }
      },
      "he": {
        "title": "תצפית הלב של קסטליאנוס (Mirante do Coração)",
        "subtitle": "נקודת התצפית החושפת את המפרץ המפורסם בצורת לב",
        "description": "ממוקמת במעבר ההרים בירידה למפרץ קסטליאנוס. מנקודה זו מתגלה המראה המרהיב של שני חלקי החוף היוצרים יחד צורת לב מושלמת המוקפת במי ים טורקיז.",
        "highlights": [
          "מפרץ הלב המפורסם של ברזיל",
          "נקודת צילום חובה למטיילים",
          "חיבור הרים טרופיים עם אוקיינוס פתוח",
          "עצירה קלאסית בסיורי 4x4"
        ],
        "ecoTip": "הישארו על מרפסות התצפית המוסדרות.",
        "specs": {
          "distance": "תצפית לצד הירידה ל-Castelhanos",
          "duration": "עצירת צילום של 10 דקות",
          "elevation": "גובה +220 מ׳",
          "access": "כביש פארק המדינה של Castelhanos (4x4 או הליכה)",
          "sea": "נוף מרהיב של המפרץ האוקייני",
          "structure": "מרפסת עץ עם נוף פנורמי"
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
    "rating": 5,
    "reviews": 298,
    "image": "assets/images/pico-do-baepi_1.jpg",
    "tags": [
      "1.048m de Altitude",
      "Vista 360°",
      "Trilha Desafiadora",
      "Mata Atlântica"
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
      "difficulty": "hard",
      "distance": "7.4 km (ida e volta)",
      "duration": "4h30 a 6h",
      "elevation": "+1.048m de altitude",
      "access": "Início no bairro do Itaguaçu (Parque Estadual de Ilhabela)",
      "sea": "Não se aplica (Cume com vista 360° do canal, oceano e Serra do Mar)",
      "structure": "Sem estrutura no percurso; ponto de apoio e cadastro na base do Parque"
    },
    "translations": {
      "pt": {
        "title": "Pico do Baepi",
        "subtitle": "A subida ao gigante de 1.048m com vista panorâmica de 360°",
        "description": "O cume mais famoso de Ilhabela proporciona uma das visões mais espetaculares do litoral brasileiro. A trilha íngreme atravessa floresta primária até atingir as rochas do topo com vista para todo o arquipélago.",
        "highlights": [
          "Vista panorâmica 360° de tirar o fôlego",
          "Sensação inigualável de conquista",
          "Fauna e flora ricas da Mata Atlântica",
          "Contemplação do pôr do sol e nuvens"
        ],
        "ecoTip": "Leve no mínimo 2 litros de água, lanches calóricos e agasalho para o topo (vento frio).",
        "specs": {
          "distance": "7.4 km (ida e volta)",
          "duration": "4h30 a 6h",
          "elevation": "+1.048m de altitude",
          "access": "Início no bairro do Itaguaçu (Parque Estadual de Ilhabela)",
          "sea": "Não se aplica (Cume com vista 360° do canal, oceano e Serra do Mar)",
          "structure": "Sem estrutura no percurso; ponto de apoio e cadastro na base do Parque"
        }
      },
      "en": {
        "title": "Baepi Peak",
        "subtitle": "Ascent to the 3,440-foot giant with 360-degree panoramic summit",
        "description": "The most iconic mountain summit in Ilhabela offers unforgettable vistas of the archipelago, the channel, and the coastal mountains of São Paulo state.",
        "highlights": [
          "Breathtaking 360° archipelago views",
          "Rewarding high-altitude physical challenge",
          "Rich Atlantic rainforest biodiversity",
          "Cloudscapes and golden light"
        ],
        "ecoTip": "Carry at least 2 liters of water, energy snacks, and a windbreaker for the breezy summit.",
        "specs": {
          "distance": "7.4 km (round trip)",
          "duration": "4 h 30 min–6 h",
          "elevation": "+1,048 m altitude",
          "access": "Starts in Itaguaçu (Ilhabela State Park)",
          "sea": "Not applicable (summit with 360° views of the channel, ocean and Serra do Mar)",
          "structure": "No facilities on the route; support and registration point at the park base"
        }
      },
      "fr": {
        "title": "Pic du Baepi",
        "subtitle": "Ascension du géant de 1 048 m avec panorama à 360°",
        "description": "Le sommet le plus emblématique d Ilhabela offre une vue époustouflante sur l archipel et le canal de São Sebastião au terme d une randonnée sportive.",
        "highlights": [
          "Panorama grandiose à 360°",
          "Défi sportif très gratifiant",
          "Immersion en forêt tropicale primaire",
          "Mer de nuages au lever du jour"
        ],
        "ecoTip": "Prévoyez au moins 2 litres d eau, des collations énergétiques et un coupe-vent.",
        "specs": {
          "distance": "7,4 km (aller-retour)",
          "duration": "4 h 30 à 6 h",
          "elevation": "+1 048 m d’altitude",
          "access": "Départ du quartier Itaguaçu (parc d’État d’Ilhabela)",
          "sea": "Sans objet (sommet avec vue à 360° sur le canal, l’océan et Serra do Mar)",
          "structure": "Aucun équipement sur le parcours ; point d’assistance et d’inscription à la base du parc"
        }
      },
      "es": {
        "title": "Pico do Baepi",
        "subtitle": "Ascenso a la cumbre de 1.048 m con vista panorámica de 360°",
        "description": "El pico más famoso de Ilhabela ofrece una de las vistas más impresionantes de la costa brasileña tras superar un sendero empinado a través de selva virgen.",
        "highlights": [
          "Vista panorámica 360° inigualable",
          "Gran desafío físico gratificante",
          "Flora y fauna endémica de la Mata Atlántica",
          "Cielos y nubes sobre el mar"
        ],
        "ecoTip": "Lleva mínimo 2 litros de agua por persona, comida energética y abrigo para la cumbre.",
        "specs": {
          "distance": "7,4 km (ida y vuelta)",
          "duration": "4 h 30 min a 6 h",
          "elevation": "+1.048 m de altitud",
          "access": "Inicio en Itaguaçu (Parque Estatal de Ilhabela)",
          "sea": "No corresponde (cumbre con vista de 360° al canal, océano y Serra do Mar)",
          "structure": "Sin infraestructura en la ruta; punto de apoyo y registro en la base del parque"
        }
      },
      "he": {
        "title": "פסגת באפי (Pico do Baepi)",
        "subtitle": "טיפוס לפסגת ההר בגובה 1,048 מטר עם תצפית פנורמית 360°",
        "description": "הפסגה המפורסמת ביותר באיליאבלה מציעה את אחת התצפיות היפות ביותר בברזיל. מסלול תלול ומאתגר בתוך יער גשם עשיר עד לפסגת הסלעים החולשת על כל הארכיפלג.",
        "highlights": [
          "תצפית 360° עוצרת נשימה על כל האי והים",
          "תחושת הישג וספורט מאתגר",
          "מגוון ביולוגי עשיר של יער הגשם",
          "עננים ונופי שקיעה מעל המים"
        ],
        "ecoTip": "קחו לפחות 2 ליטר מים לאדם, חטיפי אנרגיה וביגוד חם לפסגה.",
        "specs": {
          "distance": "7.4 ק״מ (הלוך וחזור)",
          "duration": "4.5–6 שעות",
          "elevation": "גובה +1,048 מ׳",
          "access": "תחילה בשכונת Itaguaçu (פארק המדינה של Ilhabela)",
          "sea": "לא רלוונטי (פסגה עם נוף של 360° לתעלה, לאוקיינוס ול-Serra do Mar)",
          "structure": "ללא תשתיות במסלול; נקודת סיוע ורישום בבסיס הפארק"
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
    "rating": 5,
    "reviews": 215,
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
    "rating": 4.9,
    "reviews": 178,
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
    "rating": 4.9,
    "reviews": 140,
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
    "rating": 4.9,
    "reviews": 440,
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
    "rating": 5,
    "reviews": 180,
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
    "id": "guide-rafael-costa",
    "name": "Rafael Costa",
    "cadastur": "26.012345/0001-89",
    "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewsCount": 128,
    "pricePerDay": 260,
    "specialtyKey": "guideSpecTrails",
    "specialties": [
      "Trilhas Avançadas",
      "Off-road 4x4",
      "Pico do Baepi",
      "Bonete"
    ],
    "languages": [
      "Português",
      "English",
      "Español"
    ],
    "languagesList": [
      "pt",
      "en",
      "es"
    ],
    "phone": "+5512997654321",
    "whatsappText": "Olá Rafael! Vi seu perfil no Ilhabela Interactive Guide e gostaria de agendar uma expedição.",
    "translations": {
      "pt": {
        "role": "Guia de Montanha & Travessias",
        "bio": "Nascido e criado em Ilhabela, com mais de 12 anos de experiência conduzindo grupos no Pico do Baepi, Trilha do Bonete e expedições 4x4 em Castelhanos. Especialista em primeiros socorros em áreas remotas.",
        "specialties": [
          "Trilhas Avançadas",
          "Off-road 4x4",
          "Pico do Baepi",
          "Bonete"
        ]
      },
      "en": {
        "role": "Mountain Guide & Trail Specialist",
        "bio": "Born and raised on the island, with 12+ years leading treks to Baepi Peak, the Bonete Trail, and 4x4 Castelhanos crossings. Certified in remote wilderness first aid.",
        "specialties": [
          "Advanced trails",
          "Off-road 4x4",
          "Pico do Baepi",
          "Bonete"
        ]
      },
      "fr": {
        "role": "Guide de Montagne & Randonnée",
        "bio": "Natif d Ilhabela avec plus de 12 ans d expérience sur les sommets du Baepi et sentiers du Bonete. Spécialiste des premiers secours en milieu sauvage.",
        "specialties": [
          "Randonnées avancées",
          "Tout-terrain 4x4",
          "Pico do Baepi",
          "Bonete"
        ]
      },
      "es": {
        "role": "Guía de Montaña & Senderismo",
        "bio": "Nacido en Ilhabela, con más de 12 años guiando en el Pico do Baepi y la travesía de Bonete. Certificado en primeros auxilios en áreas remotas.",
        "specialties": [
          "Senderos avanzados",
          "Todoterreno 4x4",
          "Pico do Baepi",
          "Bonete"
        ]
      },
      "he": {
        "role": "מדריך הרים וטרקים מוסמך",
        "bio": "יליד איליאבלה עם מעל 12 שנות ניסיון בהובלת משלחות לפסגת באפי, טרק בונטה וסיורי 4x4 בקסטליאנוס. מוסמך בעזרה ראשונה בשטח.",
        "specialties": [
          "מסלולים למתקדמים",
          "שטח 4x4",
          "Pico do Baepi",
          "Bonete"
        ]
      }
    }
  },
  {
    "id": "guide-marina-silva",
    "name": "Marina Silva",
    "cadastur": "26.098765/0001-42",
    "photo": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "rating": 5,
    "reviewsCount": 164,
    "pricePerDay": 240,
    "specialtyKey": "guideSpecBirdwatching",
    "specialties": [
      "Observação de Aves",
      "Botânica da Mata Atlântica",
      "Baleias & Golfinhos",
      "Passeios de Barco"
    ],
    "languages": [
      "Português",
      "English",
      "Français"
    ],
    "languagesList": [
      "pt",
      "en",
      "fr"
    ],
    "phone": "+5512998765432",
    "whatsappText": "Olá Marina! Encontrei seu perfil no Ilhabela Interactive Guide e tenho interesse em um roteiro de ecoturismo.",
    "translations": {
      "pt": {
        "role": "Bióloga & Guia de Ecoturismo",
        "bio": "Bióloga marinha apaixonada pela biodiversidade insular. Especialista em birdwatching (mais de 300 espécies registradas na ilha) e observação responsável de cetáceos no canal.",
        "specialties": [
          "Observação de Aves",
          "Botânica da Mata Atlântica",
          "Baleias & Golfinhos",
          "Passeios de Barco"
        ]
      },
      "en": {
        "role": "Biologist & Birdwatching Expert",
        "bio": "Marine biologist passionate about island ecosystems. Leading birdwatching expeditions (over 300 bird species) and responsible cetacean observation tours.",
        "specialties": [
          "Birdwatching",
          "Atlantic Forest botany",
          "Whales & dolphins",
          "Boat tours"
        ]
      },
      "fr": {
        "role": "Biologiste & Guide Écotourisme",
        "bio": "Biologiste marine experte de la biodiversité d Ilhabela. Spécialiste de l ornithologie (plus de 300 espèces d oiseaux) et de l observation respectueuse des baleines.",
        "specialties": [
          "Observation des oiseaux",
          "Botanique de la forêt atlantique",
          "Baleines et dauphins",
          "Excursions en bateau"
        ]
      },
      "es": {
        "role": "Bióloga & Guía de Ecoturismo",
        "bio": "Bióloga marina especializada en aves (más de 300 especies catalogadas) y avistamiento responsable de ballenas y delfines en el canal de São Sebastião.",
        "specialties": [
          "Observación de aves",
          "Botánica de la Mata Atlántica",
          "Ballenas y delfines",
          "Paseos en barco"
        ]
      },
      "he": {
        "role": "ביולוגית ימית ומדריכת צפרות",
        "bio": "ביולוגית ימית מומחית במערכת האקולוגית של האי. מובילה סיורי צפרות (מעל 300 מיני ציפורים) וצפייה מודרכת בלווייתנים ודולפינים.",
        "specialties": [
          "צפרות",
          "בוטניקה של היער האטלנטי",
          "לווייתנים ודולפינים",
          "סיורי שייט"
        ]
      }
    }
  },
  {
    "id": "guide-thiago-mendes",
    "name": "Thiago Mendes",
    "cadastur": "26.045678/0001-15",
    "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewsCount": 95,
    "pricePerDay": 210,
    "specialtyKey": "guideSpecWaterfalls",
    "specialties": [
      "Cachoeiras Secretas",
      "Caiaque & SUP",
      "Roteiros Familiares",
      "Fotografia"
    ],
    "languages": [
      "Português",
      "English",
      "Español",
      "עברית"
    ],
    "languagesList": [
      "pt",
      "en",
      "es",
      "he"
    ],
    "phone": "+5512991234567",
    "whatsappText": "Olá Thiago! Vi seu perfil no guia de Ilhabela e gostaria de agendar um passeio de cachoeiras.",
    "translations": {
      "pt": {
        "role": "Guia de Cachoeiras & Caiaque",
        "bio": "Instrutor experiente em passeios aquáticos, travessias de caiaque e cachoeiras secretas. Roteiros divertidos e seguros desenhados para casais e famílias com crianças.",
        "specialties": [
          "Cachoeiras Secretas",
          "Caiaque & SUP",
          "Roteiros Familiares",
          "Fotografia"
        ]
      },
      "en": {
        "role": "Waterfalls & Kayak Guide",
        "bio": "Expert instructor in ocean kayaking, secret waterfalls, and coastal paddle routes. Crafting fun, safe adventures customized for couples and families with kids.",
        "specialties": [
          "Secret waterfalls",
          "Kayak & SUP",
          "Family routes",
          "Photography"
        ]
      },
      "fr": {
        "role": "Guide Cascades & Kayak",
        "bio": "Instructeur certifié de kayak et cascades secrètes. Conçoit des aventures sécurisées et mémorables pour couples et familles avec enfants.",
        "specialties": [
          "Cascades secrètes",
          "Kayak et paddle",
          "Itinéraires familiaux",
          "Photographie"
        ]
      },
      "es": {
        "role": "Guía de Cascadas & Kayak",
        "bio": "Instructor de deportes acuáticos y explorador de cascadas ocultas. Itinerarios seguros y dinámicos para parejas y familias.",
        "specialties": [
          "Cascadas secretas",
          "Kayak y SUP",
          "Rutas familiares",
          "Fotografía"
        ]
      },
      "he": {
        "role": "מדריך מפלים, קיאקים ומשפחות",
        "bio": "מדריך מנוסה בקיאקים ימיים, סאפ ומפלים נסתרים. מתמחה בסיורים חווייתיים ובטוחים המותאמים למשפחות עם ילדים, זוגות ותרמילאים (דובר עברית).",
        "specialties": [
          "מפלים סודיים",
          "קיאק וסאפ",
          "מסלולים למשפחות",
          "צילום"
        ]
      }
    }
  },
  {
    "id": "guide-carlos-caicara",
    "name": "Carlos Caiçara",
    "cadastur": "26.078901/0001-33",
    "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "rating": 5,
    "reviewsCount": 142,
    "pricePerDay": 280,
    "specialtyKey": "guideSpecHistory",
    "specialties": [
      "Expedição 4x4",
      "Cultura Tradicional",
      "Castelhanos",
      "Gastronomia"
    ],
    "languages": [
      "Português",
      "Español",
      "English"
    ],
    "languagesList": [
      "pt",
      "es",
      "en"
    ],
    "phone": "+5512996543210",
    "whatsappText": "Olá Carlos! Gostaria de agendar um passeio 4x4 em Castelhanos pelo Ilhabela Interactive Guide.",
    "translations": {
      "pt": {
        "role": "Guia Nativo & Especialista 4x4",
        "bio": "Herdeiro da rica cultura caiçara de Ilhabela. Motorista credenciado de jipe 4x4 no Parque Estadual, contador de causos históricos e mestre na pesca tradicional.",
        "specialties": [
          "Expedição 4x4",
          "Cultura Tradicional",
          "Castelhanos",
          "Gastronomia"
        ]
      },
      "en": {
        "role": "Native Caiçara & 4x4 Specialist",
        "bio": "Deeply rooted in traditional island culture. Certified 4x4 driver in the State Park, sharing historic pirate and caiçara legends along with authentic cuisine.",
        "specialties": [
          "4x4 expedition",
          "Traditional culture",
          "Castelhanos",
          "Gastronomy"
        ]
      },
      "fr": {
        "role": "Guide Autochtone & Expert 4x4",
        "bio": "Issu de la tradition maritime caiçara. Chauffeur agréé 4x4 dans le parc d État, conteur d histoires de pirates et spécialiste de la cuisine locale.",
        "specialties": [
          "Expédition 4x4",
          "Culture traditionnelle",
          "Castelhanos",
          "Gastronomie"
        ]
      },
      "es": {
        "role": "Guía Nativo & Especialista 4x4",
        "bio": "Guía local tradicional y conductor 4x4 habilitado. Comparte leyendas históricas de piratas, cultura caiçara y los mejores rincones de Castelhanos.",
        "specialties": [
          "Expedición 4x4",
          "Cultura tradicional",
          "Castelhanos",
          "Gastronomía"
        ]
      },
      "he": {
        "role": "מדריך מקומי מומחה שטח 4x4",
        "bio": "יליד קהילת הדייגים המסורתית (קאיסארה). נהג שטח מוסמך בפארק הלאומי, מספר סיפורי שודדי ים והיסטוריה מרתקת ומומחה באוכל מקומי.",
        "specialties": [
          "מסע 4x4",
          "תרבות מסורתית",
          "Castelhanos",
          "קולינריה"
        ]
      }
    }
  }
];
