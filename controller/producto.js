const { filtrar } = require("../utils/utils");

const Producto = require("../model/productos");

const { product } = require("../Daos/index");

const productoGet = async (req, res, next) => {
  const idParam = req.params.id;
  let contenidoProductos;
  try {
    contenidoProductos = await product.get(idParam);
  } catch (errorMsg) {
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

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


  try {
    await product.add(nuevoProducto);
  } catch (errorMsg) {
    errorMsg.msg  = errorMsg.msg ? errorMsg.msg : "error"
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  return res.json(nuevoProducto);
};

const productoPut = async (req, res, next) => {
  const foto = req.file ? req.file : req.body.foto;

  const idParam = req.params.id;
  let filtrado;
  try {
    filtrado = await product.getById(idParam);
  } catch (errorMsg) {
    errorMsg.msg  = errorMsg.msg ? errorMsg.msg : "no se encontro el producto"
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  const { nombre, descripcion, codigo, precio, stock } = req.body;

  //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
  const nombreInsert = nombre ? nombre : filtrado.nombre;
  const descripcionInsert = descripcion ? descripcion : filtrado.descripcion;
  const codigoInsert = codigo ? codigo : filtrado.codigo;
  const precioInsert = precio ? precio : filtrado.precio;
  const stockInsert = stock ? stock : filtrado.stock;
  const fotoInsert = foto ? foto.filename : filtrado.foto;
  const timestamp = Date.now();

  try {
    await product.update(idParam, {
      nombre: nombreInsert,
      descripcion: descripcionInsert,
      codigo: codigoInsert,
      precio: precioInsert,
      stock: stockInsert,
      foto: fotoInsert,
      timestamp,
    });
  } catch (errorMsg) {
    errorMsg.msg  = errorMsg.msg ? errorMsg.msg : "error"
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

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
  try {
    await product.delete(idParam);
  } catch (errorMsg) {
    errorMsg.msg  = errorMsg.msg ? errorMsg.msg : "error"
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }
 
  res.json({ text: `eliminado con exito ${idParam}` });
};

module.exports = {
  productoGet,
  productoPut,
  productoPost,
  productoDelete,
};
