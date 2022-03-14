const { createTransport } = require("nodemailer");
const { crearError } = require("../utils/utils");


const  smtpTransport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "vogelnahuel@gmail.com",
    pass: "ncnvfrrabvfstbcv"
  },
});

const MAIL_OPTIONS = {
  from: "Servidor de node.js",
  to: "xxxx@gmail.com",
  subject: "Mail de prueba",
  html: '<h1 style="color:blue;">SE CREO correctamente</h1>',
};

const usersPostCreate = async (req, res, next) => {
  try {
    await smtpTransport.sendMail(MAIL_OPTIONS);
  } catch (error) {
    console.log(error);
    return next(crearError(error, "error al enviar email"));
  }

  res.json({ text: "se creo con exito" });
};

const usersPostLogin = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.json({ text: "error" });
  }
  res.json({ text: "success" });
};

module.exports = {
  usersPostCreate,
  usersPostLogin,
};
