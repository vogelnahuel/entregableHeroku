import multer from "multer";

export const filtrar = (array:any, idParam:string | number) => {
  if (array === undefined || array.length === 0) {
    const error:any = new Error("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  const filtrado = array.filter((array:any) => array.id === idParam);
  if (filtrado.length === 0) {
    const error:any = new Error("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  return filtrado;
};

export const inicializacionFile = () => {
  const storage = multer.diskStorage({
    destination: function (req:any, file:any, callback:any) {
      callback(null, "public");
    },
    filename: function (req:any, file:any, callback:any) {
      callback(null, file.originalname);
    },
  });
  return storage;
};

export const isAdmin = (req:any, res:any, next:any) => {

  let administrador = req.headers?.administrador;

  administrador = administrador ? JSON.parse(administrador) : false ;

  if (!administrador) {

    res
      .status(404)
      .send({ error: -1, descripcion: `ruta ${req.originalUrl} y  método  ${req.method} no autorizada` });
  }
  else {
    next();
  }

}


