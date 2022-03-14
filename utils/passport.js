const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { userModel } = require("../Daos/userMongo");
const mongoose = require("mongoose");
const brcypt = require('bcrypt');

passport.use(
  "login",
  new localStrategy((username, password, done) => {
    userModel.findOne({ username: username }, (error, user) => {
      if (error) {
        done(err);
      }

      if (!user) {
        return done(null, false);
      }
      const compare = brcypt.compareSync(password,user.password)
      if(!compare){
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new localStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      userModel.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log("el usuario ya existe");
          return done(null, false);
        }
      });

 
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

      userModel.create(newUser, (err, userWithId) => {
        if (err) return done(err);

        return done(null, userWithId);
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  const res = userSchema.findById(id, done);
  done(null, res);
});
