const router = require("express").Router();
const UserService = require("./User.service");

router.post("/authenticate", (req, res, next) => {
  const { email, password } = req.body;

  UserService.authenticate(email, password)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch(next);
});

router.get("/all", (req, res, next) => {
  UserService.getUsers()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch(next);
});

module.exports = router;
