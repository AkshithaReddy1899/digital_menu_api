const PORT = 8000;

const express = require("express");
const bodyParser = require("body-parser");
const uid = require("uuid");
const router = express.Router();
const serverless = require("serverless-http");

const categories = [
  {
    id: 0,
    name: "cityam",
    address:
      "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/",
    base: "",
  },
  {
    id: 1,
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
    base: "",
  },
  {
    id: 2,
    name: "guardian",
    address: "https://www.theguardian.com/environment/climate-crisis",
    base: "",
  },
  {
    id: 3,
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
    base: "https://www.telegraph.co.uk",
  },
  {
    id: 4,
    name: "nyt",
    address: "https://www.nytimes.com/international/section/climate",
    base: "",
  },
  {
    id: 5,
    name: "latimes",
    address: "https://www.latimes.com/environment",
    base: "",
  },
];

const menu = [
  {
    id: 1,
    categoryId: 0,
    name: "asdf",
    description: "wertygfv",
    price: 350.0,
  },
  {
    id: 2,
    categoryId: 3,
    name: "asdf@#",
    description: "wertygfv$#%^&*UYHGf",
    price: 350.0,
  },
];

const orders = [
  {
    id: 1,
    items: [
      {
        categoryId: 0,
        name: "asdf",
        description: "awd",
        price: 350.0,
        quantity: 1,
        customization: "",
        orderStatus: "Placed",
      },
      {
        categoryId: 0,
        name: "asdf",
        description: "awd",
        price: 350.0,
        quantity: 1,
        customization: "",
        orderStatus: "Placed",
      },
    ],
  },
];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

// initial route

router.get("/", (req, res) => {
  res.json("Digital menu api");
});

// Categories getall

router.get("/categories", (req, res) => {
  res.status(200).json({ message: "Success!", body: categories });
});

// Add a new categories

router.post("/categories", (req, res) => {
  const item = {
    id: uid.v1(),
    name: req.body.name,
    address: req.body.address,
  };

  categories.push(item);

  if (
    req.body.name != null &&
    req.body.name != " " &&
    req.body.address != null &&
    req.body.address != " "
  ) {
    res.status(200).json({ message: "Success!", body: categories });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Categories update

router.put("/categories/:id", (req, res) => {
  const item = categories.find((item) => item.id == req.params.id);

  if (item) {
    item.name = req.body.name;
    item.address = req.body.address;
  }

  if (
    req.body.name != null &&
    req.body.name != " " &&
    req.body.address != null &&
    req.body.address != " "
  ) {
    res.status(200).json({ message: "Success!", body: categories });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Categories delete

router.delete("/categories/:id", (req, res) => {
  const item = categories.find((item) => item.id == req.params.id);
  var list = categories.filter((obj) => obj.id != item.id);

  res.status(200).json({ message: "Success!", body: list });
});

// menu getall

router.get("/menu", (req, res) => {
  res.status(200).json({ message: "Success!", body: menu });
});

// Add a new item to menu

router.post("/menu", (req, res) => {
  const item = {
    id: uid.v1(),
    categoryId: req.body.categoryId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  menu.push(item);

  if (
    req.body.name != null &&
    req.body.categoryId != null &&
    req.body.description != null &&
    req.body.price != null
  ) {
    res.status(200).json({ message: "Success!", body: menu });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Update menu

router.put("/menu/:id", (req, res) => {
  const item = menu.find((item) => item.id == req.params.id);

  if (item) {
    item.name = req.body.name;
    item.categoryId = req.body.categoryId;
    item.description = req.body.description;
    item.price = req.body.price;
  }

  if (
    req.body.name != null &&
    req.body.categoryId != null &&
    req.body.description != null &&
    req.body.price != null
  ) {
    res.status(200).json({ message: "Success!", body: menu });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Delete item

router.delete("/menu/:id", (req, res) => {
  const item = menu.find((item) => item.id == req.params.id);
  var list = menu.filter((obj) => obj.id != item.id);

  res.status(200).json({ message: "Success!", body: list });
});

// Get all orders

router.get("/order", (req, res) => {
  res.status(200).json({ message: "Success!", body: orders });
});

// Add a new order

router.post("/order", (req, res) => {
  const item = {
    id: uid.v1(),
    items: req.body.items,
  };

  orders.push(item);
  if (req.body.items != null) {
    res.status(200).json({ message: "Success!", body: orders });
  } else {
    res.status(404).json({ message: "Missing parameters" });
  }
});

// Delete order

router.delete("/order/:id", (req, res) => {
  const item = orders.find((item) => item.id == req.params.id);
  var list = orders.filter((obj) => obj.id != item.id);

  res.status(200).json({ message: "Success!", body: list });
});

module.exports = app;
module.exports.handler = serverless(app);
