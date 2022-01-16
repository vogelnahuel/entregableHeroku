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

    

const knex = require('knex');
const moment = require('moment')

class ProductoMysql {

    constructor(){
        this.mysqlDB = knex({
            client: 'mysql',
            connection: {
            host: 'brdgiivvhujleqo6nc4k-mysql.services.clever-cloud.com',
            user: 'u4y7zlutps5zufph',
            password: 'fIeuBOXquhu7mSRk1OtR',
            database: 'brdgiivvhujleqo6nc4k' }
        })
    }

    async get() {
        try {
            const productsList = await this.mysqlDB.from('productos').select();
            if(productsList.length == 0) throw({
                status: 404,
                msg: 'Todavia no hay productos cargados en tu base de datos'
            })

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getById(productId){
        try {
            const id = parseInt(productId);
            const getProduct = await this.mysqlDB.from('productos').where({id: id});
            if(getProduct.length == 0) return undefined;
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
                timestamp: `${moment().format('DD MM YYYY hh:mm')}`
            }
            const addNewProduct = await this.mysqlDB.from('productos').insert(newProduct);
            return addNewProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(productId) {
        try {
            const id = parseInt(productId);
            await this.mysqlDB('productos').where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

    async update(productId, newData) {
        try {
            const id = parseInt(productId);
            const update = await this.mysqlDB('productos').where({id: id}).update(newData);
            return update;
        } catch (error) {
            throw error;
        }
    }



}

module.exports =ProductoMysql;