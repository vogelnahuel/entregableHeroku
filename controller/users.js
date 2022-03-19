const { createTransport } = require("nodemailer");
const { crearError } = require("../utils/utils");
const {usersDaoVar} = require('../Daos/index')
const { carrito } = require("../Daos/index");
const { generateToken } = require("../utils/token");
const log4js = require('log4js')
const loggerFile = log4js.getLogger('archivo')

const  smtpTransport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  },
});
const accountSID="AC300861e461e8a47a5b312131c2bc76c1";
const authToken="968837c95f068e2c25fb688c20ee9110";
const client = require('twilio')(accountSID,authToken);


const usersPostCreate = async (req, res, next) => {
  try {
    const MAIL_OPTIONS = {
      from: "Servidor de node.js",
      to: req.body.username,
      subject: "Nuevo usuario",
      html: '<h1 style="color:blue;"> '+req.body.nombre+req.body.edad+req.body.direccion+'  </h1>',
    };

    await smtpTransport.sendMail(MAIL_OPTIONS);
  } catch (error) {
    loggerFile.warn(error);
    return next(crearError(error, "error al enviar email"));
  }

  res.json({ text: "se creo con exito" });
};

const usersPostLogin = async (req, res, next) => {
  let carritoUser
  let resUser
  if (!req.isAuthenticated()) {
    res.json({ text: "error" });
  }
  try {
     resUser =  await usersDaoVar.getCarrito(req.body.username);

     carritoUser = await carrito.get(res._id);
  
  } catch (error) {
    loggerFile.warn(error);
    return next(crearError(errorMsg,"no se pudo encontrar"));
  }
  const token = generateToken(req.body.username)
  const carritoUserRes = {
    token,
    carritoUser,
    resUser
  }
  res.json(carritoUserRes);

};


const usersPostBuy = async (req, res, next) => {
  const {productos,username,nombre,telefono} = req.body;

  try {
    const MAIL_OPTIONS = {
      from: "Servidor de node.js",
      to: username,
      subject: `nuevo pedido de ${nombre} ${username}`,
      html: '<h1 style="color:blue;"> '+JSON.stringify(productos)+'  </h1>',
    };
    await client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: `nuevo pedido de ${nombre} ${username}`,
         to: `whatsapp:${telefono}`
       })

    await smtpTransport.sendMail(MAIL_OPTIONS);

  } catch (error) {
    loggerFile.warn(error);
    return next(crearError(error, "error al enviar email"));
  }

  res.json({ text: "se creo con exito" });

};
module.exports = {
  usersPostCreate,
  usersPostLogin,
  usersPostBuy
};
