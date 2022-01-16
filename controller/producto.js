const { filtrar } = require("../utils/utils");

const Producto = require("../model/productos");

const {product} = require("../Daos/index");

const productoGet = async (req, res, next) => {

  const idParam = req.params.id;
  let contenidoProductos = await product.get(idParam);
  res.json(contenidoProductos);
  
};

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
const productoPost = async (req, res, next) => {

  const foto = req.file ? req.file : req.body.foto; // para saber si viene de postman o de un form

  if (!foto) {
    const error = new Error(" enviar file :( ");
    error.httpStatusCode = 400;
    return next(error);
  }

  const timestamp = Date.now();
  const { nombre, descripcion, codigo, precio, stock } = req.body;

  const nuevoProducto = new Producto();
  nuevoProducto.crearProducto({
    nombre,
    descripcion,
    codigo,
    precio,
    stock,
    foto: foto.filename,
    timestamp,
  });

  await product.add(nuevoProducto);

  return res.json(nuevoProducto);
};

const productoPut = async (req, res, next) => {

  const foto = req.file ? req.file : req.body.foto;

  const idParam = req.params.id;
 
  const filtrado = await product.getById(idParam);

  const { nombre, descripcion, codigo, precio, stock } = req.body;

  //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
  const nombreInsert = nombre ? nombre : filtrado[0].nombre;
  const descripcionInsert = descripcion ? descripcion : filtrado[0].descripcion;
  const codigoInsert = codigo ? codigo : filtrado[0].codigo;
  const precioInsert = precio ? precio : filtrado[0].precio;
  const stockInsert = stock ? stock : filtrado[0].stock;
  const fotoInsert = foto ? foto.filename : filtrado[0].foto;
  const timestamp = Date.now();

    await product.update(idParam,{
         nombre: nombreInsert,
         descripcion: descripcionInsert,
         codigo: codigoInsert,
         precio: precioInsert,
         stock: stockInsert,
         foto: fotoInsert,
         timestamp,
       })

  res.json({
    nombre: nombreInsert,
    descripcion: descripcionInsert,
    codigo: codigoInsert,
    precio: precioInsert,
    stock: stockInsert,
    foto: fotoInsert,
    timestamp,
  });
};

const productoDelete = async (req, res, next) => {

  const idParam = req.params.id;
  await product.delete(idParam);
  res.json({text:`eliminado con exito ${idParam}`})
};

module.exports = {
  productoGet,
  productoPut,
  productoPost,
  productoDelete,
};
