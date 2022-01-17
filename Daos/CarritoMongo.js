const moment = require("moment")
const mongoose = require("mongoose");
const ProductsMongo = require("./ProductoMongo");
const product = new ProductsMongo();
const ObjectId = require('mongodb').ObjectId;

const carritoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productos: { type: Array, required: true },
  timestamp: {
    type: String,
    required: true,
    default: moment().format("DD/MM/YYYY HH:mm:ss"),
  },
});


class DaoCarrito {
  mongoDB
  carritoModel;

  constructor() {
    this.productos = [];
    this.mongoDB = `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/ecommerce?retryWrites=true&w=majority`
    mongoose.connect(this.mongoDB);
    this.carritoModel = mongoose.model("carritos", carritoSchema);

  }

  async get() {
    try {
      const carritoList = await this.carritoModel.find({});
      if (carritoList.length == 0)
        throw {
          status: 404,
          msg: "Todavia no hay carritoList cargados en tu base de datos",
        };

      return carritoList;
    } catch (error) {
      throw error;
    }
  }

  async getById(IdCarrito) {
    try {

      const getCarrito = await this.carritoModel.findById(IdCarrito);
      if (!getCarrito)
        throw {
          status: 404,
          msg: "El carrito solicitado no existe",
        };
      return getCarrito;
    } catch (error) {
      throw error;
    }
  }
  async addCarrito() {

    try {
      const newCarrito = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        productos: [],
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`
      }
      const addCarrito = await this.carritoModel.create(newCarrito);
      return addCarrito;
    } catch (error) {
      throw error;
    }
  }


  async addProduct(idUser, idProduct) {
    let productoSeleccionado;

    try {
      productoSeleccionado = await product.getById(idProduct)

    } catch (error) {
      throw error;
    }

    try {
      await this.carritoModel.updateOne({ "_id": idUser }, { $push: { productos: productoSeleccionado } })
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {

    const id = productId;

    this.productos = this.productos.filter((aProduct) => aProduct._id !== id);
    try {
      await this.carritoModel.deleteOne({ _id: productId });
    } catch (error) {
      throw error;
    }

  }

  async deleteProduct(idUser, productId) {

    try {
      const msg = await this.carritoModel.updateOne(
        { '_id': idUser },
        { $pull: { "productos": { _id: ObjectId(productId) } } }
      );

      if(msg.modifiedCount===0){
        throw {
          status: 404,
          msg: "El producto solicitado no existe en el carrito",
        };
      }
    } catch (error) {
      throw error;
    }

  }
}

module.exports = DaoCarrito