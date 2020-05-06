const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    // salt를 이용해서 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // Store hash in DB
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  // hashing된 걸 복호화할 수 없으므로 암호화하여 비교
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
};

userSchema.methods.generateToken = function (cb) {
  // jsonwebtoken으로 token 생성
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
