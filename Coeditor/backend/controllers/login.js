const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user.js");
loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!user || !passwordCorrect) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    response.status(200).send({
      token,
      username: user.username,
      name: user.name,
      id: user._id,
      rooms: user.rooms,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = loginRouter;
