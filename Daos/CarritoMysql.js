/**CREATE TABLE carritos (
    id int not null AUTO_INCREMENT PRIMARY KEY,
    timestamp varchar(50)
); */
/*CREATE TABLE carritosproductos (
    id int not null AUTO_INCREMENT PRIMARY KEY,
    idCarrito int not null,
    idProductos int NOT null,
    nombre varchar(50),
    precio int,
    stock int,
    foto varchar(200),
    codigo varchar(10),
    descripcion varchar(200),
    timestamp varchar(50),
    FOREIGN KEY (idCarrito) REFERENCES carritos(id),
    FOREIGN KEY (idProductos) REFERENCES productos(id)
); */
/**INSERT INTO carritos (timestamp)
VALUES ("12312313"); */
/**
 * INSERT INTO carritosproductos (idCarrito,idProductos,nombre,precio,stock,foto,codigo,descripcion,timestamp)
    VALUES (1,1,"test", 100, 10, "urlfoto","codigotest","descripcionTEST","12312313");
 */
/**
 * 
 * SELECT c.*,cp.nombre,cp.precio,cp.stock,cp.foto,cp.codigo,cp.descripcion,cp.timestamp,cp.idProductos 
    FROM carritos as c
    INNER JOIN carritosproductos as cp
    ON c.id = cp.idCarrito
    where c.id={id parametro}
 */

const knex = require("knex");
const moment = require("moment");

class ProductoMysql {
  constructor() {
    this.mysqlDB = knex({
      client: "mysql",
      connection: {
        host: "brdgiivvhujleqo6nc4k-mysql.services.clever-cloud.com",
        user: "u4y7zlutps5zufph",
        password: "fIeuBOXquhu7mSRk1OtR",
        database: "brdgiivvhujleqo6nc4k",
      },
    });
  }

  async get() {
    try {
      const productsList = await this.mysqlDB
        .select(
          "c.*,cp.nombre,cp.precio,cp.stock,cp.foto,cp.codigo,cp.descripcion,cp.timestamp,cp.idProductos"
        )
        .from(" carritos as c")
        .join("carritosproductos as cp", "c.id", "=", "cp.idCarrito")
        .orderBy("cp.idCarrito", "desc");

      if (productsList.length == 0)
        throw {
          status: 404,
          msg: "Todavia no hay carritos cargados en tu base de datos",
        };

      return productsList;
    } catch (error) {
      throw error;
    }
  }

  async getById(IdCarrito) {
    try {
      const id = parseInt(IdCarrito);
      let getCarrito = await this.mysqlDB
        .select("c.*")
        .from(" carritos as c")
        .where({ "c.id": id });

      const getCarritoProductos = await this.mysqlDB
        .select(
          "cp.nombre",
          "cp.precio",
          "cp.stock",
          "cp.foto",
          "cp.codigo",
          "cp.descripcion",
          "cp.timestamp",
          "cp.idProductos as id"
        )
        .from(" carritos as c")
        .join("carritosproductos as cp", "c.id", "=", "cp.idCarrito")
        .where({ "c.id": id })
        .orderBy("cp.idCarrito", "desc");

      if (getCarritoProductos.length == 0) {
        getCarrito = Object.values(JSON.parse(JSON.stringify(getCarrito)));
        getCarrito[0].productos = [];
        return getCarrito;
      }
      getCarrito = Object.values(JSON.parse(JSON.stringify(getCarrito)));
      getCarrito[0].productos = getCarritoProductos;
      return getCarrito;
    } catch (error) {
      throw error;
    }
  }
  async addCarrito() {
    try {
      const newCarrito = {
        id: this.mysqlDB.default,
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      await this.mysqlDB.from("carritos").insert(newCarrito);
      return newCarrito;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(idUser, idProduct) {
    let productoSeleccionado;

    try {
      const id = parseInt(idProduct);
      productoSeleccionado = await this.mysqlDB
        .from("productos")
        .where({ id: id });
    } catch (error) {
      throw error;
    }

    try {
      productoSeleccionado=Object.values(JSON.parse(JSON.stringify(productoSeleccionado)))
      productoSeleccionado[0].id = this.mysqlDB.default;
      productoSeleccionado[0].idProductos = parseInt(idProduct);
      productoSeleccionado[0].idCarrito = parseInt(idUser);

      

      const addNewProduct = await this.mysqlDB
        .from("carritosproductos")
        .insert(productoSeleccionado[0]);
      return addNewProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
      const id = parseInt(productId);
      const resultDelete = await this.mysqlDB("carritos").where({ id: id }).del();
      if(resultDelete===0) 
      throw({
          status: 404,
          msg: 'no existe el producto en en tu base de datos'
      })
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(idUser, productId) {
    try {
      const User = parseInt(idUser);
      const idProduct = parseInt(productId);
      await this.mysqlDB("carritosproductos")
        .where({ idCarrito: User })
        .andWhere({ idProductos: idProduct })
        .del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductoMysql;
