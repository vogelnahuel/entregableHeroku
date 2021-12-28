import express from "express";
import { isAdmin } from '../utils/utils';
import cors from 'cors';
var corsOptions = { origin: '*' }
class Servidor {


  port?: string;
  productosPath: string;
  carritoPath: string;
  app: express.Application

  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions))
    this.port = process.env.PORT;
    this.productosPath = "/api/productos";
    this.carritoPath = "/api/carrito";

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
    this.app.use(isAdmin)
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
export default Servidor;
