const { filtrar } = require("../utils/utils");
const Carrito = require("../model/carrito");

const { carrito } = require("../Daos/index");

const carritoPost = async (req, res) => {

  const createCarrito = await carrito.addCarrito()

  res.json(createCarrito);
};

const carritoDelete = async (req, res, next) => {
  const idParam = (req.params.id);
  await carrito.delete(idParam);
  res.json({ text: `eliminado con exito ${idParam}` })
};

const carritoGet = async (req, res, next) => {

  const idParam = (req.params.id);
  let carritoGet = await carrito.getById(idParam);
  res.json(carritoGet);

};

//agrega de a 1 producto al carrito
const carritoProductoPost = async (req, res, next) => {
  const { idUser } = req.body;
  const idParamProd = (req.params.id);
  await carrito.addProduct(idUser, idParamProd);
  res.json({ text: `se agrego correctamente el producto ${idParamProd}` });
};

const carritoProductoDelete = async (req, res, next) => {
  const idParam = (req.params.id);
  const idParamProd = (req.params.id_prod)
  await carrito.deleteProduct(idParam, idParamProd)
  res.json({ text: `se elimino correctamente el producto ${idParamProd}` });
};

module.exports = {
  carritoPost,
  carritoDelete,
  carritoGet,
  carritoProductoPost,
  carritoProductoDelete,
};
