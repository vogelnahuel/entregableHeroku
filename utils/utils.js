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


const crearError = (errorMsg, msgCustom) => {
  errorMsg.msg = errorMsg.msg ? errorMsg.msg : msgCustom;
  const error = new Error(errorMsg.msg);
  error.status = errorMsg.status;
  return error;
};



module.exports = {
  filtrar,
  inicializacionFile,
   crearError,
};
