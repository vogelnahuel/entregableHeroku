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
exports.productoDelete = exports.productoPut = exports.productoPost = exports.productoGet = void 0;
const utils_1 = require("../utils/utils");
//inicializacion de variables donde se guardan id y los productos
let productos = [];
const productos_1 = __importDefault(require("../model/productos"));
const Archivo_js_1 = __importDefault(require("../model/Archivo.js"));
const rutaProductos = "archivos/producto.txt";
const codificacion = "utf-8";
const archivo = new Archivo_js_1.default();
const productoGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    let contenidoProductosArchivo = yield archivo.leerArchivo(rutaProductos, codificacion);
    if (idParam) {
        const filtrado = (0, utils_1.filtrar)(contenidoProductosArchivo, idParam);
        if (filtrado === null || filtrado === void 0 ? void 0 : filtrado.httpStatusCode) {
            return next(filtrado);
        }
        res.json(filtrado[0]);
    }
    else {
        res.json(contenidoProductosArchivo);
    }
});
exports.productoGet = productoGet;
//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
const productoPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foto = req.file ? req.file : req.body.foto; // para saber si viene de postman o de un form
    if (!foto) {
        const error = new Error(" enviar file :( ");
        error.httpStatusCode = 400;
        return next(error);
    }
    const timestamp = Date.now();
    const { nombre, descripcion, codigo, precio, stock } = req.body;
    const nuevoProducto = new productos_1.default();
    nuevoProducto.crearProducto({
        nombre,
        descripcion,
        codigo,
        precio,
        stock,
        foto: foto.filename,
        timestamp,
    });
    productos.push(nuevoProducto);
    yield archivo.crearArchivoYsobreEscribir(rutaProductos, productos);
    return res.json(nuevoProducto);
});
exports.productoPost = productoPost;
const productoPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foto = req.file ? req.file : req.body.foto;
    const idParam = parseInt(req.params.id);
    const filtrado = (0, utils_1.filtrar)(productos, idParam);
    if (filtrado === null || filtrado === void 0 ? void 0 : filtrado.httpStatusCode) {
        return next(filtrado);
    }
    const { nombre, descripcion, codigo, precio, stock } = req.body;
    //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
    const nombreInsert = nombre ? nombre : filtrado[0].nombre;
    const descripcionInsert = descripcion ? descripcion : filtrado[0].descripcion;
    const codigoInsert = codigo ? codigo : filtrado[0].codigo;
    const precioInsert = precio ? precio : filtrado[0].precio;
    const stockInsert = stock ? stock : filtrado[0].stock;
    const fotoInsert = foto ? foto.filename : filtrado[0].foto;
    const timestamp = Date.now();
    const idAFiltrar = productos.findIndex((contenedor) => contenedor.id == idParam);
    productos[idAFiltrar].actualizarProducto({
        nombre: nombreInsert,
        descripcion: descripcionInsert,
        codigo: codigoInsert,
        precio: precioInsert,
        stock: stockInsert,
        foto: fotoInsert,
        timestamp,
        id: idParam,
    });
    yield archivo.crearArchivoYsobreEscribir(rutaProductos, productos);
    res.json({
        nombre: nombreInsert,
        descripcion: descripcionInsert,
        codigo: codigoInsert,
        precio: precioInsert,
        stock: stockInsert,
        foto: fotoInsert,
        id: idParam,
        timestamp,
    });
});
exports.productoPut = productoPut;
const productoDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id);
    const eliminado = (0, utils_1.filtrar)(productos, idParam);
    if (eliminado === null || eliminado === void 0 ? void 0 : eliminado.httpStatusCode) {
        return next(eliminado);
    }
    const todosMenosEliminado = productos.filter((producto) => producto.id !== idParam);
    productos = todosMenosEliminado;
    yield archivo.crearArchivoYsobreEscribir(rutaProductos, productos);
    res.json(eliminado[0]);
});
exports.productoDelete = productoDelete;
