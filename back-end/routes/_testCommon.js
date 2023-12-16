"use strict";

const db = require("../db");
const User = require("../models/user");
const List = require("../models/list");
const Plant = require("../models/plant");
const {createToken} = require("../helpers/tokens");

const testListNames = [];
const testPlantIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM lists");
  await db.query("DELETE FROM plants");

  testListNames[0] = 
    (await List.create({name: 'List1', description: 'Description for test list 1'})).name;
  testListNames[1] = 
    (await List.create({name: 'List2', description: 'Description for test list 2'})).name;
  testListNames[2] = 
    (await List.create({name: 'List3', description: 'Description for test list 3'})).name;

  testPlantIds[0] = 
    (await Plant.create({
      commonName: "Pine Tree",
      scientificName: "Pine Tree in Latin",
      type: 'tree',
      flowers: false,
      color: 'dark green',
      fruits: false,
      edibleFruit: false,
      fruitColor: "",
      leaf: false,
      leafColor: "",
      edibleLeaf: false,
      poisonousToHumans: false,
      poisonousToPets: false,
      thorny: false,
      description: "This tree is commonly used as decoration during Christmas.",
      defaultImg: "https://i.pinimg.com/originals/1c/4e/bd/1c4ebddd9cfe015080fcbd25751bbae9.jpg"
    })).id;
  testPlantIds[1] =  
    (await Plant.create({
      commonName: "Cactus",
      scientificName: "Cactus in Latin",
      type: 'plant',
      flowers: true,
      color: 'green',
      fruits: false,
      edibleFruit: false,
      fruitColor: "",
      leaf: false,
      leafColor: "",
      edibleLeaf: false,
      poisonousToHumans: false,
      poisonousToPets: false,
      thorny: true,
      description: "Cacti are adapted to live in very dry environments.",
      defaultImg: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F7p6iiofyg0q41.jpg"
    })).id;
  testPlantIds[2] =  
  (await Plant.create({
    commonName: "Rose",
    scientificName: "Rose in Latin",
    type: 'flower',
    flowers: true,
    color: 'red',
    fruits: false,
    edibleFruit: false,
    fruitColor: "",
    leaf: true,
    leafColor: "green",
    edibleLeaf: false,
    poisonousToHumans: false,
    poisonousToPets: false,
    thorny: true,
    description: "Roses are red",
    defaultImg: "https://1.bp.blogspot.com/-4e_hEdBJ3m0/T-B9ZKBqIeI/AAAAAAAADlw/JYMHMwsWEQg/s1600/Rose-Wallpaper-69.jpg"
  })).id;
  
  await List.addPlantToList('List1', testPlantIds[0]);

  await User.register({
    username: 'user1', 
    firstName: '1firstname',
    lastName: '1lastname',
    password: '1password',
    email: '1@email.com'
  });
  await User.register({
    username: 'user2', 
    firstName: '2firstname',
    lastName: '2lastname',
    password: '2password',
    email: '2@email.com'
  });
  await User.register({
    username: 'user3', 
    firstName: '3firstname',
    lastName: '3lastname',
    password: '3password',
    email: '3@email.com'
  });

  await User.addListToUser('user1', testListNames[0]);

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const user1Token = createToken('user1');
const user2Token = createToken('user2');
const user3Token = createToken('user3');

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user1Token,
  user2Token,
  user3Token
};