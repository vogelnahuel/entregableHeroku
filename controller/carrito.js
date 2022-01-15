const { filtrar } = require("../utils/utils");
// const Archivo = require("../model/Archivo.js");
const Carrito = require("../model/carrito");
const rutaCarritos = "archivos/carrito.txt";
const rutaProductos = "archivos/producto.txt";
const codificacion = "utf-8";

const { carrito } = require("../Daos/index");
// const archivo = new Archivo();

let contenedorDeCarritos = [];

const carritoPost = async (req, res) => {

  const createCarrito = await carrito.addCarrito()

  // contenedorDeCarritos.push({ id: Carrito.id, carrito });

  // await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);

  res.json(createCarrito);
};

const carritoDelete = async (req, res, next) => {
  const idParam = (req.params.id);
  // const eliminado = filtrar(contenedorDeCarritos, idParam);
  // if (eliminado?.httpStatusCode) {
  //   return next(eliminado);
  // }
  // const todosMenosEliminado = contenedorDeCarritos.filter(
  //   (carrito) => carrito.id !== idParam
  // );
  // contenedorDeCarritos = todosMenosEliminado;

  // await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);

  await carrito.delete(idParam);
  res.json({ text: `eliminado con exito ${idParam}` })
};

const carritoGet = async (req, res, next) => {
  // const idParam = parseInt(req.params.id);
  // const seleccionado = filtrar(contenedorDeCarritos, idParam);
  // if (seleccionado?.httpStatusCode) {
  //   return next(seleccionado);
  // }
  // res.json({ productos: seleccionado[0].carrito.productos });
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


  // const seleccionado = filtrar(contenedorDeCarritos, parseInt(idUser));
  // if (seleccionado?.httpStatusCode) {
  //   return next(seleccionado);
  // }

  // const idParam = parseInt(req.params.id);

  // let contenidoProductosArchivo = await archivo.leerArchivo(
  //   rutaProductos,
  //   codificacion
  // );

  // const seleccionadoProducto = filtrar(contenidoProductosArchivo, idParam);

  // if (!seleccionadoProducto?.httpStatusCode) {
  //   const idAFiltrar = contenedorDeCarritos.findIndex(
  //     (contenedor) => contenedor.id == idUser
  //   );
  //   contenedorDeCarritos[idAFiltrar].carrito.insertarProducto(
  //     seleccionadoProducto[0]
  //   );

  //   await archivo.crearArchivoYsobreEscribir(
  //     rutaCarritos,
  //     contenedorDeCarritos
  //   );

  //   res.json(seleccionadoProducto[0]);
  // } else {
  //   const error = new Error("Producto no encontrado ");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }


};

const carritoProductoDelete = async (req, res, next) => {
  // const idParam = parseInt(req.params.id);

  // const carritoSeleccionado = filtrar(contenedorDeCarritos, idParam);
  // if (carritoSeleccionado?.httpStatusCode) {
  //   return next(carritoSeleccionado);
  // }
  // const idAFiltrar = contenedorDeCarritos.findIndex(
  //   (contenedor) => contenedor.id == idParam
  // );

  // const idParamProd = parseInt(req.params.id_prod);
  // let productoSeleccionado = filtrar(
  //   contenedorDeCarritos[idAFiltrar].carrito.productos,
  //   idParamProd
  // );
  // if (productoSeleccionado?.httpStatusCode) {
  //   return next(productoSeleccionado);
  // }
  // productoSeleccionado = productoSeleccionado[0];

  // contenedorDeCarritos[idAFiltrar].carrito.eliminarProducto(idParamProd); //elimino del array

  // await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
  // res.json({
  //   nombre: productoSeleccionado.nombre,
  //   descripcion: productoSeleccionado.descripcion,
  //   codigo: productoSeleccionado.codigo,
  //   precio: productoSeleccionado.precio,
  //   stock: productoSeleccionado.stock,
  //   foto: productoSeleccionado.foto,
  //   id: productoSeleccionado.id,
  //   timestamp: productoSeleccionado.timestamp,
  // });

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