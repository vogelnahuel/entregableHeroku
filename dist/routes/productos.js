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
const producto_1 = require("../controller/producto");
const routerProductos = (0, express_1.Router)();
routerProductos.get("/:id?", producto_1.productoGet);
routerProductos.put("/:id", upload.single("foto"), producto_1.productoPut);
routerProductos.post("/", upload.single("foto"), producto_1.productoPost);
routerProductos.delete("/:id", producto_1.productoDelete);
exports.default = routerProductos;
module.exports = routerProductos;
