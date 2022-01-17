const { carrito } = require("../Daos/index");
const { crearError } = require("../utils/utils");
const carritoPost = async (req, res) => {
  let createCarrito;
  try {
    createCarrito = await carrito.addCarrito();
  } catch (errorMsg) {
    return next(crearError(errorMsg,"no se pudo crear"));
  }

  res.json(createCarrito);
};

const carritoDelete = async (req, res, next) => {
  const idParam = req.params.id;
  try {
    await carrito.delete(idParam);
  } catch (errorMsg) {
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
    return next(crearError(errorMsg,"no se encontro el carrito"));
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
