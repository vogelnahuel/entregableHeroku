const ProductMongo = require("./ProductoMongo")
const ProductFirebase = require("./ProductoFB")
const ProductMysql = require("./ProductoMysql")

const CarritoMongo = require("./CarritoMongo")
const CarritoFirebase = require("./CarritoFB")
const CarritoMysql = require("./CarritoMysql")

let product
let carrito

switch (process.env.DATABASE) {
    case "firebase":
        product = new ProductFirebase()
        carrito = new CarritoFirebase();

        break;

    case "mongo":
        product = new ProductMongo()
        carrito = new CarritoMongo();
        break;
    case "mysql":
        product = new ProductMysql()
        carrito = new CarritoMysql();
        break;

    default:
        break;
}


module.exports = {
    product,
    carrito
}