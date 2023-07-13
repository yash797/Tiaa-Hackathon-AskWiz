const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const multer = require('multer');

const UserSchema = mongoose.Schema(
{
    Name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
      min: 3,
    },
    salt: String,
    picturePath: {
      type: String,
      default: "",
    },
    age : {
        type : Number,
    },
    sex : {
        type : String,
        required: true,
    },
    description: {
      type: String,
      default: "",
    }
},
{ timestamps: true }
);

UserSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; // _ used to indicate its a private a variable

    this.salt = uuidv1();

    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });


const UserModel= mongoose.model("User", UserSchema);
module.exports = UserModel;