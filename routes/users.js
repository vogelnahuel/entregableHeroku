const { Router } = require("express");

const { usersPostCreate, usersPostLogin,usersPostBuy } = require("../controller/users");
const passport = require("passport");

const routerUsers = Router();

routerUsers.post("/create",passport.authenticate("signup"),usersPostCreate);
routerUsers.post("/login",passport.authenticate("login"), usersPostLogin);
routerUsers.post("/buy", usersPostBuy);

module.exports = routerUsers;
