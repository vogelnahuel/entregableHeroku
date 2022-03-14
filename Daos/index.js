const ProductMongo = require("./ProductoMongo");
const ProductFirebase = require("./ProductoFB");
const ProductMysql = require("./ProductoMysql");

const CarritoMongo = require("./CarritoMongo");
const CarritoFirebase = require("./CarritoFB");
const CarritoMysql = require("./CarritoMysql");

const {usersDao} = require("./userMongo.js");

let product;
let carrito;
let usersDaoVar;

switch (process.env.DATABASE) {
  case "firebase":
    product = new ProductFirebase();
    carrito = new CarritoFirebase();

    break;

  case "mongo":
    product = new ProductMongo();
    carrito = new CarritoMongo();
    usersDaoVar = new usersDao();
    break;
  case "mysql":
    product = new ProductMysql();
    carrito = new CarritoMysql();
    break;

  default:
    break;
}

module.exports = {
  product,
  carrito,
  usersDaoVar,
};
