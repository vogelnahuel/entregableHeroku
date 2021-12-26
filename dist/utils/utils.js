"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.inicializacionFile = exports.filtrar = void 0;
const multer_1 = __importDefault(require("multer"));
const filtrar = (array, idParam) => {
    if (array === undefined || array.length === 0) {
        const error = new Error("elemento  no encontrado");
        error.httpStatusCode = 404;
        return error;
    }
    const filtrado = array.filter((array) => array.id === idParam);
    if (filtrado.length === 0) {
        const error = new Error("elemento  no encontrado");
        error.httpStatusCode = 404;
        return error;
    }
    return filtrado;
};
exports.filtrar = filtrar;
const inicializacionFile = () => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "public");
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        },
    });
    return storage;
};
exports.inicializacionFile = inicializacionFile;
const isAdmin = (req, res, next) => {
    var _a;
    let administrador = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.administrador;
    administrador = administrador ? JSON.parse(administrador) : false;
    if (!administrador) {
        res
            .status(404)
            .send({ error: -1, descripcion: `ruta ${req.originalUrl} y  método  ${req.method} no autorizada` });
    }
    else {
        next();
    }
};
exports.isAdmin = isAdmin;
