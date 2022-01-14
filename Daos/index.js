const ProductMongo = require("./ProductoMongo")
const ProductFirebase = require("./ProductoFB")
const ProductFile = require("./ProductoFile")

const CarritoMongo = require("./CarritoMongo")
const CarritoFirebase = require("./CarritoFB")
const CarritoFile = require("./CarritoFile")

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
    case "file":
        product = new ProductFile()
        carrito = new CarritoFile();
        break;

    default:
        break;
}


module.exports = {
    product,
    carrito
}