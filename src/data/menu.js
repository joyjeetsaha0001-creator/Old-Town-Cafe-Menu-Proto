const menuData = [
  // =========================================================
  // FROM THE WOK
  // =========================================================

  {
    id: "ftw1",
    category: "From the Wok",
    code: "FTW1",
    name: "Fried Rice",
    variants: [
      { name: "Veg", price: 229 },
      { name: "Mix Veg", price: 259 },
      { name: "Egg", price: 259 },
      { name: "Chicken", price: 269 },
      { name: "Egg-Chicken", price: 289 },
      { name: "Mix Non-Veg", price: 309 }
    ]
  },

  {
    id: "ftw2",
    category: "From the Wok",
    code: "FTW2",
    name: "Hakka Noodles",
    variants: [
      { name: "Veg", price: 239 },
      { name: "Mix Veg", price: 269 },
      { name: "Egg", price: 269 },
      { name: "Chicken", price: 279 },
      { name: "Egg-Chicken", price: 299 },
      { name: "Mix Non-Veg", price: 319 }
    ]
  },

  {
    id: "ftw3",
    category: "From the Wok",
    code: "FTW3",
    name: "Chilli",
    variants: [
      { name: "Paneer", price: 329 },
      { name: "Mushroom", price: 339 },
      { name: "Chicken", price: 349 },
      { name: "Fish", price: 399 },
      { name: "Prawn", price: 449 }
    ]
  },

  {
    id: "ftw4",
    category: "From the Wok",
    code: "FTW4",
    name: "Slurpy Pan-fried Noodles",
    variants: [
      { name: "Veg", price: 329 },
      { name: "Fried Egg", price: 349 },
      { name: "Chicken", price: 359 },
      { name: "Egg-Chicken", price: 379 },
      { name: "Prawn", price: 429 },
      { name: "Mix Non-Veg", price: 449 }
    ]
  },

  // =========================================================
  // PASTA - CLASSICS
  // =========================================================

  {
    id: "pc1",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC1",
    name: "Spaghetti Aglio, Olio e Peperoncino",
    variants: [
      { name: "Veg", price: 289 },
      { name: "Chicken", price: 309 },
      { name: "Prawn", price: 349 }
    ]
  },

  {
    id: "pc2",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC2",
    name: "Penne Alfredo",
    variants: [
      { name: "Veg", price: 299 },
      { name: "Chicken", price: 319 }
    ]
  },

  {
    id: "pc3",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC3",
    name: "Penne Arrabbiata",
    variants: [
      { name: "Veg", price: 299 },
      { name: "Chicken", price: 319 }
    ]
  },

  {
    id: "pc4",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC4",
    name: "Mixed Sauce Penne",
    variants: [
      { name: "Veg", price: 299 },
      { name: "Chicken", price: 319 }
    ]
  },

  {
    id: "pc5",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC5",
    name: "Penne Pesto",
    variants: [
      { name: "Veg", price: 309 },
      { name: "Chicken", price: 329 }
    ]
  },

  {
    id: "pc6",
    category: "Pasta",
    subcategory: "Classics",
    code: "PC6",
    name: "Spaghetti Bolognese",
    variants: [
      { name: "Chicken", price: 359 }
    ]
  },

  // =========================================================
  // PASTA - SPECIALS
  // =========================================================

  {
    id: "ps1",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS1",
    name: "Bell Pepper Sauce Penne",
    variants: [
      { name: "Veg", price: 319 },
      { name: "Chicken", price: 339 }
    ]
  },

  {
    id: "ps2",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS2",
    name: "Penne in Creamy White Sauce with Spinach",
    variants: [
      { name: "Mushroom", price: 319 },
      { name: "Chicken", price: 339 },
      { name: "Prawn", price: 369 }
    ]
  },

  {
    id: "ps3",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS3",
    name: "Caramelized Onion Spaghetti",
    variants: [
      { name: "Mushroom", price: 329 },
      { name: "Chicken", price: 349 },
      { name: "Prawn", price: 379 }
    ]
  },

  {
    id: "ps4",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS4",
    name: "Spaghetti in Cilantro Sauce",
    variants: [
      { name: "Veg", price: 309 },
      { name: "Chicken", price: 329 },
      { name: "Prawn", price: 359 }
    ]
  },

  {
    id: "ps5",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS5",
    name: "Madras Curry Penne",
    variants: [
      { name: "Veg", price: 329 },
      { name: "Chicken", price: 349 },
      { name: "Prawn", price: 379 }
    ]
  },

  {
    id: "ps6",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS6",
    name: "Butter Paneer/Chicken Penne",
    variants: [
      { name: "Paneer/Chicken", price: 329 }
    ]
  },

  {
    id: "ps7",
    category: "Pasta",
    subcategory: "Specials",
    code: "PS7",
    name: "Creamy Mushroom Farfalle",
    variants: [
      { name: "Regular", price: 349 }
    ]
  },

  // =========================================================
  // APPETISER - VEG
  // =========================================================

  {
    id: "av1",
    category: "Appetiser (Veg)",
    code: "AV1",
    name: "Peri-peri Potato Wedges",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "av2",
    category: "Appetiser (Veg)",
    code: "AV2",
    name: "French Fries",
    variants: [
      { name: "Salted", price: 169 },
      { name: "Peri-peri", price: 179 },
      { name: "Cheesy", price: 209 },
      { name: "Peri-peri Cheesy", price: 219 }
    ]
  },

  {
    id: "av3",
    category: "Appetiser (Veg)",
    code: "AV3",
    name: "Onion Rings",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "av4",
    category: "Appetiser (Veg)",
    code: "AV4",
    name: "Garlic Bread",
    variants: [
      { name: "Plain", price: 149 },
      { name: "Cheesy", price: 229 }
    ]
  },

  {
    id: "av5",
    category: "Appetiser (Veg)",
    code: "AV5",
    name: "Chilli Cheese Toast",
    variants: [
      { name: "Plain", price: 249 },
      { name: "Veg", price: 269 }
    ]
  },

  {
    id: "av6",
    category: "Appetiser (Veg)",
    code: "AV6",
    name: "Tomato Cheese Bruschetta",
    variants: [{ name: "Regular", price: 259 }]
  },

  {
    id: "av7",
    category: "Appetiser (Veg)",
    code: "AV7",
    name: "Veg Stuffed Cabbage Rolls",
    variants: [{ name: "Regular", price: 319 }]
  },

  {
    id: "av8",
    category: "Appetiser (Veg)",
    code: "AV8",
    name: "Cheesy Jalapeño Poppers",
    variants: [{ name: "Regular", price: 289 }]
  },

  {
    id: "av9",
    category: "Appetiser (Veg)",
    code: "AV9",
    name: "Fried Paneer Strips",
    variants: [{ name: "Regular", price: 289 }]
  },

  {
    id: "av10",
    category: "Appetiser (Veg)",
    code: "AV10",
    name: "Crispy Veg Rolls",
    variants: [{ name: "Mexican/Italian", price: 299 }]
  },

  {
    id: "av11",
    category: "Appetiser (Veg)",
    code: "AV11",
    name: "Spinach Cheese Pockets",
    variants: [{ name: "Regular", price: 309 }]
  },

  {
    id: "av12",
    category: "Appetiser (Veg)",
    code: "AV12",
    name: "Three Cheese Stuffed Mushrooms",
    variants: [{ name: "Regular", price: 339 }]
  },

  {
    id: "av13",
    category: "Appetiser (Veg)",
    code: "AV13",
    name: "Crispy Corn Salt and Pepper",
    variants: [{ name: "Regular", price: 249 }]
  },

  {
    id: "av14",
    category: "Appetiser (Veg)",
    code: "AV14",
    name: "Mushroom Salt and Pepper",
    variants: [{ name: "Regular", price: 299 }]
  },

  {
    id: "av15",
    category: "Appetiser (Veg)",
    code: "AV15",
    name: "Crispy Mushroom Coriander",
    variants: [{ name: "Regular", price: 319 }]
  },

  {
    id: "av16",
    category: "Appetiser (Veg)",
    code: "AV16",
    name: "Baby Corn/Mushroom/Paneer Chilli Dry",
    variants: [{ name: "Regular", price: 329 }]
  },

  // =========================================================
  // APPETISER - NON VEG
  // =========================================================

  {
    id: "anv1",
    category: "Appetiser (Non-Veg)",
    code: "ANV1",
    name: "Egg Bruschetta",
    variants: [{ name: "Regular", price: 269 }]
  },

  {
    id: "anv2",
    category: "Appetiser (Non-Veg)",
    code: "ANV2",
    name: "Chilli Cheese Toast",
    variants: [{ name: "Chicken", price: 289 }]
  },

  {
    id: "anv3",
    category: "Appetiser (Non-Veg)",
    code: "ANV3",
    name: "Chicken Scotch Eggs",
    variants: [{ name: "Regular", price: 309 }]
  },

  {
    id: "anv4",
    category: "Appetiser (Non-Veg)",
    code: "ANV4",
    name: "Crispy Popcorn",
    variants: [
      { name: "Chicken", price: 309 },
      { name: "Fish", price: 329 },
      { name: "Prawn", price: 359 }
    ]
  },

  {
    id: "anv5",
    category: "Appetiser (Non-Veg)",
    code: "ANV5",
    name: "Peri-peri Chicken Fry",
    variants: [{ name: "Regular", price: 309 }]
  },

  {
    id: "anv6",
    category: "Appetiser (Non-Veg)",
    code: "ANV6",
    name: "Cheesy Chicken Fritters",
    variants: [{ name: "Regular", price: 389 }]
  },

  {
    id: "anv7",
    category: "Appetiser (Non-Veg)",
    code: "ANV7",
    name: "Crispy Chicken Rolls",
    variants: [{ name: "Mexican/Italian", price: 309 }]
  },

  {
    id: "anv8",
    category: "Appetiser (Non-Veg)",
    code: "ANV8",
    name: "Chicken Cutlets",
    variants: [{ name: "Regular", price: 349 }]
  },

  {
    id: "anv9",
    category: "Appetiser (Non-Veg)",
    code: "ANV9",
    name: "Crispy Flaky Chicken Legs",
    variants: [
      { name: "2 pcs", price: 209 },
      { name: "4 pcs", price: 369 }
    ]
  },

  {
    id: "anv10",
    category: "Appetiser (Non-Veg)",
    code: "ANV10",
    name: "BBQ Crispy Flaky Chicken Legs",
    variants: [
      { name: "2 pcs", price: 239 },
      { name: "4 pcs", price: 399 }
    ]
  },

  {
    id: "anv11",
    category: "Appetiser (Non-Veg)",
    code: "ANV11",
    name: "BBQ Chicken Wings",
    variants: [{ name: "Regular", price: 329 }]
  },

  {
    id: "anv12",
    category: "Appetiser (Non-Veg)",
    code: "ANV12",
    name: "Chilli Dry",
    variants: [
      { name: "Chicken", price: 339 },
      { name: "Fish", price: 359 },
      { name: "Prawn", price: 389 }
    ]
  },

  {
    id: "anv13",
    category: "Appetiser (Non-Veg)",
    code: "ANV13",
    name: "Chicken Souvlaki with Tzatziki",
    variants: [{ name: "Regular", price: 409 }]
  },

  {
    id: "anv14",
    category: "Appetiser (Non-Veg)",
    code: "ANV14",
    name: "Baked Stuffed Chicken Rolls",
    variants: [{ name: "Regular", price: 379 }]
  },

  {
    id: "anv15",
    category: "Appetiser (Non-Veg)",
    code: "ANV15",
    name: "Grilled Chicken in Choice of Dressing",
    variants: [
      { name: "Barbecue/Cilantro/Pesto", price: 339 }
    ]
  },

  {
    id: "anv16",
    category: "Appetiser (Non-Veg)",
    code: "ANV16",
    name: "Grilled Fish in Choice of Dressing",
    variants: [
      { name: "Cilantro/Pesto", price: 379 }
    ]
  },

  {
    id: "anv17",
    category: "Appetiser (Non-Veg)",
    code: "ANV17",
    name: "Grilled Prawns in Choice of Dressing",
    variants: [
      { name: "Barbecue/Cilantro/Pesto", price: 419 }
    ]
  },

  {
    id: "anv18",
    category: "Appetiser (Non-Veg)",
    code: "ANV18",
    name: "Fish Fingers",
    variants: [{ name: "Regular", price: 349 }]
  },

  {
    id: "anv19",
    category: "Appetiser (Non-Veg)",
    code: "ANV19",
    name: "Crispy Flaky Fish",
    variants: [{ name: "Regular", price: 369 }]
  },

  {
    id: "anv20",
    category: "Appetiser (Non-Veg)",
    code: "ANV20",
    name: "Fish n Chips",
    variants: [{ name: "Regular", price: 389 }]
  },

  {
    id: "anv21",
    category: "Appetiser (Non-Veg)",
    code: "ANV21",
    name: "Tempura Prawns",
    variants: [{ name: "Regular", price: 419 }]
  },

  {
    id: "anv22",
    category: "Appetiser (Non-Veg)",
    code: "ANV22",
    name: "Crispy Flaky Prawns",
    variants: [{ name: "Regular", price: 419 }]
  },

  {
    id: "anv23",
    category: "Appetiser (Non-Veg)",
    code: "ANV23",
    name: "Butter Garlic Prawns",
    variants: [{ name: "Regular", price: 439 }]
  },

  // =========================================================
  // LARGE PLATE - VEG
  // =========================================================

  {
    id: "lpv1",
    category: "Large Plate (Veg)",
    code: "LPV1",
    name: "Vegetable Paneer Steak",
    variants: [{ name: "Regular", price: 399 }]
  },

  {
    id: "lpv2",
    category: "Large Plate (Veg)",
    code: "LPV2",
    name: "Grilled Stuffed Cottage Cheese Steak",
    variants: [{ name: "Regular", price: 429 }]
  },

  {
    id: "lpv3",
    category: "Large Plate (Veg)",
    code: "LPV3",
    name: "Mushroom Stroganoff",
    variants: [{ name: "Regular", price: 419 }]
  },

  // =========================================================
  // LARGE PLATE - NON VEG
  // =========================================================

  {
    id: "lpnv1",
    category: "Large Plate (Non-Veg)",
    code: "LPNV1",
    name: "Chicken Stroganoff",
    variants: [{ name: "Regular", price: 429 }]
  },

  {
    id: "lpnv2",
    category: "Large Plate (Non-Veg)",
    code: "LPNV2",
    name: "Creamy Tuscan Chicken",
    variants: [{ name: "Regular", price: 449 }]
  },

  {
    id: "lpnv3",
    category: "Large Plate (Non-Veg)",
    code: "LPNV3",
    name: "Grilled Chicken Steak with Pepper Mushroom Sauce",
    variants: [{ name: "Regular", price: 449 }]
  },

  {
    id: "lpnv4",
    category: "Large Plate (Non-Veg)",
    code: "LPNV4",
    name: "Stuffed Chicken Steak",
    variants: [{ name: "Regular", price: 469 }]
  },

  {
    id: "lpnv5",
    category: "Large Plate (Non-Veg)",
    code: "LPNV5",
    name: "Pepper Roasted Chicken Thighs in Wine Pan Sauce",
    variants: [{ name: "Regular", price: 499 }]
  },

  {
    id: "lpnv6",
    category: "Large Plate (Non-Veg)",
    code: "LPNV6",
    name: "Grilled Fish with Lemon Butter Sauce",
    variants: [{ name: "Regular", price: 459 }]
  },

  {
    id: "lpnv7",
    category: "Large Plate (Non-Veg)",
    code: "LPNV7",
    name: "Pan Fillet Fish",
    variants: [{ name: "Regular", price: 459 }]
  },

  {
    id: "lpnv8",
    category: "Large Plate (Non-Veg)",
    code: "LPNV8",
    name: "Butter Garlic Prawns",
    variants: [{ name: "Regular", price: 489 }]
  },

  // =========================================================
  // MEAL BOWLS AND PLATTERS
  // =========================================================

  {
    id: "mp1",
    category: "Meal Bowls and Platters",
    code: "MP1",
    name: "Shepherd's Pie",
    variants: [{ name: "Chicken", price: 439 }]
  },

  {
    id: "mp2",
    category: "Meal Bowls and Platters",
    code: "MP2",
    name: "Grilled Fish in Brown Butter Sauce",
    variants: [{ name: "Regular", price: 469 }]
  },

  {
    id: "mp3",
    category: "Meal Bowls and Platters",
    code: "MP3",
    name: "Grilled Cottage Cheese / Chicken on a bed of Stir-fried Vegetables",
    variants: [
      { name: "Cottage Cheese", price: 419 },
      { name: "Chicken", price: 439 }
    ]
  },

  {
    id: "mp4",
    category: "Meal Bowls and Platters",
    code: "MP4",
    name: "Coriander Paneer / Mushroom / Chicken / Prawn Rice Bowl",
    variants: [
      { name: "Paneer", price: 329 },
      { name: "Mushroom", price: 339 },
      { name: "Chicken", price: 349 },
      { name: "Prawn", price: 429 }
    ]
  },

  {
    id: "mp5",
    category: "Meal Bowls and Platters",
    code: "MP5",
    name: "Chilli Paneer / Mushroom / Chicken / Fish / Prawn Rice Bowl",
    variants: [
      { name: "Paneer", price: 319 },
      { name: "Mushroom", price: 329 },
      { name: "Chicken", price: 339 },
      { name: "Fish", price: 379 },
      { name: "Prawn", price: 419 }
    ]
  },

  {
    id: "mp6",
    category: "Meal Bowls and Platters",
    code: "MP6",
    name: "Chilli Paneer / Mushroom / Chicken / Fish / Prawn Noodles Bowl",
    variants: [
      { name: "Paneer", price: 329 },
      { name: "Mushroom", price: 339 },
      { name: "Chicken", price: 349 },
      { name: "Fish", price: 389 },
      { name: "Prawn", price: 429 }
    ]
  },

  // =========================================================
  // HOT COFFEE
  // =========================================================

  {
    id: "hcc1",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC1",
    name: "Espresso",
    variants: [{ name: "Regular", price: 129 }]
  },

  {
    id: "hcc2",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC2",
    name: "Doppio",
    description: "60ml of Espresso",
    variants: [{ name: "Regular", price: 189 }]
  },

  {
    id: "hcc3",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC3",
    name: "Americano",
    variants: [{ name: "Regular", price: 149 }]
  },

  {
    id: "hcc4",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC4",
    name: "Macchiato",
    variants: [{ name: "Regular", price: 149 }]
  },

  {
    id: "hcc5",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC5",
    name: "Cappuccino",
    variants: [{ name: "Regular", price: 169 }]
  },

  {
    id: "hcc6",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC6",
    name: "Caffè Latte",
    variants: [{ name: "Regular", price: 169 }]
  },

  {
    id: "hcc7",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC7",
    name: "Cortado",
    variants: [{ name: "Regular", price: 199 }]
  },

  {
    id: "hcc8",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC8",
    name: "Flat White",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "hcc9",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC9",
    name: "Affogato Al Caffè",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "hcc10",
    category: "Hot Coffee",
    subcategory: "Classics",
    code: "HCC10",
    name: "Caffè Mocha",
    variants: [{ name: "Regular", price: 199 }]
  },

  {
    id: "hcs1",
    category: "Hot Coffee",
    subcategory: "Specials",
    code: "HCS1",
    name: "Vanilla Cinnamon Coffee",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "hcs2",
    category: "Hot Coffee",
    subcategory: "Specials",
    code: "HCS2",
    name: "Caramel Vanilla Coffee",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "hcs3",
    category: "Hot Coffee",
    subcategory: "Specials",
    code: "HCS3",
    name: "Gingerbread Coffee",
    variants: [{ name: "Regular", price: 249 }]
  },

  {
    id: "hcs4",
    category: "Hot Coffee",
    subcategory: "Specials",
    code: "HCS4",
    name: "Vanilla Inverted Cappuccino",
    variants: [{ name: "Regular", price: 189 }]
  },

  {
    id: "hcs5",
    category: "Hot Coffee",
    subcategory: "Specials",
    code: "HCS5",
    name: "Vietnamese Egg Coffee",
    variants: [{ name: "Regular", price: 219 }]
  },

  // =========================================================
  // ICED COFFEE
  // =========================================================

  {
    id: "ic1",
    category: "Iced Coffee",
    code: "IC1",
    name: "Iced Americano",
    variants: [{ name: "Regular", price: 159 }]
  },

  {
    id: "ic2",
    category: "Iced Coffee",
    code: "IC2",
    name: "Espresso Cola / Tonic",
    variants: [
      { name: "Cola", price: 169 },
      { name: "Tonic", price: 209 }
    ]
  },

  {
    id: "ic3",
    category: "Iced Coffee",
    code: "IC3",
    name: "Coffee Float",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "ic4",
    category: "Iced Coffee",
    code: "IC4",
    name: "Iced Latte",
    variants: [{ name: "Regular", price: 179 }]
  },

  {
    id: "ic5",
    category: "Iced Coffee",
    code: "IC5",
    name: "Iced Mocha",
    variants: [{ name: "Regular", price: 219 }]
  },

  {
    id: "ic6",
    category: "Iced Coffee",
    code: "IC6",
    name: "Classic Cold Coffee",
    variants: [{ name: "Regular", price: 189 }]
  },

  {
    id: "ic7",
    category: "Iced Coffee",
    code: "IC7",
    name: "Strong Classic Cold Coffee",
    variants: [{ name: "Regular", price: 259 }]
  },

  {
    id: "ic8",
    category: "Iced Coffee",
    code: "IC8",
    name: "Frappuccino",
    variants: [{ name: "Regular", price: 229 }]
  },

  {
    id: "ic9",
    category: "Iced Coffee",
    code: "IC9",
    name: "Dark Devil",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "ic10",
    category: "Iced Coffee",
    code: "IC10",
    name: "Iced Vietnamese Coffee",
    variants: [{ name: "Regular", price: 219 }]
  },

  {
    id: "ic11",
    category: "Iced Coffee",
    code: "IC11",
    name: "Iced Orange Coffee",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "ic12",
    category: "Iced Coffee",
    code: "IC12",
    name: "Mojito / Orange Mojito Coffee",
    variants: [
      { name: "Mojito", price: 219 },
      { name: "Orange Mojito", price: 239 }
    ]
  },

  {
    id: "ic13",
    category: "Iced Coffee",
    code: "IC13",
    name: "Spiced Guava Coffee",
    variants: [{ name: "Regular", price: 229 }]
  },

  // =========================================================
  // COFFEE ADD-ONS
  // =========================================================

  {
    id: "ao1",
    category: "Coffee Add-ons",
    code: "AO1",
    name: "Extra Shot Espresso",
    variants: [{ name: "Add-on", price: 59 }]
  },

  {
    id: "ao2",
    category: "Coffee Add-ons",
    code: "AO2",
    name: "Vanilla/Hazelnut/Caramel/Irish Syrup",
    variants: [{ name: "Add-on", price: 39 }]
  },

  {
    id: "ao3",
    category: "Coffee Add-ons",
    code: "AO3",
    name: "Soy/Oat/Almond/Coconut Milk",
    variants: [
      { name: "Soy", price: 69 },
      { name: "Oat", price: 99 },
      { name: "Almond", price: 99 },
      { name: "Coconut", price: 149 }
    ]
  },

  // =========================================================
  // FRAPPÉ
  // =========================================================

  {
    id: "f1",
    category: "Frappé",
    code: "F1",
    name: "Caffè Frappé",
    variants: [{ name: "Regular", price: 199 }]
  },

  {
    id: "f2",
    category: "Frappé",
    code: "F2",
    name: "Choco Frappé",
    variants: [{ name: "Regular", price: 219 }]
  },

  {
    id: "f3",
    category: "Frappé",
    code: "F3",
    name: "Hazelnut/Caramel/Irish Frappé",
    variants: [{ name: "Regular", price: 219 }]
  },

  {
    id: "f4",
    category: "Frappé",
    code: "F4",
    name: "Brownie Frappé",
    description: "Contains egg",
    variants: [{ name: "Regular", price: 239 }]
  },

  // =========================================================
  // MELTED CHOCOLATE
  // =========================================================

  {
    id: "mc1",
    category: "Melted Chocolate",
    code: "MC1",
    name: "Thick Hot Chocolate",
    variants: [{ name: "Regular", price: 219 }]
  },

  {
    id: "mc2",
    category: "Melted Chocolate",
    code: "MC2",
    name: "Spiced Hot Chocolate",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "mc3",
    category: "Melted Chocolate",
    code: "MC3",
    name: "Iced Chocolate",
    variants: [{ name: "Regular", price: 229 }]
  },

  // =========================================================
  // MILKSHAKE
  // =========================================================

  {
    id: "m1",
    category: "Milkshake",
    code: "M1",
    name: "Vanilla / Chocolate Milkshake",
    variants: [
      { name: "Vanilla", price: 189 },
      { name: "Chocolate", price: 209 }
    ]
  },

  {
    id: "m2",
    category: "Milkshake",
    code: "M2",
    name: "Oreo / KitKat Milkshake",
    variants: [
      { name: "Oreo", price: 219 },
      { name: "KitKat", price: 229 }
    ]
  },

  {
    id: "m3",
    category: "Milkshake",
    code: "M3",
    name: "Peanut Butter Milkshake",
    variants: [{ name: "Regular", price: 239 }]
  },

  {
    id: "m4",
    category: "Milkshake",
    code: "M4",
    name: "Nutella Strawberry Milkshake",
    variants: [{ name: "Regular", price: 289 }]
  },

  {
    id: "m5",
    category: "Milkshake",
    code: "M5",
    name: "Chocolate / Nutella Freak-shake",
    variants: [
      { name: "Chocolate", price: 259 },
      { name: "Nutella", price: 279 }
    ]
  },

  // =========================================================
  // HOT TEA
  // =========================================================

  {
    id: "htf1",
    category: "Hot Tea",
    subcategory: "Freshly Brewed",
    code: "HTF1",
    name: "Black Tea",
    variants: [{ name: "Regular", price: 89 }]
  },

  {
    id: "htf2",
    category: "Hot Tea",
    subcategory: "Freshly Brewed",
    code: "HTF2",
    name: "Lemon Tea",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "htf3",
    category: "Hot Tea",
    subcategory: "Freshly Brewed",
    code: "HTF3",
    name: "Adrak/Elaichi/Masala Chai with Milk",
    variants: [{ name: "Regular", price: 109 }]
  },

  {
    id: "htf4",
    category: "Hot Tea",
    subcategory: "Freshly Brewed",
    code: "HTF4",
    name: "Mint Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "htf5",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF5",
    name: "Citrusy Ginger Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 129 }]
  },

  {
    id: "htf6",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF6",
    name: "Ginger Lemon Honey Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "htf7",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF7",
    name: "Tulsi/Basil Honey Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "htf8",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF8",
    name: "Digestive Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 109 }]
  },

  {
    id: "htf9",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF9",
    name: "Immunity Booster Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 149 }]
  },

  {
    id: "htf10",
    category: "Hot Tea",
    subcategory: "Herbal",
    code: "HTF10",
    name: "Virgin Toddy",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 279 }]
  },

  // =========================================================
  // DIP TEA
  // =========================================================

  {
    id: "htd1",
    category: "Dip Tea",
    code: "HTD1",
    name: "Chamomile Tea",
    description: "Zero caffeine",
    variants: [{ name: "Regular", price: 129 }]
  },

  {
    id: "htd2",
    category: "Dip Tea",
    code: "HTD2",
    name: "Green Tea",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "htd3",
    category: "Dip Tea",
    code: "HTD3",
    name: "Assam/Darjeeling Tea",
    variants: [{ name: "Regular", price: 89 }]
  },

  // =========================================================
  // ICED TEA
  // =========================================================

  {
    id: "it1",
    category: "Iced Tea",
    code: "IT1",
    name: "Lemon Iced Tea",
    variants: [{ name: "Regular", price: 159 }]
  },

  {
    id: "it2",
    category: "Iced Tea",
    code: "IT2",
    name: "Basil Lemon Iced Tea",
    variants: [{ name: "Regular", price: 179 }]
  },

  {
    id: "it3",
    category: "Iced Tea",
    code: "IT3",
    name: "Peach / Elderflower Iced Tea",
    variants: [
      { name: "Peach", price: 169 },
      { name: "Elderflower", price: 179 }
    ]
  },

  {
    id: "it4",
    category: "Iced Tea",
    code: "IT4",
    name: "Iced Green Tea",
    variants: [{ name: "Regular", price: 169 }]
  },

  // =========================================================
  // REFRESHER
  // =========================================================

  {
    id: "r1",
    category: "Refresher",
    code: "R1",
    name: "Fresh Lime Water",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "r2",
    category: "Refresher",
    code: "R2",
    name: "Ginger Lime Water",
    variants: [{ name: "Regular", price: 109 }]
  },

  {
    id: "r3",
    category: "Refresher",
    code: "R3",
    name: "Fresh Lime Soda",
    variants: [{ name: "Regular", price: 149 }]
  },

  {
    id: "r4",
    category: "Refresher",
    code: "R4",
    name: "Lemon Soda",
    variants: [
      { name: "Chilli", price: 159 },
      { name: "Ginger", price: 159 },
      { name: "Masala", price: 169 }
    ]
  },

  {
    id: "r5",
    category: "Refresher",
    code: "R5",
    name: "Masala Shikanji",
    variants: [{ name: "Regular", price: 179 }]
  },

  {
    id: "r6",
    category: "Refresher",
    code: "R6",
    name: "Blue Paradise",
    variants: [{ name: "Regular", price: 179 }]
  },

  {
    id: "r7",
    category: "Refresher",
    code: "R7",
    name: "Spiced Guava Kiss",
    variants: [{ name: "Regular", price: 199 }]
  },

  {
    id: "r8",
    category: "Refresher",
    code: "R8",
    name: "Kokum Cooler",
    variants: [{ name: "Regular", price: 169 }]
  },

  {
    id: "r9",
    category: "Refresher",
    code: "R9",
    name: "Brazilian Lemonade",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "r10",
    category: "Refresher",
    code: "R10",
    name: "Sprite / Diet Coke in a Glass",
    variants: [
      { name: "Sprite", price: 79 },
      { name: "Diet Coke", price: 99 }
    ]
  },

  {
    id: "r11",
    category: "Refresher",
    code: "R11",
    name: "Coke Float",
    variants: [{ name: "Regular", price: 179 }]
  },

  // =========================================================
  // MOJITO
  // =========================================================

  {
    id: "m1-mojito",
    category: "Mojito",
    code: "M1",
    name: "Classic / Green Apple Mojito",
    variants: [
      { name: "Classic", price: 169 },
      { name: "Green Apple", price: 179 }
    ]
  },

  {
    id: "m2-mojito",
    category: "Mojito",
    code: "M2",
    name: "Smoked Cinnamon Caramel Mojito",
    variants: [{ name: "Regular", price: 229 }]
  },

  {
    id: "m3-mojito",
    category: "Mojito",
    code: "M3",
    name: "Chilli/Ginger Mojito",
    variants: [{ name: "Regular", price: 189 }]
  },

  {
    id: "m4-mojito",
    category: "Mojito",
    code: "M4",
    name: "Fresh Orange / Watermelon / Seasonal Fruit Mojito",
    variants: [
      { name: "Fresh Orange", price: 199 },
      { name: "Watermelon", price: 199 },
      { name: "Seasonal Fruit", price: 219 }
    ]
  },

  {
    id: "m5-mojito",
    category: "Mojito",
    code: "M5",
    name: "Spiced Orange Mojito",
    variants: [{ name: "Regular", price: 209 }]
  },

  // =========================================================
  // FRESHLY SQUEEZED FRUIT JUICE
  // =========================================================

  {
    id: "j1",
    category: "Freshly Squeezed Fruit Juice",
    code: "J1",
    name: "Watermelon / Orange / Seasonal Fruit Juice",
    variants: [
      { name: "Watermelon", price: 179 },
      { name: "Orange", price: 199 },
      { name: "Seasonal Fruit", price: 219 }
    ]
  },

  // =========================================================
  // SALAD
  // =========================================================

  {
    id: "sa1",
    category: "Salad",
    code: "SA1",
    name: "Caesar Salad",
    variants: [
      { name: "Veg", price: 299 },
      { name: "Egg", price: 309 },
      { name: "Egg-Chicken", price: 329 },
      { name: "Prawn", price: 369 }
    ]
  },

  {
    id: "sa2",
    category: "Salad",
    code: "SA2",
    name: "Italian Toss Salad",
    variants: [
      { name: "Veg", price: 299 },
      { name: "Chicken", price: 329 }
    ]
  },

  {
    id: "sa3",
    category: "Salad",
    code: "SA3",
    name: "Grilled Cottage Cheese Salad",
    variants: [{ name: "Regular", price: 329 }]
  },

  {
    id: "sa4",
    category: "Salad",
    code: "SA4",
    name: "Chicken Tikka Salad",
    variants: [{ name: "Regular", price: 329 }]
  },

  {
    id: "sa5",
    category: "Salad",
    code: "SA5",
    name: "House Salad with Grilled Prawns",
    variants: [{ name: "Regular", price: 379 }]
  },

  {
    id: "sa6",
    category: "Salad",
    code: "SA6",
    name: "Quinoa Salad",
    variants: [
      { name: "Chicken", price: 339 },
      { name: "Prawn", price: 379 }
    ]
  },

  // =========================================================
  // SOUP
  // =========================================================

  {
    id: "so1",
    category: "Soup",
    code: "SO1",
    name: "Roasted Tomato Basil Soup",
    variants: [
      { name: "Small", price: 149 },
      { name: "Regular", price: 189 }
    ]
  },

  {
    id: "so2",
    category: "Soup",
    code: "SO2",
    name: "Roasted Bell Pepper Soup",
    variants: [
      { name: "Small", price: 189 },
      { name: "Regular", price: 239 }
    ]
  },

  {
    id: "so3",
    category: "Soup",
    code: "SO3",
    name: "Nutty Broccoli Soup",
    variants: [
      { name: "Small", price: 179 },
      { name: "Regular", price: 229 }
    ]
  },

  {
    id: "so4",
    category: "Soup",
    code: "SO4",
    name: "Creamy Mushroom Soup",
    variants: [
      { name: "Small", price: 179 },
      { name: "Regular", price: 229 }
    ]
  },

  {
    id: "so5",
    category: "Soup",
    code: "SO5",
    name: "Clear Soup",
    variants: [
      { name: "Veg Small", price: 139 },
      { name: "Veg Regular", price: 189 }
    ]
  },

  {
    id: "so6",
    category: "Soup",
    code: "SO6",
    name: "Clear Soup",
    variants: [
      { name: "Chicken Small", price: 159 },
      { name: "Chicken Regular", price: 209 }
    ]
  },

  {
    id: "so7",
    category: "Soup",
    code: "SO7",
    name: "Burnt Garlic Soup",
    variants: [
      { name: "Veg Small", price: 149 },
      { name: "Veg Regular", price: 199 }
    ]
  },

  {
    id: "so8",
    category: "Soup",
    code: "SO8",
    name: "Exotic Burnt Garlic Soup",
    variants: [
      { name: "Veg Small", price: 169 },
      { name: "Veg Regular", price: 219 }
    ]
  },

  {
    id: "so9",
    category: "Soup",
    code: "SO9",
    name: "Burnt Garlic Soup",
    variants: [
      { name: "Chicken Small", price: 169 },
      { name: "Chicken Regular", price: 219 }
    ]
  },

  {
    id: "so10",
    category: "Soup",
    code: "SO10",
    name: "Exotic Burnt Garlic Soup",
    variants: [
      { name: "Chicken Small", price: 189 },
      { name: "Chicken Regular", price: 239 }
    ]
  },

  {
    id: "so11",
    category: "Soup",
    code: "SO11",
    name: "Manchow Soup",
    variants: [
      { name: "Veg Small", price: 149 },
      { name: "Veg Regular", price: 199 }
    ]
  },

  {
    id: "so12",
    category: "Soup",
    code: "SO12",
    name: "Manchow Soup",
    variants: [
      { name: "Egg-Chicken Small", price: 169 },
      { name: "Egg-Chicken Regular", price: 219 }
    ]
  },

  {
    id: "so13",
    category: "Soup",
    code: "SO13",
    name: "Minestrone Soup",
    variants: [
      { name: "Veg Small", price: 169 },
      { name: "Veg Regular", price: 219 }
    ]
  },

  {
    id: "so14",
    category: "Soup",
    code: "SO14",
    name: "Minestrone Soup",
    variants: [
      { name: "Chicken Small", price: 189 },
      { name: "Chicken Regular", price: 239 }
    ]
  },

  {
    id: "so15",
    category: "Soup",
    code: "SO15",
    name: "French Onion Soup",
    variants: [
      { name: "Veg Small", price: 179 },
      { name: "Veg Regular", price: 229 }
    ]
  },

  {
    id: "so16",
    category: "Soup",
    code: "SO16",
    name: "French Onion Soup",
    variants: [
      { name: "Chicken Small", price: 199 },
      { name: "Chicken Regular", price: 249 }
    ]
  },

  {
    id: "so17",
    category: "Soup",
    code: "SO17",
    name: "Cream of Roasted Chicken Soup",
    variants: [
      { name: "Small", price: 179 },
      { name: "Regular", price: 219 }
    ]
  },

  // =========================================================
  // WRAP
  // =========================================================

  {
    id: "w1",
    category: "Wrap",
    code: "W1",
    name: "Crispy Paneer / Chicken Wrap",
    variants: [
      { name: "Paneer", price: 319 },
      { name: "Chicken", price: 329 }
    ]
  },

  {
    id: "w2",
    category: "Wrap",
    code: "W2",
    name: "Grilled Paneer / Chicken Wrap",
    variants: [
      { name: "Paneer", price: 319 },
      { name: "Chicken", price: 329 }
    ]
  },

  // =========================================================
  // CHOICE OF EGGS WITH BREAD
  // =========================================================

  {
    id: "e1",
    category: "Choice of Eggs with Bread",
    code: "E1",
    name: "Boiled Eggs",
    variants: [{ name: "Regular", price: 99 }]
  },

  {
    id: "e2",
    category: "Choice of Eggs with Bread",
    code: "E2",
    name: "Scrambled Eggs",
    variants: [{ name: "Regular", price: 189 }]
  },

  {
    id: "e3",
    category: "Choice of Eggs with Bread",
    code: "E3",
    name: "Fried Eggs",
    description: "Sunny side up",
    variants: [{ name: "Regular", price: 199 }]
  },

  {
    id: "e4",
    category: "Choice of Eggs with Bread",
    code: "E4",
    name: "Plain / Masala / Mushroom Omelette",
    variants: [
      { name: "Plain", price: 179 },
      { name: "Masala", price: 209 },
      { name: "Mushroom", price: 249 }
    ]
  },

  {
    id: "e5",
    category: "Choice of Eggs with Bread",
    code: "E5",
    name: "Masala / Mushroom / Chicken Cheese Omelette",
    variants: [
      { name: "Masala", price: 229 },
      { name: "Mushroom", price: 269 },
      { name: "Chicken", price: 289 }
    ]
  },

  // =========================================================
  // DESSERT
  // =========================================================

  {
    id: "d1",
    category: "Dessert",
    code: "D1",
    name: "Single Scoop Ice-cream with Chocolate Sauce",
    variants: [
      { name: "Vanilla", price: 69 },
      { name: "Chocolate", price: 109 }
    ]
  },

  {
    id: "d2",
    category: "Dessert",
    code: "D2",
    name: "Chocolate Rolls",
    variants: [{ name: "Regular", price: 319 }]
  },

  {
    id: "d3",
    category: "Dessert",
    code: "D3",
    name: "Steamed Hung Curd with Crispy Old-Town-Khai",
    variants: [{ name: "Regular", price: 259 }]
  },

  {
    id: "d4",
    category: "Dessert",
    code: "D4",
    name: "Brownie with Ice-cream",
    description: "Contains egg",
    variants: [{ name: "Regular", price: 269 }]
  },

  {
    id: "d5",
    category: "Dessert",
    code: "D5",
    name: "Sizzling Brownie with Ice-cream",
    description: "Contains egg",
    variants: [{ name: "Regular", price: 319 }]
  },

  {
    id: "d6",
    category: "Dessert",
    code: "D6",
    name: "Tiramisu",
    description: "Contains egg and alcohol",
    variants: [{ name: "Regular", price: 299 }]
  },

  {
    id: "d7",
    category: "Dessert",
    code: "D7",
    name: "Baked Cheesecake with housemade Caramel Sauce",
    description: "Contains egg",
    variants: [{ name: "Regular", price: 249 }]
  },

  // =========================================================
  // PITHA
  // =========================================================

  {
    id: "pitha1",
    category: "Pitha",
    code: "PITHA1",
    name: "Kakara Pitha",
    description: "A la carte subject to availability; available on pre-order",
    variants: [
      { name: "Plain", price: 39 },
      { name: "Pura", price: 59 }
    ]
  },

  {
    id: "pitha2",
    category: "Pitha",
    code: "PITHA2",
    name: "Khira Podo Pitha",
    description: "A la carte subject to availability; available on pre-order",
    variants: [{ name: "Regular", price: 89 }]
  },

  // =========================================================
  // PIZZA
  // =========================================================

  {
    id: "p1",
    category: "Pizza",
    code: "P1",
    name: "Margarita Pizza",
    variants: [
      { name: "Serves 1", price: 249 },
      { name: "Serves 2", price: 339 }
    ]
  },

  {
    id: "p2",
    category: "Pizza",
    code: "P2",
    name: "Veg Lovers' Pizza",
    variants: [
      { name: "Serves 1", price: 299 },
      { name: "Serves 2", price: 399 }
    ]
  },

  {
    id: "p3",
    category: "Pizza",
    code: "P3",
    name: "Italian Grilled Veg Pizza",
    variants: [
      { name: "Serves 1", price: 289 },
      { name: "Serves 2", price: 389 }
    ]
  },

  {
    id: "p4",
    category: "Pizza",
    code: "P4",
    name: "Mexican Veg Pizza",
    variants: [
      { name: "Serves 1", price: 279 },
      { name: "Serves 2", price: 379 }
    ]
  },

  {
    id: "p5",
    category: "Pizza",
    code: "P5",
    name: "Paneer Tikka Pizza",
    variants: [
      { name: "Serves 1", price: 289 },
      { name: "Serves 2", price: 399 }
    ]
  },

  {
    id: "p6",
    category: "Pizza",
    code: "P6",
    name: "Sautéed Mushroom Pizza",
    variants: [
      { name: "Serves 1", price: 299 },
      { name: "Serves 2", price: 399 }
    ]
  },

  {
    id: "p7",
    category: "Pizza",
    code: "P7",
    name: "Pizza Bianca Veg",
    description:
      "White Pizza topped with Olive oil and Garlic, herbs, Caramelized Onions, Mushrooms, Sun-dried Tomatoes, and sliced Almonds",
    variants: [
      { name: "Serves 1", price: 309 },
      { name: "Serves 2", price: 419 }
    ]
  },

  {
    id: "p8",
    category: "Pizza",
    code: "P8",
    name: "Pizza Bianca Chicken",
    description:
      "White Pizza topped with Olive oil and Garlic, herbs, marinated Chicken, Sun-dried Tomatoes, and sliced Almonds",
    variants: [
      { name: "Serves 1", price: 349 },
      { name: "Serves 2", price: 459 }
    ]
  },

  {
    id: "p9",
    category: "Pizza",
    code: "P9",
    name: "BBQ Chicken Pizza",
    variants: [
      { name: "Serves 1", price: 329 },
      { name: "Serves 2", price: 439 }
    ]
  },

  {
    id: "p10",
    category: "Pizza",
    code: "P10",
    name: "Chicken Tikka Pizza",
    variants: [
      { name: "Serves 1", price: 319 },
      { name: "Serves 2", price: 419 }
    ]
  },

  {
    id: "p11",
    category: "Pizza",
    code: "P11",
    name: "Mexican Chicken Pizza",
    variants: [
      { name: "Serves 1", price: 309 },
      { name: "Serves 2", price: 409 }
    ]
  },

  {
    id: "p12",
    category: "Pizza",
    code: "P12",
    name: "Italian Grilled Chicken Pizza",
    variants: [
      { name: "Serves 1", price: 319 },
      { name: "Serves 2", price: 419 }
    ]
  },

  {
    id: "p13",
    category: "Pizza",
    code: "P13",
    name: "Chicken Lovers' Pizza",
    variants: [
      { name: "Serves 1", price: 339 },
      { name: "Serves 2", price: 449 }
    ]
  },

  {
    id: "p14",
    category: "Pizza",
    code: "P14",
    name: "Seafood Pizza",
    variants: [
      { name: "Serves 1", price: 409 },
      { name: "Serves 2", price: 509 }
    ]
  },

  // =========================================================
  // BURGER
  // =========================================================

  {
    id: "b1",
    category: "Burger",
    code: "B1",
    name: "Potato Cheese / Vegetable Paneer Patty Burger",
    variants: [
      { name: "Potato Cheese", price: 279 },
      { name: "Vegetable Paneer Patty", price: 309 }
    ]
  },

  {
    id: "b2",
    category: "Burger",
    code: "B2",
    name: "Crispy Fried Chicken Cheese Patty Burger",
    variants: [{ name: "Regular", price: 339 }]
  },

  {
    id: "b3",
    category: "Burger",
    code: "B3",
    name: "Crispy Paneer / Fish / Prawn Burger",
    variants: [
      { name: "Paneer", price: 319 },
      { name: "Fish", price: 369 },
      { name: "Prawn", price: 399 }
    ]
  },

  {
    id: "b4",
    category: "Burger",
    code: "B4",
    name: "Chicken Steak Burger",
    variants: [{ name: "Regular", price: 339 }]
  },

  {
    id: "b5",
    category: "Burger",
    code: "B5",
    name: "Special Grilled Chicken Burger with fried egg",
    variants: [{ name: "Regular", price: 359 }]
  },

  // =========================================================
  // GRILLED SANDWICH
  // =========================================================

  {
    id: "s1",
    category: "Grilled Sandwich",
    code: "S1",
    name: "Cheese",
    variants: [{ name: "Regular", price: 209 }]
  },

  {
    id: "s2",
    category: "Grilled Sandwich",
    code: "S2",
    name: "Veg Cheese",
    variants: [{ name: "Regular", price: 229 }]
  },

  {
    id: "s3",
    category: "Grilled Sandwich",
    code: "S3",
    name: "Spinach Corn Cheese",
    variants: [{ name: "Regular", price: 289 }]
  },

  {
    id: "s4",
    category: "Grilled Sandwich",
    code: "S4",
    name: "Mexican Veg / Chicken Cheese",
    variants: [
      { name: "Veg", price: 259 },
      { name: "Chicken", price: 269 }
    ]
  },

  {
    id: "s5",
    category: "Grilled Sandwich",
    code: "S5",
    name: "Italian Cottage Cheese / Mushroom / Chicken Cheese",
    variants: [
      { name: "Cottage Cheese", price: 269 },
      { name: "Mushroom", price: 279 },
      { name: "Chicken", price: 289 }
    ]
  },

  {
    id: "s6",
    category: "Grilled Sandwich",
    code: "S6",
    name: "Pesto Cottage Cheese / Mushroom / Chicken Cheese",
    variants: [
      { name: "Cottage Cheese", price: 269 },
      { name: "Mushroom", price: 279 },
      { name: "Chicken", price: 289 }
    ]
  },

  {
    id: "s7",
    category: "Grilled Sandwich",
    code: "S7",
    name: "Paneer / Chicken Tikka Cheese",
    variants: [
      { name: "Paneer", price: 289 },
      { name: "Chicken", price: 299 }
    ]
  },

  {
    id: "s8",
    category: "Grilled Sandwich",
    code: "S8",
    name: "Creamy Egg / Chicken / Egg-chicken Cheese",
    variants: [
      { name: "Egg", price: 269 },
      { name: "Chicken", price: 289 },
      { name: "Egg-Chicken", price: 299 }
    ]
  }
];

export default menuData;