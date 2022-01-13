const moment = require("moment")
const mongoose = require("mongoose");

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
    
    async getById(productId) {
        try {

            const getProduct = await this.carritoModel.findById(productId);
            if (!getProduct)
              throw {
                status: 404,
                msg: "El carrito solicitado no existe",
              };
            return getProduct;
          } catch (error) {
            throw error;
          }
    }

    async add(data) {
        const newProduct = {
            id: this.productos.length + 1,
            name: data.name,
            description: data.description,
            code: data.code,
            photo: data.photo,
            price: data.price,
            stock: data.stock,
            timestamps: `${moment().format('DD MM YYYY hh:mm')}`
        }
        this.productos.push(newProduct)
        return newProduct;
    }

    async delete(productId) {
        const id = Number(productId);
        this.productos = this.productos.filter((aProduct) => aProduct.id !== id);
    }

    async update(productId, newData) {
        const oldData =  await this.getById(productId);
        await this.delete(productId);
        const updateData = {...oldData, ...newData};
        this.productos.push(updateData);
        this.productos = this.productos.sort((productA, productB) => productA.id - productB.id);

        return updateData;
    }

 
}

module.exports =DaoCarrito