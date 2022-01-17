const mongoose = require("mongoose");
const moment = require("moment")

const productsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true, max: 70 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  foto: { type: String, required: true },
  codigo: { type: String, required: true },
  descripcion: { type: String, required: true },
  timestamp: {
    type: String,
    required: true,
    default: moment().format("DD/MM/YYYY HH:mm:ss"),
  },
});

class ProductsMongo {
  mongoDB;
  productsModel;
  constructor() {
    this.mongoDB = `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/ecommerce?retryWrites=true&w=majority`
    mongoose.connect(process.env.MONGODB_URI || this.mongoDB);
    this.productsModel = mongoose.model("productos", productsSchema);
  }

  async get(idParam) {
    try {
      if (idParam) {
        const productList = await this.getById(idParam);
        if (!productList)
          throw {
            status: 404,
            msg: " no existe producto con ese id cargados en tu base de datos",
          };
        return productList
      }
      else {
        const productsList = await this.productsModel.find({}).sort({ nombre: 1 });
        if (productsList.length == 0)
          throw {
            status: 404,
            msg: "Todavia no hay productos cargados en tu base de datos",
          };

        return productsList;
      }

    } catch (error) {
      throw error;
    }
  }

  async getById(productId) {
    try {

      const getProduct = await this.productsModel.findById(productId);

      if (!getProduct)
        throw {
          status: 404,
          msg: "El producto solicitado no existe",
        };
      return getProduct;
    } catch (error) {
      throw error;
    }
  }

  async add(data) {
    try {
      const newProduct = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      const addProduct = await this.productsModel.create(newProduct);
      return addProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
     const result =  await this.productsModel.findOneAndDelete({ _id: productId });
     if (!result)
     throw {
       status: 404,
       msg: "El producto solicitado no existe",
     };
    } catch (error) {
      throw error;
    }
  }

  async update(productId, newData) {
    try {
      newData._id = productId;
      const update = await this.productsModel.findOneAndUpdate(
        { _id: productId },
        newData,
        { new: true }
      );
      if (!update)
      throw {
        status: 404,
        msg: "El producto solicitado no existe",
      };
      return update;
    } catch (error) {
     
      throw error;
    }
  }
}
module.exports = ProductsMongo;