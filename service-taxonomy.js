// Canonical service taxonomy. Stable IDs with localized labels.
const serviceTaxonomy = {
  labels: {
    all: {pt:'Todos',en:'All',fr:'Tous',es:'Todos',he:'הכול'},
    type: {pt:'Tipo',en:'Type',fr:'Type',es:'Tipo',he:'סוג'},
    format: {pt:'Formato',en:'Format',fr:'Format',es:'Formato',he:'פורמט'},
    specialty: {pt:'Especialidade',en:'Specialty',fr:'Spécialité',es:'Especialidad',he:'התמחות'},
    occasion: {pt:'Momento',en:'Occasion',fr:'Moment',es:'Momento',he:'מועד'}
  },
  type: {
    laundry: {pt:'Lavanderia',en:'Laundry',fr:'Blanchisserie',es:'Lavandería',he:'מכבסה'},
    supermarket: {pt:'Supermercado',en:'Supermarket',fr:'Supermarché',es:'Supermercado',he:'סופרמרקט'},
    equipmentRental: {pt:'Aluguel de equipamentos',en:'Equipment rental',fr:'Location d’équipement',es:'Alquiler de equipos',he:'השכרת ציוד'},
    pharmacy: {pt:'Farmácia',en:'Pharmacy',fr:'Pharmacie',es:'Farmacia',he:'בית מרקחת'},
    hospital: {pt:'Hospital e pronto-socorro',en:'Hospital and emergency care',fr:'Hôpital et urgences',es:'Hospital y urgencias',he:'בית חולים ומיון'},
    transport: {pt:'Transporte público',en:'Public transport',fr:'Transport public',es:'Transporte público',he:'תחבורה ציבורית'},
    ferry: {pt:'Travessia de balsa',en:'Ferry crossing',fr:'Traversée en ferry',es:'Travesía en ferry',he:'מעבורת'},
    restaurant: {pt:'Restaurante',en:'Restaurant',fr:'Restaurant',es:'Restaurante',he:'מסעדה'},
    pizzeria: {pt:'Pizzaria',en:'Pizzeria',fr:'Pizzeria',es:'Pizzería',he:'פיצרייה'},
    kiosk: {pt:'Quiosque',en:'Kiosk',fr:'Kiosque',es:'Quiosco',he:'קיוסק'},
    cafe: {pt:'Café / Cafeteria',en:'Café / Coffee shop',fr:'Café / Cafétéria',es:'Café / Cafetería',he:'בית קפה'},
    bakery: {pt:'Padaria',en:'Bakery',fr:'Boulangerie',es:'Panadería',he:'מאפייה'},
    bar: {pt:'Bar / Gastrobar',en:'Bar / Gastrobar',fr:'Bar / Gastrobar',es:'Bar / Gastrobar',he:'בר / גסטרובר'},
    burger: {pt:'Hamburgueria',en:'Burger restaurant',fr:'Burger',es:'Hamburguesería',he:'המבורגריה'},
    esfiharia: {pt:'Esfiharia',en:'Esfiha shop',fr:'Esfiharia',es:'Esfiharía',he:'אספיחריה'},
    creperia: {pt:'Creperia',en:'Crêperie',fr:'Crêperie',es:'Crepería',he:'קרפריה'},
    gelateria: {pt:'Sorveteria / Gelateria',en:'Ice cream / Gelato',fr:'Glacier / Gelateria',es:'Heladería / Gelateria',he:'גלידריה'},
    dessert: {pt:'Doceria',en:'Dessert shop',fr:'Pâtisserie / Desserts',es:'Pastelería / Postres',he:'קונדיטוריה'},
    foodTruck: {pt:'Food truck',en:'Food truck',fr:'Food truck',es:'Food truck',he:'פוד טראק'},
    streetFood: {pt:'Comida de rua',en:'Street food',fr:'Street food',es:'Comida callejera',he:'אוכל רחוב'},
    deliveryKitchen: {pt:'Cozinha de entrega',en:'Delivery kitchen',fr:'Cuisine de livraison',es:'Cocina de delivery',he:'מטבח משלוחים'}
  },
  format: {
    aLaCarte: {pt:'À la carte',en:'À la carte',fr:'À la carte',es:'A la carta',he:'א-לה-קארט'},
    buffet: {pt:'Buffet',en:'Buffet',fr:'Buffet',es:'Buffet',he:'בופה'},
    perKilo: {pt:'Por quilo',en:'By weight',fr:'Au poids',es:'Por kilo',he:'לפי משקל'},
    selfService: {pt:'Self-service',en:'Self-service',fr:'Self-service',es:'Autoservicio',he:'שירות עצמי'},
    pratoFeito: {pt:'Prato feito',en:'Set meal',fr:'Plat du jour',es:'Plato preparado',he:'ארוחה מוכנה'},
    snacks: {pt:'Lanches / porções',en:'Snacks / shareable dishes',fr:'Snacks / portions à partager',es:'Snacks / porciones',he:'נשנושים / מנות לחלוקה'},
    rodizio: {pt:'Rodízio',en:'Rodízio',fr:'Rodízio',es:'Rodizio',he:'רודיזיו'},
    delivery: {pt:'Delivery',en:'Delivery',fr:'Livraison',es:'Delivery',he:'משלוחים'},
    takeaway: {pt:'Para viagem',en:'Takeaway',fr:'À emporter',es:'Para llevar',he:'טייק-אוויי'}
  },
  specialty: {
    seafood:{pt:'Frutos do mar',en:'Seafood',fr:'Fruits de mer',es:'Mariscos',he:'מאכלי ים'},
    caicara:{pt:'Caiçara',en:'Caiçara',fr:'Caiçara',es:'Caiçara',he:'קאיסארה'},
    brazilian:{pt:'Brasileira',en:'Brazilian',fr:'Brésilienne',es:'Brasileña',he:'ברזילאית'},
    italian:{pt:'Italiana',en:'Italian',fr:'Italienne',es:'Italiana',he:'איטלקית'},
    japanese:{pt:'Japonesa',en:'Japanese',fr:'Japonaise',es:'Japonesa',he:'יפנית'},
    arabicLebanese:{pt:'Árabe / libanesa',en:'Arabic / Lebanese',fr:'Arabe / libanaise',es:'Árabe / libanesa',he:'ערבית / לבנונית'},
    mexican:{pt:'Mexicana',en:'Mexican',fr:'Mexicaine',es:'Mexicana',he:'מקסיקנית'},
    barbecue:{pt:'Churrasco',en:'Barbecue / steakhouse',fr:'Grillades / barbecue',es:'Parrilla / barbacoa',he:'בשרים על האש'},
    pizza:{pt:'Pizza',en:'Pizza',fr:'Pizza',es:'Pizza',he:'פיצה'},
    pasta:{pt:'Massas',en:'Pasta',fr:'Pâtes',es:'Pastas',he:'פסטה'},
    burger:{pt:'Hambúrguer',en:'Burgers',fr:'Burgers',es:'Hamburguesas',he:'המבורגר'},
    vegetarian:{pt:'Vegetariana',en:'Vegetarian',fr:'Végétarienne',es:'Vegetariana',he:'צמחונית'},
    vegan:{pt:'Vegana',en:'Vegan',fr:'Végane',es:'Vegana',he:'טבעונית'},
    coffeeBrunch:{pt:'Café / brunch',en:'Coffee / brunch',fr:'Café / brunch',es:'Café / brunch',he:'קפה / בראנץ׳'},
    desserts:{pt:'Doces / sobremesas',en:'Desserts',fr:'Desserts',es:'Postres',he:'קינוחים'},
    bahian:{pt:'Culinária baiana',en:'Bahian cuisine',fr:'Cuisine bahianaise',es:'Cocina bahiana',he:'מטבח בהיאני'},
    oriental:{pt:'Oriental',en:'Oriental',fr:'Orientale',es:'Oriental',he:'מזרחי'}
  },
  occasion: {
    breakfast:{pt:'Café da manhã',en:'Breakfast',fr:'Petit-déjeuner',es:'Desayuno',he:'ארוחת בוקר'},
    brunch:{pt:'Brunch',en:'Brunch',fr:'Brunch',es:'Brunch',he:'בראנץ׳'},
    lunch:{pt:'Almoço',en:'Lunch',fr:'Déjeuner',es:'Almuerzo',he:'ארוחת צהריים'},
    afternoon:{pt:'Tarde',en:'Afternoon',fr:'Après-midi',es:'Tarde',he:'אחר הצהריים'},
    dinner:{pt:'Jantar',en:'Dinner',fr:'Dîner',es:'Cena',he:'ארוחת ערב'},
    night:{pt:'Noite',en:'Night',fr:'Soir / night',es:'Noche',he:'לילה'}
  }
};
