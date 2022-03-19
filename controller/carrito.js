const { carrito } = require("../Daos/index");
const { crearError } = require("../utils/utils");
const log4js = require('log4js')
const loggerFile = log4js.getLogger('archivo')

const carritoPost = async (req, res,next) => {
  const idParam = req.body.idUser; //id usuario
  let createCarrito;
  try {
    createCarrito = await carrito.addCarrito(idParam);
  } catch (errorMsg) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se pudo crear"));
  }

  res.json(createCarrito);
};

const carritoDelete = async (req, res, next) => {
  const idParam = req.params.id;
  try {
    await carrito.delete(idParam);
  } catch (errorMsg) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se pudo eliminar"));
  }

  res.json({ text: `eliminado con exito ${idParam}` });
};

const carritoGet = async (req, res, next) => {
  const idParam = req.params.id;
  let carritoGet;
  try {
    carritoGet = await carrito.getById(idParam);
  } catch (errorMsg) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se encontro el carrito"));
  }

  res.json(carritoGet);
};

//agrega de a 1 producto al carrito idCarrito 
const carritoProductoPost = async (req, res, next) => {
  const { idCarrito } = req.body;
  const idParamProd = req.params.id;
  try {
    await carrito.addProduct(idCarrito, idParamProd);
  } catch (errorMsg) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se encontro el carrito"));
  }

  res.json({ text: `se agrego correctamente el producto ${idParamProd}` });
};

const carritoProductoDelete = async (req, res, next) => {
  const idParam = req.params.id;
  const idParamProd = req.params.id_prod;
  try {
    await carrito.deleteProduct(idParam, idParamProd);
  } catch (errorMsg) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se encontro el carrito"));
  }

  res.json({ text: `se elimino correctamente el producto ${idParamProd}` });
};

module.exports = {
  carritoPost,
  carritoDelete,
  carritoGet,
  carritoProductoPost,
  carritoProductoDelete,
};
