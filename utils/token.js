const jwt = require("jsonwebtoken");
const {Http} = require ("./http");

/**
 *
 *  @brief genera un token aplicando las reglas que se requieran
 *  @param username email
 *  @returns  un JWT encriptado
 */
const  generateToken = (username) => {
  const token = jwt.sign({ data: username }, process.env.PRIVATE_KEY);

  return token;
};

/**
 *  @brief genera una fecha de expiracion para guardarlo a la base en la DB
 *  @returns  fecha de expiracion del token
 */

 const  expirationToken = () => {
  const actualDate = new Date();
  actualDate.setHours(actualDate.getHours() + 8);

  let d = new Date(actualDate),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("") + "" + [hour, minutes, seconds].join("");
};

/**
 *
 *  @brief verifica el jwt pasado en el header
 *  @returns  un http error o sigue de largo
 */
 const verifyToken = (
  req,
  res,
  next
) => {
  if (!URLS_WITHOUT_TOKEN_SESSION[req.url]) {
    const authHeader = req?.headers?.token ;
    if (!authHeader) {
      return Http.Unauthorized(
        "Invalid authorization",
        res
      );
    }
    jwt.verify(authHeader, process.env.PRIVATE_KEY, (err) => {
      if (err) {
      return  Http.Unauthorized(
          "Invalid authorization",
          res
        );
      }
    });
  }

  next();
};

module.exports= {
  generateToken,
  expirationToken,
  verifyToken
}

const URLS_WITHOUT_TOKEN_SESSION = {
  "/api/users/login": String,
  "/api/users/create": String,
};
