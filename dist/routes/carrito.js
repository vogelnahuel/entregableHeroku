"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const utils_1 = require("../utils/utils");
const storage = (0, utils_1.inicializacionFile)();
const upload = (0, multer_1.default)({ storage });
const carrito_1 = require("../controller/carrito");
const routerCarrito = (0, express_1.Router)();
routerCarrito.post("/", carrito_1.carritoPost);
routerCarrito.delete("/:id", carrito_1.carritoDelete);
routerCarrito.get("/:id/productos", carrito_1.carritoGet);
routerCarrito.post("/:id/productos", upload.single("foto"), carrito_1.carritoProductoPost);
routerCarrito.delete("/:id/productos/:id_prod", carrito_1.carritoProductoDelete);
exports.default = routerCarrito;
module.exports = routerCarrito;
