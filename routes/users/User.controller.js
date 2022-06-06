const router = require("express").Router();
const UserService = require("./User.service");

const authGuard = require("../middleware/auth.guard");

router.post("/authenticate", (req, res, next) => {
  const { email, password } = req.body;

  UserService.authenticate(email, password)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch(next);
});

router.use(authGuard);

router.get("/all", (req, res, next) => {
  UserService.getUsers()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch(next);
});

module.exports = router;
