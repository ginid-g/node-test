require("dotenv").config();

const User = require("../routes/users/User.model");
const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

async function userSeed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = {
    email: "test@mail.com",
    password: "123456",
  };

  await User.deleteMany({});

  bcrypt.hash(user.password, 8, async function (err, hash) {
    if (err) {
      console.log("User seed failed");
      console.log(err);
    }

    try {
      let newUser = new User({
        email: user.email,
        hash: hash,
      });

      await newUser.save();

      console.log("User seed successfull");
    } catch (error) {
      console.log("Seed Failed");
      console.log(error);
    }
  });
}

userSeed();
