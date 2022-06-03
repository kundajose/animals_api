const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());
const animals = [
  {
    id: 1,
    age: 18,
    name: "Gorilla",
    park: "vilunga",
    sunRise: 2004,
  },
  {
    id: 2,
    age: 8,
    name: "monkey",
    park: "vilunga",
    sunRise: 2016,
  },
  {
    id: 3,
    age: 80,
    name: "snake",
    park: "Akagera",
    sunRise: 1940,
  },
  {
    id: 4,
    age: 20,
    name: "Zebra",
    park: "Akagera",
    sunRise: 2002,
  },
];

// bring all course
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/animals", (req, res) => {
  res.send(animals);
});

app.post("/api/animals", (req, res) => {
  const { error } = validateAnimal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const animal = {
    id: animals.length + 1,
    name: req.body.name,
  };
  animals.push(animal);
  res.send(animal);
});

app.put("/api/animals/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal)
    return res.status(404).send("The animal with the given ID was not found.");

  const { error } = validateAnimal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  animal.name = req.body.name;
  res.send(animal);
});

app.delete("/api/animals/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal)
    return res.status(404).send("The animal with the given ID was not found.");

  const index = animals.indexOf(animal);
  animals.splice(index, 1);

  res.send(animal);
});

app.get("/api/animals/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal)
    return res.status(404).send("The animal with the given ID was not found.");
  res.send(animal);
});

function validateAnimal(animal) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(animal, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen at port ${port}...`));
