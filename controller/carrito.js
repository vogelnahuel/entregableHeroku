const { carrito } = require("../Daos/index");

const carritoPost = async (req, res) => {
  let createCarrito;
  try {
    createCarrito = await carrito.addCarrito();
  } catch (errorMsg) {
    errorMsg.msg = errorMsg.msg ? errorMsg.msg : "no se encontro el producto";
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  res.json(createCarrito);
};

const carritoDelete = async (req, res, next) => {
  const idParam = req.params.id;
  try {
    await carrito.delete(idParam);
  } catch (errorMsg) {
    errorMsg.msg = errorMsg.msg ? errorMsg.msg : "no se encontro el producto";
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  res.json({ text: `eliminado con exito ${idParam}` });
};

const carritoGet = async (req, res, next) => {
  const idParam = req.params.id;
  let carritoGet;
  try {
    carritoGet = await carrito.getById(idParam);
  } catch (errorMsg) {
    errorMsg.msg = errorMsg.msg ? errorMsg.msg : "no se encontro el carrito";
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  res.json(carritoGet);
};

//agrega de a 1 producto al carrito
const carritoProductoPost = async (req, res, next) => {
  const { idUser } = req.body;
  const idParamProd = req.params.id;
  try {
    await carrito.addProduct(idUser, idParamProd);
  } catch (errorMsg) {
    errorMsg.msg = errorMsg.msg ? errorMsg.msg : "no se encontro el carrito";
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
  }

  res.json({ text: `se agrego correctamente el producto ${idParamProd}` });
};

const carritoProductoDelete = async (req, res, next) => {
  const idParam = req.params.id;
  const idParamProd = req.params.id_prod;
  try {
    await carrito.deleteProduct(idParam, idParamProd);
  } catch (errorMsg) {
    errorMsg.msg = errorMsg.msg ? errorMsg.msg : "no se encontro el carrito";
    const error = new Error(errorMsg.msg);
    error.status = errorMsg.status;
    return next(error);
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
