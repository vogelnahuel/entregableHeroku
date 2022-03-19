const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { userModel } = require("../Daos/userMongo");
const mongoose = require("mongoose");
const brcypt = require('bcrypt');
const log4js = require('log4js')
const loggerFile = log4js.getLogger('archivo')

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {

    const res =await userModel.findOne({username})
   if(!res){
    loggerFile.error("el usuario no existe");
    return done(null,false)
   }
   else{
        const compare = await brcypt.compare(password,res.password)
      if(!compare){
        loggerFile.error("las contraseñas no son iguales");
        return done(null, false);
      }

  return done(null, res);
   }

  })
);

passport.use(
  "signup",
  new localStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
     const res = await  userModel.findOne({ username })
      
     if(res){
      loggerFile.warn("el usuario ya existe");
       return done(null,false)
     }
 
      
      const  passwordHash=await brcypt.hash(password, 10);
 
      const newUser = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        username,
        password:passwordHash,
        nombre: req.body.nombre,
        edad: req.body.edad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        avatar: req.body.avatar,
      };

     const resCreate = await userModel.create(newUser);
     return done(null,resCreate);
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

