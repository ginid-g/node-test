const User = require("../routes/users/User.model");
const bcrypt = require("bcryptjs");

async function userSeed() {
  const user = {
    email: "test@mail.com",
    password: 123456,
  };

  await User.deleteMany({});

  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) {
      console.log("User seed failed");
      console.log(err);
    }

    try {
      let newUser = new User({
        email: user.email,
        password: hash,
      });

      await newUser.save();
    } catch (error) {
        console.log('Seed Failed');
        console.log(error);
    }
  });
}

userSeed();
