const knex = require("knex");
const moment = require("moment");

/**CREATE TABLE productos (
    id int not null AUTO_INCREMENT,
    nombre varchar(50),
    precio int,
    stock int,
    foto varchar(200),
    codigo varchar(10),
    descripcion varchar(200),
    timestamp varchar(50),
    PRIMARY KEY (id)
); */
/*
INSERT INTO productos (nombre, precio, stock, foto,codigo,descripcion,timestamp)
VALUES ("test", 100, 10, "urlfoto","codigotest","descripcionTEST","12312313");
*/
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

  async get(idParam) {
    try {
      if (idParam) {
        const id = parseInt(idParam);
        let result = await this.getById(id);
        result = Object.values(JSON.parse(JSON.stringify(result)));

        return result;
      } else {
        const productsList = await this.mysqlDB.from("productos").select();

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
      const id = parseInt(productId);
      const getProduct = await this.mysqlDB.from("productos").where({ id: id });

      if (getProduct.length == 0)
        throw {
          status: 404,
          msg: "no existe este producto cargado en tu base de datos",
        };
      return getProduct;
    } catch (error) {
      throw error;
    }
  }

  async add(data) {
    try {
      const newProduct = {
        id: this.mysqlDB.default,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      const addNewProduct = await this.mysqlDB
        .from("productos")
        .insert(newProduct);
      return addNewProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
      const id = parseInt(productId);
      const resultDelete = await this.mysqlDB("productos").where({ id: id }).del();

      if (resultDelete === 0)
        throw {
          status: 404,
          msg: "no existe el producto en en tu base de datos",
        };
      return resultDelete;
    } catch (error) {
      throw error;
    }
  }

  async update(productId, newData) {
    try {
      const id = parseInt(productId);
      newData.id = id;
      const update = await this.mysqlDB("productos")
        .where({ id: id })
        .update(newData);
      return update;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductoMysql;
