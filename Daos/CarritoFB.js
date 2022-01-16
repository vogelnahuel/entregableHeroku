
const moment = require("moment")


 const admin = require("firebase-admin");

//  const ProductsFB = require("./ProductoFB");


class DaoCarritoFB {


  constructor() {

    this.db = admin.firestore();
    this.query = this.db.collection("carritos")


  }
  async get() {
    try {
      const querySnapshot = await this.query.get()
      let docs = querySnapshot.docs;
      if (docs.length == 0)
        throw {
          status: 404,
          msg: "Todavia no hay carritos cargados en tu base de datos",
        };

      const response = docs.map((doc) => ({
        id: doc.id,
        productos: doc.data().productos,
        timestamp: doc.data().timestamp
      }))
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getById(productId) {
    try {
      const docId = this.query.doc(productId)
      const getProduct = await docId.get();

      if (!getProduct)
        throw {
          status: 404,
          msg: "El carrito solicitado no existe",
        };
      return getProduct.data();
    } catch (error) {
      throw error;
    }
  }

  async addCarrito() {
    try {
      const newCarrito = {
        productos: [],
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`
      }
      let doc = this.query.doc();
      await doc.create(newCarrito)
      return newCarrito;
    } catch (error) {
      throw error;
    }
  }
  async delete(carritoId) {
    try {
      let doc = this.query.doc(carritoId)
      await doc.delete()
    } catch (error) {
      throw error;
    }
  }




  async addProduct(idUser, idProduct) {

    let productoSeleccionado;

    const productos = admin.firestore().collection("productos")

  

   
    try {
      const docId = productos.doc(idProduct)
      productoSeleccionado = await docId.get();
    } catch (error) {
      throw error;
    }

    try {
   
      const docId = this.query.doc(idUser)
      await docId.update({
        productos: admin.firestore.FieldValue.arrayUnion(productoSeleccionado.data())
      })
    } catch (error) {
      throw error;
    }


  }


  async deleteProduct(idUser, productId) {

    try {
      const docId = this.query.doc(idUser)
      await docId.update({
        productos: admin.firestore.FieldValue.arrayRemove(productId)
     });

    } catch (error) {
      throw error;
    }

  }



}

module.exports = DaoCarritoFB