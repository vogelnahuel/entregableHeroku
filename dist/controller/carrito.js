"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoProductoDelete = exports.carritoProductoPost = exports.carritoGet = exports.carritoDelete = exports.carritoPost = void 0;
const utils_1 = require("../utils/utils");
const Archivo_js_1 = __importDefault(require("../model/Archivo.js"));
const carrito_1 = __importDefault(require("../model/carrito"));
const rutaCarritos = "archivos/carrito.txt";
const rutaProductos = "archivos/producto.txt";
const codificacion = "utf-8";
const archivo = new Archivo_js_1.default();
let contenedorDeCarritos = [];
const carritoPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carrito = new carrito_1.default();
    const creado = carrito.crearCarrito();
    contenedorDeCarritos.push({ id: carrito_1.default.id, carrito });
    yield archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
    res.json({
        id: carrito_1.default.id,
        timestamp: creado.timestamp,
        productos: creado.productos,
    });
});
exports.carritoPost = carritoPost;
const carritoDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    const eliminado = (0, utils_1.filtrar)(contenedorDeCarritos, idParam);
    if (eliminado === null || eliminado === void 0 ? void 0 : eliminado.httpStatusCode) {
        return next(eliminado);
    }
    const todosMenosEliminado = contenedorDeCarritos.filter((carrito) => carrito.id !== idParam);
    contenedorDeCarritos = todosMenosEliminado;
    yield archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
    res.json({
        id: idParam,
        timestamp: eliminado[0].carrito.timestamp,
        productos: eliminado[0].carrito.productos,
    });
});
exports.carritoDelete = carritoDelete;
const carritoGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    const seleccionado = (0, utils_1.filtrar)(contenedorDeCarritos, idParam);
    if (seleccionado === null || seleccionado === void 0 ? void 0 : seleccionado.httpStatusCode) {
        return next(seleccionado);
    }
    res.json({ productos: seleccionado[0].carrito.productos });
});
exports.carritoGet = carritoGet;
//agrega de a 1 producto al carrito
const carritoProductoPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const seleccionado = (0, utils_1.filtrar)(contenedorDeCarritos, parseInt(idUser));
    if (seleccionado === null || seleccionado === void 0 ? void 0 : seleccionado.httpStatusCode) {
        return next(seleccionado);
    }
    const idParam = parseInt(req.params.id);
    let contenidoProductosArchivo = yield archivo.leerArchivo(rutaProductos, codificacion);
    const seleccionadoProducto = (0, utils_1.filtrar)(contenidoProductosArchivo, idParam);
    if (!(seleccionadoProducto === null || seleccionadoProducto === void 0 ? void 0 : seleccionadoProducto.httpStatusCode)) {
        const idAFiltrar = contenedorDeCarritos.findIndex((contenedor) => contenedor.id == idUser);
        contenedorDeCarritos[idAFiltrar].carrito.insertarProducto(seleccionadoProducto[0]);
        yield archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
        res.json(seleccionadoProducto[0]);
    }
    else {
        const error = new Error("Producto no encontrado ");
        error.httpStatusCode = 400;
        return next(error);
    }
});
exports.carritoProductoPost = carritoProductoPost;
const carritoProductoDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    const carritoSeleccionado = (0, utils_1.filtrar)(contenedorDeCarritos, idParam);
    if (carritoSeleccionado === null || carritoSeleccionado === void 0 ? void 0 : carritoSeleccionado.httpStatusCode) {
        return next(carritoSeleccionado);
    }
    const idAFiltrar = contenedorDeCarritos.findIndex((contenedor) => contenedor.id == idParam);
    const idParamProd = parseInt(req.params.id_prod);
    let productoSeleccionado = (0, utils_1.filtrar)(contenedorDeCarritos[idAFiltrar].carrito.productos, idParamProd);
    if (productoSeleccionado === null || productoSeleccionado === void 0 ? void 0 : productoSeleccionado.httpStatusCode) {
        return next(productoSeleccionado);
    }
    productoSeleccionado = productoSeleccionado[0];
    contenedorDeCarritos[idAFiltrar].carrito.eliminarProducto(idParamProd); //elimino del array
    yield archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorDeCarritos);
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
});
exports.carritoProductoDelete = carritoProductoDelete;
