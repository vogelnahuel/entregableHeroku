const multer = require("multer");


const filtrar = (array, idParam) => {
  if (array === undefined || array.length === 0) {
    const error = new Error("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  const filtrado = array.filter((array) => array.id == idParam);

  if (filtrado.length === 0) {
    const error = new Error("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  return filtrado;
};

const inicializacionFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  });
  return storage;
};

const isAdmin = (req, res, next) => {
  let administrador = req.headers?.administrador;

  administrador = administrador ? JSON.parse(administrador) : false;

  if (!administrador) {
    res.status(404).send({
      error: -1,
      descripcion: `ruta ${req.originalUrl} y  método  ${req.method} no autorizada`,
    });
  } else {
    next();
  }
};

const crearError = (errorMsg, msgCustom) => {
  errorMsg.msg = errorMsg.msg ? errorMsg.msg : msgCustom;
  const error = new Error(errorMsg.msg);
  error.status = errorMsg.status;
  return error;
};



module.exports = {
  filtrar,
  inicializacionFile,
  isAdmin,
  crearError,

};
