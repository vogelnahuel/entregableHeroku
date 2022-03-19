const express = require("express");
const cors = require("cors");
const passport = require('passport');
const { verifyToken } = require("../utils/token");
const log4js = require('log4js')
const logger = log4js.getLogger()

require('../utils/passport')


class Servidor {
  constructor() {
    this.app = express();
    this.app.use(cors({ origin: "*" }));
    this.app.use(passport.initialize())

    this.port = process.env.PORT;
    this.productosPath = "/api/productos";
    this.carritoPath = "/api/carrito";
    this.usersPath = "/api/users";

    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    //parseo y lectura del body de lo que mande el front en cualquier verbo http
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));
    //  middleware que  verifica si es admin o no
    this.app.use(verifyToken);
  }

  routes() {
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.carritoPath, require("../routes/carrito.js"));
    this.app.use(this.usersPath, require("../routes/users.js"));
    //ruta por defecto en caso de no encontrarse
    this.app.all("*", (req, res) => {
      console.log(req);
      res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.url} y  método  ${req.method} no implementados`,
      });
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      logger.info("servidor corriendo en puerto:" + this.port)
    });
  }
}

module.exports = Servidor;
