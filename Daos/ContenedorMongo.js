import mongoose from "mongoose";

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

export class productsMongo {
  mongoDB;
  productsModel;
  constructor(local = false) {
    // if (local) {
    //   this.mongoDB = `mongodb://localhost:27017/ecommerce`;
    // } else {
        this.mongoDB =`mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/ecommerce?retryWrites=true&w=majority`
    //   this.mongoDB = `mongodb+srv://roboti:CoderHouseTest1234@cluster0.nodly.mongodb.net/ecommerceCH?retryWrites=true&w=majority`;
    // }
    mongoose.connect(this.mongoDB);
    this.productsModel = mongoose.model("productos", productsSchema);
  }

  async get() {
    try {
      const productsList = await this.productsModel.find({}).sort({ title: 1 });
      if (productsList.length == 0)
        throw {
          status: 404,
          msg: "Todavia no hay productos cargados en tu base de datos",
        };

      return productsList;
    } catch (error) {
      throw error;
    }
  }

  async getById(productId) {
    try {
      if (productId.length !== 24)
        throw {
          status: 400,
          msg: "El id ingresado es incorrecto",
        };
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
        name: data.name,
        description: data.description,
        code: data.code,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
        timestamps: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      const addProduct = await this.productsModel.create(newProduct);
      return addProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
      await this.productsModel.deleteOne({ _id: productId });
    } catch (error) {
      throw error;
    }
  }

  async update(productId, newData) {
    try {
      const update = await this.productsModel.findOneAndUpdate(
        { _id: productId },
        newData,
        { new: true }
      );
      return update;
    } catch (error) {
      throw error;
    }
  }
}
