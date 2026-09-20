export interface MenuItem {
  id: string;
  category: 'entradas' | 'principales' | 'pizzas' | 'bebidas';
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  price: string;
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  // Entradas
  {
    id: 'cevichocho',
    category: 'entradas',
    name: { es: 'Cevichocho', en: 'Cevichocho' },
    description: {
      es: 'Ceviche de chochos andinos marinados con cebolla morada, tomate y maíz tostado crujiente.',
      en: 'Andean lupini beans marinated in citrus with red onions, tomatoes, and toasted corn.'
    },
    price: '$2.50'
  },
  {
    id: 'panecook',
    category: 'entradas',
    name: { es: 'Panecook', en: 'Artisan Panecook' },
    description: {
      es: 'Pan de casa horneado relleno de embutidos salteados con vegetales frescos y queso maduro gratinado.',
      en: 'House baked bread bowl stuffed with sautéed rustic meats, vegetables, and melted cheese.'
    },
    price: '$3.50'
  },
  {
    id: 'maduro-queso',
    category: 'entradas',
    name: { es: 'Maduro con Queso', en: 'Baked Plantain & Cheese' },
    description: {
      es: 'Maduros al horno con queso maduro derretido y crocante chicharrón de cerdo artesanal.',
      en: 'Oven-roasted sweet plantains topped with aged melted cheese and crispy pork crackling.'
    },
    price: '$4.50',
    popular: true
  },

  // Principales
  {
    id: 'cordero-300g',
    category: 'principales',
    name: { es: 'Cordero y Borrego de la Granja 300g', en: 'Farm Lamb Steak 300g' },
    description: {
      es: '300gr de tierno corte de pierna de cordero y borrego al grill acompañado de papas salteadas al romero, ensaladas frescas y chimichurri artesanal.',
      en: '300g prime leg steak grilled over coals, served with rosemary sautéed potatoes, fresh salad & chimichurri.'
    },
    price: '$17.00',
    popular: true
  },
  {
    id: 'cordero-200g',
    category: 'principales',
    name: { es: 'Cordero y Borrego de la Granja 200g', en: 'Farm Lamb Steak 200g' },
    description: {
      es: '200gr de jugoso corte de cordero / borrego al grill acompañado de papas salteadas, ensaladas y chimichurri artesanal.',
      en: '200g grilled lamb shoulder steak served with sautéed potatoes, garden salad, and artisan chimichurri.'
    },
    price: '$11.50'
  },
  {
    id: 'lomo-falda',
    category: 'principales',
    name: { es: 'Lomo de Falda', en: 'Grilled Beef Strip Loin' },
    description: {
      es: '200gr de lomo ancho de res a las brasas acompañado de papas fritas rústicas, ensaladas y chimichurri.',
      en: '200g tender beef loin grilled to perfection, served with rustic fries, mixed salad, and chimichurri.'
    },
    price: '$13.50'
  },
  {
    id: 'costilla-bbq',
    category: 'principales',
    name: { es: 'Costilla BBQ', en: 'Slow-Smoked BBQ Ribs' },
    description: {
      es: 'Costillas de cerdo cocidas lentamente al horno de barro y marcadas al grill con glaseado BBQ.',
      en: 'Tender pork ribs slow-cooked, finished over open fire, and glazed in savory barbecue sauce.'
    },
    price: '$16.00',
    popular: true
  },
  {
    id: 'chuleta-bbq',
    category: 'principales',
    name: { es: 'Chuleta BBQ', en: 'Double Grilled Pork Chops' },
    description: {
      es: 'Doble chuleta de cerdo al grill bañada en salsa BBQ, papas fritas doradas y ensaladas.',
      en: 'Two thick pork chops grilled over embers with BBQ sauce, golden fries, and garden salad.'
    },
    price: '$8.50'
  },
  {
    id: 'camarones-ajillo',
    category: 'principales',
    name: { es: 'Camarones al Ajillo', en: 'Garlic Butter Shrimp' },
    description: {
      es: '120g de camarones salteados al ajillo con vino blanco, acompañados de papas fritas y ensaladas.',
      en: '120g plump shrimp sautéed in garlic white wine butter sauce, served with crispy fries and salad.'
    },
    price: '$8.00'
  },
  {
    id: 'pollo-champinones',
    category: 'principales',
    name: { es: 'Pollo en Salsa de Champiñones', en: 'Chicken in Mushroom Cream' },
    description: {
      es: 'Pechuga de pollo al grill bañada en salsa cremosa de champiñones con papas fritas y ensaladas.',
      en: 'Char-grilled chicken breast smothered in creamy sautéed mushroom sauce, served with fries and salad.'
    },
    price: '$7.00'
  },
  {
    id: 'lasana-carne',
    category: 'principales',
    name: { es: 'Lasaña de Carne', en: 'House Beef Lasagna' },
    description: {
      es: '150g de carne boloñesa, capas de pasta fresca, salsa bechamel sedosa, queso mozarella gratinado, papas y ensalada.',
      en: '150g Bolognese ground beef, fresh pasta sheets, creamy béchamel, golden mozzarella cheese, fries & salad.'
    },
    price: '$8.50',
    popular: true
  },

  // Pizzas
  {
    id: 'pizza-personal',
    category: 'pizzas',
    name: { es: 'Pizza Personal Wayko’s', en: 'Personal Artisan Pizza' },
    description: {
      es: '4 porciones artesanales al horno, salsa pomodoro casera, queso mozarella fundido y 2 ingredientes a tu elección.',
      en: '4 artisan slices, homemade pomodoro sauce, melted mozzarella, and 2 premium toppings of your choice.'
    },
    price: '$7.00'
  },
  {
    id: 'pizza-mediana',
    category: 'pizzas',
    name: { es: 'Pizza Mediana Wayko’s', en: 'Medium Artisan Pizza' },
    description: {
      es: '8 porciones artesanales al horno, salsa pomodoro casera, queso mozarella fundido y 2 ingredientes a tu elección.',
      en: '8 artisan slices, homemade pomodoro sauce, melted mozzarella, and 2 premium toppings of your choice.'
    },
    price: '$13.00',
    popular: true
  },

  // Bebidas
  {
    id: 'botella-chicha',
    category: 'bebidas',
    name: { es: 'Botella de Chicha Tradicional', en: 'Traditional Chicha Bottle' },
    description: {
      es: 'Bebida andina tradicional de fermentación natural, refrescante y aromática.',
      en: 'Traditional Andean fermented corn beverage, naturally spiced and authentic.'
    },
    price: '$5.00',
    popular: true
  },
  {
    id: 'jarra-jugo',
    category: 'bebidas',
    name: { es: 'Jarra de Jugo Natural', en: 'Pitcher of Fresh Fruit Juice' },
    description: {
      es: 'Jarra grande preparada con frutas frescas de temporada.',
      en: 'Large pitcher crafted from fresh seasonal local fruits.'
    },
    price: '$5.00'
  },
  {
    id: 'jarra-limonada-imperial',
    category: 'bebidas',
    name: { es: 'Jarra de Limonada Imperial', en: 'Imperial Lemonade Pitcher' },
    description: {
      es: 'Limonada especial de la casa con hierbabuena fresca y toque cítrico.',
      en: 'House specialty lemonade infused with fresh mint and citrus twist.'
    },
    price: '$5.00'
  },
  {
    id: 'cerveza-club',
    category: 'bebidas',
    name: { es: 'Cerveza Club', en: 'Club Premium Beer' },
    description: {
      es: 'Cerveza rubia prémium nacional bien helada.',
      en: 'Ice-cold Ecuadorian premium lager beer.'
    },
    price: '$3.00'
  },
  {
    id: 'batidos',
    category: 'bebidas',
    name: { es: 'Batidos de Fruta', en: 'Fruit Smoothies' },
    description: {
      es: 'Preparados en leche o agua con fruta fresca.',
      en: 'Made with fresh fruit blended in milk or water.'
    },
    price: '$3.00'
  },
  {
    id: 'cafe',
    category: 'bebidas',
    name: { es: 'Café Pasado de Altura', en: 'Highland Filter Coffee' },
    description: {
      es: 'Café de grano selecto recién pasado, aroma tostado intenso.',
      en: 'Freshly brewed highland bean coffee, rich aroma.'
    },
    price: '$1.00'
  }
];

