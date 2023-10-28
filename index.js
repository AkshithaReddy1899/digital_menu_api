const PORT = 8000;

const express = require("express");
const bodyParser = require('body-parser');
const uid = require("uuid");

const newspapers = [
		{
			 id: 0,
				name: 'cityam',
				address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
				base: ''
		},
		{
			id: 1,
				name: 'thetimes',
				address: 'https://www.thetimes.co.uk/environment/climate-change',
				base: ''
		},
		{
			id: 2,
				name: 'guardian',
				address: 'https://www.theguardian.com/environment/climate-crisis',
				base: '',
		},
		{
			id: 3,
				name: 'telegraph',
				address: 'https://www.telegraph.co.uk/climate-change',
				base: 'https://www.telegraph.co.uk',
		},
		{
			id: 4,
				name: 'nyt',
				address: 'https://www.nytimes.com/international/section/climate',
				base: '',
		},
		{
			id: 5,
				name: 'latimes',
				address: 'https://www.latimes.com/environment',
				base: '',
		},
	]

	const menu = [
		{
			id: 1,
			categoryId: 0,
			name: 'asdf',
			description: "wertygfv",
			price: 350.00,
		},
		{
			id: 2,
			categoryId: 3,
			name: 'asdf@#',
			description: "wertygfv$#%^&*UYHGf",
			price: 350.00,
		},
	]

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Categories getall

app.get("/categories", (req, res) => {
	res.json(newspapers);
});

// Add a new categories

app.post("/categories", (req, res) => {
	const item = {
		id: uid.v1(),
		name: req.body.name,
		address: req.body.address
	}

	newspapers.push(item);
	res.json(newspapers);
});

// Categories update

app.put("/categories/:id", (req, res) => {
	const item = newspapers.find((item) => item.id == req.params.id);

	console.log(req.body);
	console.log(req.body.name);

	if(item) {
		item.name = req.body.name;
		item.address = req.body.address;
	}

	res.json(newspapers);
});

// Categories delete

app.delete("/categories/:id", (req, res) => {
	const item = newspapers.find((item) => item.id == req.params.id);
	var list = newspapers.filter((obj) => obj.id  != item.id);

	res.send(list);
})

// menu getall

app.get("/menu", (req, res) => {
	res.json(menu);
});

// Add a new item to menu

app.post("/menu", (req, res) => {
	const item = {
		id: uid.v1(),
		categoryId : req.body.categoryId,
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
	}

	console.log(req.body.categoryId);

	menu.push(item);
	res.json(menu);
})

// Update menu

app.put("/menu/:id", (req,res) => {
	const item = menu.find((item) => item.id == req.params.id);
	console.log(item);
	console.log(req.body);

	if(item) {
		item.name = req.body.name;
		item.categoryId = req.body.categoryId;
		item.description = req.body.description;
		item.price = req.body.price;
	}

	res.json(menu);	
})

// Delete item

app.delete("/menu/:id", (req, res) => {
	const item = menu.find((item) => item.id == req.params.id);
	var list = menu.filter((obj) => obj.id  != item.id);

	res.send(list);
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))

