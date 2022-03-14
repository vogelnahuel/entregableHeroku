const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  avatar: {
    type: String,
    required: true,
  },
});

let  userModel=mongoose.model("usuarios", userSchema);;
class usersDao {
  mongoDB;
  usersModel;

  constructor() {
    this.mongoDB = `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    mongoose.connect(this.mongoDB);
    this.usersModel = mongoose.model("usuarios", userSchema);
   
  }

  async findByEmail(email) {
    try {
      const getUser = await this.usersModel.findOne(email);

      if (!getUser) return done(null, false);

      return getUser;
    } catch (error) {
      throw error;
    }
  }
  async post(email, done) {

  }
}

module.exports = {userModel,usersDao};
