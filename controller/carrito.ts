import { filtrar } from "../utils/utils";
import Archivo from "../model/Archivo.js";
import Carrito from "../model/carrito";
const rutaCarritos = "archivos/carrito.txt";
const rutaProductos = "archivos/producto.txt";
const codificacion = "utf-8";
const archivo = new Archivo();

let contenedorDeCarritos:any = [];

export const carritoPost = async (req:any, res:any) => {
  const carrito = new Carrito();
  const creado = carrito.crearCarrito();
  contenedorDeCarritos.push({ id: Carrito.id, carrito });

  await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);

  res.json({
    id: Carrito.id,
    timestamp: creado.timestamp,
    productos: creado.productos,
  });
};

export const carritoDelete = async (req:any, res:any, next:any) => {
  const idParam = parseInt(req.params.id);
  const eliminado = filtrar(contenedorDeCarritos, idParam);
  if (eliminado?.httpStatusCode) {
    return next(eliminado);
  }
  const todosMenosEliminado = contenedorDeCarritos.filter(
    (carrito:any) => carrito.id !== idParam
  );
  contenedorDeCarritos = todosMenosEliminado;

  await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
  res.json({
    id: idParam,
    timestamp: eliminado[0].carrito.timestamp,
    productos: eliminado[0].carrito.productos,
  });
};

export const carritoGet = async (req:any, res:any, next:any) => {
  const idParam = parseInt(req.params.id);
  const seleccionado = filtrar(contenedorDeCarritos, idParam);
  if (seleccionado?.httpStatusCode) {
    return next(seleccionado);
  }
  res.json({ productos: seleccionado[0].carrito.productos });
};

//agrega de a 1 producto al carrito
export const carritoProductoPost = async (req:any, res:any, next:any) => {
  const { idUser } = req.body;

  const seleccionado = filtrar(contenedorDeCarritos, parseInt(idUser));
  if (seleccionado?.httpStatusCode) {
    return next(seleccionado);
  }

  const idParam = parseInt(req.params.id);

  let contenidoProductosArchivo = await archivo.leerArchivo(
    rutaProductos,
    codificacion
  );

  const seleccionadoProducto = filtrar(contenidoProductosArchivo, idParam);

  if (!seleccionadoProducto?.httpStatusCode) {
    const idAFiltrar = contenedorDeCarritos.findIndex(
      (contenedor:any) => contenedor.id == idUser
    );
    contenedorDeCarritos[idAFiltrar].carrito.insertarProducto(
      seleccionadoProducto[0]
    );

    await archivo.crearArchivoYsobreEscribir(
      rutaCarritos,
      contenedorDeCarritos
    );

    res.json(seleccionadoProducto[0]);
  } else {
    const error:any = new Error("Producto no encontrado ");
    error.httpStatusCode = 400;
    return next(error);
  }
};

export const carritoProductoDelete = async (req:any, res:any, next:any) => {
  const idParam = parseInt(req.params.id);

  const carritoSeleccionado = filtrar(contenedorDeCarritos, idParam);
  if (carritoSeleccionado?.httpStatusCode) {
    return next(carritoSeleccionado);
  }
  const idAFiltrar = contenedorDeCarritos.findIndex(
    (contenedor:any) => contenedor.id == idParam
  );

  const idParamProd = parseInt(req.params.id_prod);
  let productoSeleccionado = filtrar(
    contenedorDeCarritos[idAFiltrar].carrito.productos,
    idParamProd
  );
  if (productoSeleccionado?.httpStatusCode) {
    return next(productoSeleccionado);
  }
  productoSeleccionado = productoSeleccionado[0];

  contenedorDeCarritos[idAFiltrar].carrito.eliminarProducto(idParamProd); //elimino del array

  await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
  res.json({
    nombre: productoSeleccionado.nombre,
    descripcion: productoSeleccionado.descripcion,
    codigo: productoSeleccionado.codigo,
    precio: productoSeleccionado.precio,
    stock: productoSeleccionado.stock,
    foto: productoSeleccionado.foto,
    id: productoSeleccionado.id,
    timestamp: productoSeleccionado.timestamp,
  });
};

