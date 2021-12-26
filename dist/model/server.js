"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const cors_1 = __importDefault(require("cors"));
var corsOptions = { origin: '*' };
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)(corsOptions));
        this.port = process.env.PORT;
        this.productosPath = "/api/productos";
        this.carritoPath = "/api/carrito";
        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //parseo y lectura del body de lo que mande el front en cualquier verbo http
        this.app.use(express_1.default.json());
        //directorio publico
        this.app.use(express_1.default.static("public"));
        //  middleware que  verifica si es admin o no 
        this.app.use(utils_1.isAdmin);
    }
    routes() {
        this.app.use(this.productosPath, require("../routes/productos"));
        this.app.use(this.carritoPath, require("../routes/carrito.js"));
        //ruta por defecto en caso de no encontrarse
        this.app.all("*", (req, res) => {
            res
                .status(404)
                .json({ error: -2, descripcion: `ruta ${req.url} y  método  ${req.method} no implementados` });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto:" + this.port);
        });
    }
}
exports.default = Servidor;
