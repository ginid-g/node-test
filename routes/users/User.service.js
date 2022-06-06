const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./User.model");

module.exports = { authenticate, getUsers };

async function authenticate(email, password) {
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      authToken: token,
    };
  } else {
    throw "Invalid Username or Password";
  }
}

async function getUsers() {
  const users = await User.find();

  return users;
}
