const PORT = 8000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const uid = require("uuid");
const router = express.Router();
const serverless = require("serverless-http");

const app = express();
app.use(cors({origin: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

const categories = ["Main", "Dessert", "Drinks", "Starters", "Breads", "Rice"];

const menu = [
  {
    id: 2,
    categoryName: "Main",
    name: "Paneer Majestic",
    description:
      "Paneer strips lightly coated in a flavoursome turmeric batter, which is then fried and tossed in an amalgam of spices and mint leaves and finally swathed in a sauce infused with lemon juice and seasoning.",
    price: 255.0,
  },
  {
    id: 3,
    categoryName: "Main",
    name: "Harabhara Masala",
    description:
      "Scrumptious creamy spinach fenugreek gravy with dipped Deep-fried vegetable balls.",
    price: 235.0,
  },
  {
    id: 4,
    categoryName: "Main",
    name: "Kadai Paneer",
    description:
      "Stir-fried cottage cheese, capsicum, and onions cooked in spicy red gravy.",
    price: 235.0,
  },
  {
    id: 5,
    categoryName: "Main",
    name: "Kaju Butter Masala",
    description:
      "A buttery, smooth, masala-based curry that features roasted cashew nuts as its main ingredient.",
    price: 240.0,
  },
  {
    id: 6,
    categoryName: "Main",
    name: "Kaju Paneer",
    description:
      "Rich, creamy and tanalizing curry of paneer and cashew nuts that will tickle your taste buds.",
    price: 235.0,
  },
  {
    id: 7,
    categoryName: "Main",
    name: "Malai Kofta",
    description:
      "Kofta balls made of potato filled with cottage cheese in it are then deep fried and served with rich creamy spiced tomato based curry.",
    price: 230.0,
  },
  {
    id: 8,
    categoryName: "Main",
    name: "Aloo Gobi Masala",
    description:
      "Traditional mix of potatoes and cauliflower cooked with the simplest tampering of common spices.",
    price: 195.0,
  },
  {
    id: 9,
    categoryName: "Main",
    name: "Butter Dal",
    description:
      "Smooth and flavourful blend of lentils and aromatic spices, enriched with creamy butter, offering a delightful twist of traditional dal.",
    price: 175.0,
  },
  {
    id: 10,
    categoryName: "Main",
    name: "Veg Kolhapuri",
    description:
      "Atangy and zesty preparation of assorted vegetables cooked along with chopped onions, tomatoes and capsicum.",
    price: 220.0,
  },
  {
    id: 11,
    categoryName: "Main",
    name: "Paneer Butter Masala",
    description:
      "Chunks of cottage cheese cooked in a dense butter-filled gravy of tomatoes, onion and spices.",
    price: 230.0,
  },
  {
    id: 12,
    categoryName: "Starters",
    name: "Veg Manchurian Dry",
    description:
      "Deep fried cauliflower florets tossed in Chinese sauces garnished with fresh spring onions.",
    price: 215.0,
  },
  {
    id: 13,
    categoryName: "Starters",
    name: "Baby Corn Manchurian",
    description: "Deep fried baby corn dumplings tossed in Chinese sauces.",
    price: 240.0,
  },
  {
    id: 14,
    categoryName: "Starters",
    name: "Crispy Corn",
    description: "Fries corn kernels tossed in chilli garlic paste.",
    price: 280.0,
  },
  {
    id: 15,
    categoryName: "Starters",
    name: "Chilly Paneer",
    description:
      "Freshly diced Cottage cheese mixed with tangy-zesty spices along with chopped capsicum, tomatoes and onions. ",
    price: 310.0,
  },
  {
    id: 16,
    categoryName: "Starters",
    name: "Paneer Tikka Masala",
    description: "Grilled chunks of cottage cheese in a spicy Indian gravy.",
    price: 320.0,
  },
  {
    id: 17,
    categoryName: "Starters",
    name: "Hara Bhara Kebab",
    description:
      "Deep fries potato dumplings filled with spinach, corn, and cabbage tossed in Indian spices and served with mint chutney.",
    price: 320.0,
  },
  {
    id: 18,
    categoryName: "Starters",
    name: "Khaman Dhokla",
    description:
      "A soft, fluffy, Savory steamed cake made from gram flour spiced, topped with zested sugar solution tossed along with mustard seeds and garnished with freshly chopped coriander and served with mint chutney.",
    price: 240.0,
  },
  {
    id: 19,
    categoryName: "Starters",
    name: "Achari Paneer Tikka",
    description:
      "Fresh cubes of cottage cheese marinated in achari masala, along with yoghurt and other spices which is then skewered along with pieces of onions, bell pepper and tomato and grilled over a charcoal fire until it is crispy.",
    price: 350.0,
  },
  {
    id: 20,
    categoryName: "Breads",
    name: "Tandoori Roti",
    description:
      "Flatten bread made with whole wheat and all-purpose flour in a clay oven at a high temperature.",
    price: 70.0,
  },
  {
    id: 21,
    categoryName: "Breads",
    name: "Butter Roti",
    description: "Thin and round unleavened flatbread topped with butter.",
    price: 50.0,
  },
  {
    id: 22,
    categoryName: "Breads",
    name: "Rumali Roti",
    description:
      "Extra large and super thin unleavened flatbread made on an upturned wok.",
    price: 80.0,
  },
  {
    id: 23,
    categoryName: "Breads",
    name: "Butter Naan",
    description:
      "Crispy and flaky layered flatbread topped with generous butter.",
    price: 90.0,
  },
  {
    id: 24,
    categoryName: "Breads",
    name: "Kothmir Butter Naan ",
    description:
      "Crispy, flaky, layered coriander-flavoured whole wheat bread served with butter",
    price: 110.0,
  },
  {
    id: 25,
    categoryName: "Breads",
    name: "Lacha Paratha",
    description: "Crispy, flaky multi-layered shallow fried flatbread.",
    price: 80.0,
  },
  {
    id: 26,
    categoryName: "Breads",
    name: "Plain Paratha",
    description: "Layered whole wheat flatbread.",
    price: 60.0,
  },
  {
    id: 27,
    categoryName: "Breads",
    name: " Butter Garlic Naan",
    description:
      "Crispy, flaky, layered garlic flavoured whole wheat bread served with butter",
    price: 110.0,
  },
  {
    id: 28,
    categoryName: "Rice",
    name: "Steamed Rice",
    description: "Steamed basmati rice",
    price: 150.0,
  },
  {
    id: 29,
    categoryName: "Rice",
    name: "Dal Khichdi",
    description: "Simple Indian delicacy of rice and lentils ",
    price: 200.0,
  },
  {
    id: 30,
    categoryName: "Rice",
    name: "Curd Rice",
    description:
      "Refreshing and light dish prepared by adding cooked rice to tempered curd, garnished along with cashew nuts, pomegranate and garnished with freshly chopped coriander.",
    price: 180.0,
  },
  {
    id: 31,
    categoryName: "Rice",
    name: "Jeera Rice",
    description:
      "Steamed white rice tempered with cumin seeds in clarified butter.",
    price: 180.0,
  },
  {
    id: 32,
    categoryName: "Rice",
    name: "Lemon Rice",
    description:
      "Tangy lemon rice with hints of groundnuts and delicately spiced.",
    price: 185.0,
  },
  {
    id: 33,
    categoryName: "Rice",
    name: "Dum Biryani",
    description:
      "A medley of basmati rice, veggies and rich aromatic Indian spices cooked in the traditional dum style.",
    price: 280.0,
  },
  {
    id: 34,
    categoryName: "Rice",
    name: "Veg Biryani",
    description:
      "All perfectly cooked basmati rice along with veggies with seasoned traditional Indian spices.",
    price: 240.0,
  },
  {
    id: 35,
    categoryName: "Rice",
    name: "Veg Fried Rice",
    description:
      "White rice stir-fried in a wok and is usually mixed with Chinese sauces and vegetables.",
    price: 180.0,
  },
  {
    id: 36,
    categoryName: "Rice",
    name: "Mushroom Fried Rice",
    description:
      "White rice stir-fried in a wok and is usually mixed with Chinese sauces, marinated Mushroom florets and vegetables.",
    price: 220.0,
  },
  {
    id: 37,
    categoryName: "Rice",
    name: "Schezwan Fried Rice",
    description:
      "Schewzan fries rice is hot & spicy with bursting flavours of ginger, garlic, soy sauce and red chilly paste.",
    price: 200.0,
  },
  {
    id: 38,
    categoryName: "Rice",
    name: "Ghee Rice",
    description:
      "Steamed rice topped with loads of aromatic clarified butter tempered along with clove, bay leaf and pepper balls to give it an amazing touch of spiciness.",
    price: 180.0,
  },
  {
    id: 39,
    categoryName: "Drinks",
    name: "Butter Milk",
    description:
      "Buttermilk is churned curd with water for the perfect consistency with tempered spices to add up the taste.",
    price: 70.0,
  },
  {
    id: 40,
    categoryName: "Drinks",
    name: "Sweet Lassi",
    description:
      "Lassi is churned curd with thick consistency added with sugar to give it a sweet flavour and a hint of Eliachi to give it a rich taste.",
    price: 110.0,
  },
  {
    id: 41,
    categoryName: "Drinks",
    name: "Salted Lassi",
    description:
      "Lassi is churned curd with thick consistency added with salt to give it a salty flavour and a hint of  roasted cumin seed powder to give it a rich taste.",
    price: 110.0,
  },
  {
    id: 42,
    categoryName: "Drinks",
    name: "Mint Lime",
    description:
      "A refreshing and delightful drink that consists of lime juice with a hint of mint leaves just to give it the perfect taste.",
    price: 130.0,
  },
  {
    id: 43,
    categoryName: "Drinks",
    name: "Spcied Butter Milk",
    description:
      "Buttermilk is churned curd with water for the perfect consistency with tempered spices (ginger, chilly, pepper balls, mint leaves) to add up the taste ",
    price: 100.0,
  },
  {
    id: 44,
    categoryName: "Drinks",
    name: "ABC Corp cold Pressed Juice",
    descri4ption:
      "Apple, Beetroot, Carrot cold pressed pure juice with no added water or sugar.",
    price: 160.0,
  },
  {
    id: 45,
    categoryName: "Drinks",
    name: "Hawaiian Welcome",
    description: "Cold Pressed Pineapple Juice with no added water or sugar.",
    price: 160.0,
  },
  {
    id: 46,
    categoryName: "Drinks",
    name: "ABC Ginger Bite",
    description:
      "Apple, beetroot, carrot cold pressed juice with a dash of ginger and no water or sugar. ",
    price: 180.0,
  },
  {
    id: 47,
    categoryName: "Drinks",
    name: "Bunny Poems",
    description:
      "Carrots, pomegranates cold pressed juice with no water or sugar.",
    price: 200.0,
  },
  {
    id: 48,
    categoryName: "Drinks",
    name: "Dr Goodbye Cold",
    description:
      "Carrots, pomegranates and apples are a crazy mixture of cold pressed juice to shoo away your cold with no water or sugar.",
    price: 240.0,
  },
  {
    id: 49,
    categoryName: "Drinks",
    name: "Just Orange",
    description:
      "Exotic Valencia orange cold pressed juice with no added sugar or water.",
    price: 200.0,
  },
  {
    id: 50,
    categoryName: "Drinks",
    name: "Scarlet Red",
    description:
      "Pomegrantes with beetroot cold pressed with no added water or sugar.",
    price: 220.0,
  },
  {
    id: 51,
    categoryName: "Drinks",
    name: "Merry Go, Berry",
    description:
      "A smoothie blend of cold-pressed Banana, Apple, and assorted berries with no added water or sugar.",
    price: 280.0,
  },
  {
    id: 52,
    categoryName: "Drinks",
    name: "Watermelon Strawberry",
    description:
      "A smoothie blend of watermelon and strawberry with no added sugar or water.",
    price: 300.0,
  },
  {
    id: 53,
    categoryName: "Dessert",
    name: "Tropical Bowl",
    description:
      "A smoothie bowl with available tropical fruits like banana,chikoo, papaya, pineapple, pomegranate, chia seeds and honey with fruit slices and granola toppings.",
    price: 350.0,
  },
  {
    id: 54,
    categoryName: "Dessert",
    name: "Yogo Berry Bowl",
    description:
      "A smoothie bowl of banana, berries, pomegranate, chia seeds, yoghurt and honey with apple slices and granola toppings.",
    price: 350.0,
  },
  {
    id: 55,
    categoryName: "Dessert",
    name: "Chocolate Muffins",
    description: "Chocolate flavoured Muffins",
    price: 150.0,
  },
  {
    id: 56,
    categoryName: "Dessert",
    name: "Chocolate Brownie",
    description: "Chocolate Brownie cake topped with hot chocolate. ",
    price: 220.0,
  },
  {
    id: 57,
    categoryName: "Dessert",
    name: "Death by Chocolate",
    description:
      "Delicious chocolate pastry topped with Vanilla ice cream, chocolate ice cream and loaded with chocolate fudge.",
    price: 260.0,
  },
  {
    id: 58,
    categoryName: "Dessert",
    name: "Fruit Exotica",
    description:
      "Classic combination of Vanilla, Strawberry and Black Grape ice cream mixed with juicy apple, pineapple, litchee and kiwi fruits.",
    price: 310.0,
  },
  {
    id: 59,
    categoryName: "Dessert",
    name: "Arabian Nights",
    description:
      "Nutty Dry fruit flavoured ice cream mixed with premium anjeer and date paste and roasted cashew nuts.",
    price: 350.0,
  },
  {
    id: 60,
    categoryName: "Dessert",
    name: "Candy Land",
    description:
      "Scrumptious combination of Vanilla and strawberry ice cream mixed with colourful gems, jujubes, jellies and crunchy choco chips.",
    price: 330.0,
  },
  {
    id: 61,
    categoryName: "Dessert",
    name: "Red Velvet Pastry",
    description: "Red Velvet Pastry.",
    price: 180.0,
  },
];


const orders = [
  {
    ordersId: 1,
    dateTime: 1700118350667,
    items: [
      {
        categoryName: "Main",
        orderId: 1,
        id: 5,
        name: "Kaju Butter Masala",
        description: "A buttery, smooth, masala-based curry that features roasted cashew nuts as its main ingredient.",
        price: 240.0,
        quantity: 1,
        customization: "",
        orderStatus: "Placed",
      },
      {
        categoryName: "Main",
        orderId: 1,
        id: 31,
        name: "Jeera Rice",
        description: "Steamed white rice tempered with cumin seeds in clarified butter.",
        price: 180.0,
        quantity: 1,
        customization: "",
        orderStatus: "Accepted",
      },
      
    ],
  },
  {
    ordersId: 2,
    dateTime: 1700118350667,
    items: [
      {
        categoryName: "Dessert",
        orderId: 2,
        id: 59,
        name: "Arabian Nights",
        description: "Nutty Dry fruit flavoured ice cream mixed with premium anjeer and date paste and roasted cashew nuts.",
        price: 350.0,
        quantity: 1,
        customization: "",
        orderStatus: "Placed",
      },
      {
        categoryName: "Dessert",
        orderId: 2,
        id: 61,
        name: "Red Velvet Pastry",
        description: "Red Velvet Pastry",
        price: 180.0,
        quantity: 2,
        customization: "",
        orderStatus: "Accepted",
      },
    ],
  },
];

router.get("/", (req, res) => {
  res.json("Digital menu api");
});

// Categories getall

router.get("/categories", (req, res) => {
  console.log(req);
  res.status(200).json({ message: "Success!", object: {categories : categories} });
});

// Add a new categories

router.post("/categories", (req, res) => {
  console.log(req.body.categoryName);

  console.log(req);
  if (req.body.categoryName != null) {
    categories.push(req.body.categoryName);
    res.status(200).json({ message: "Success!", object: {categories : categories} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Categories update

router.put("/categories/:categoryName", (req, res) => {

  let index ;

  if(categories.includes(req.params.categoryName)) {
  index = categories.indexOf(req.params.categoryName);
  }

  if(index >= 0) {
   console.log(categories[index]);
    categories[index] = req.body.categoryName;
    console.log(categories[index]);
  }

  if (req.body.categoryName != null && req.body.categoryName != " ") {
    res.status(200).json({ message: "Success!", object: {categories : categories} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Categories delete

router.delete("/categories/:categoryName", (req, res) => {
  let index ;

  if(categories.includes(req.params.categoryName)) {
  index = categories.indexOf(req.params.categoryName);
  }
if(index >= 0) {
  categories.splice(index, 1);
}
  if (req.params.categoryName != null && req.params.categoryName != " ") {
    res.status(200).json({ message: "Success!", object: {categories : categories} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// menu getall

router.get("/menu", (req, res) => {
  res.status(200).json({ message: "Success!", object: {menu : menu} });
});

// Add a new item to menu

router.post("/menu", (req, res) => {
  const item = {
    id: Date.now(),
    categoryName: req.body.categoryName,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  menu.push(item);

  if (
    req.body.name != null &&
    req.body.categoryName != null &&
    req.body.description != null &&
    req.body.price != null
  ) {
    res.status(200).json({ message: "Success!", object: {menu : menu} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Update menu

router.put("/menu/:id", (req, res) => {
  const item = menu.find((item) => item.id == req.params.id);

  console.log(item);

  if (item) {
    item.name = req.body.name;
    item.categoryName = req.body.categoryName;
    item.description = req.body.description;
    item.price = req.body.price;
  }

  if (
    req.body.name != null &&
    req.body.categoryName != null &&
    req.body.description != null &&
    req.body.price != null
  ) {
    res.status(200).json({ message: "Success!", object: {menu : menu} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Delete item

router.delete("/menu/:id", (req, res) => {
 menu.find((item) => item.id == req.params.id);

  for(let i = 0; i < menu.length; i++) {
    if(menu[i]["id"] == req.params.id) {
      menu.splice(i, 1);
    }
  }

  if (req.params.id != null
  ) {
    res.status(200).json({ message: "Success!", object: {menu : menu} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }

});

// Get all orders

router.get("/order", (req, res) => {
  res.status(200).json({ message: "Success!", object: {orders : orders} });
});

// Add a new order

router.post("/order", (req, res) => {
  const item = {
    id: Date.now(),
    dateTime : Date.now(),
    items: req.body.items,
  };

  for(let i = 0; i < req.body.items.length; i ++) {
    req.body.items[i].ordersId = item.id;
  }

  orders.push(item);
  if (req.body.items != null) {
    res.status(200).json({ message: "Success!", object: {orders : orders} });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Update order

router.put("/order/:ordersId", (req, res) => {
  const item = orders.find((item) => item.ordersId == req.params.ordersId);
  
  console.log(item);

  console.log(item['items']);

  const order = item['items'].find((ord) => ord.id == req.body.id);



  console.log(item);

  if(order) {
    order.categoryName = req.body.categoryName,
    order.name = req.body.name,
    order.description = req.body.description,
    order.price = req.body.price,
    order.quantity = req.body.quantity,
    order.orderStatus = req.body.orderStatus
  }

  if (req.body.orderStatus != null
  ) {
    res.status(200).json({ message: "Success!", body: orders });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }

  console.log(item);

});


module.exports = app;
module.exports.handler = serverless(app);

