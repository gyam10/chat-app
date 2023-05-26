const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await UserModel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hash = await bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hash,
    });
    delete user.password;
    return res.json({
      status: true,
      result: user,
    });
  } catch (error) {
    next({
      status: 500,
      msg: error,
    });
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect Username or password", status: false });
    }
    const isPassword = await bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res.json({ msg: "Incorrect Username or password", status: false });
    }
    delete user.password;
    return res.json({
      status: true,
      result: user,
    });
  } catch (error) {
    next({
      status: 500,
      msg: error,
    });
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next({
      status: 500,
      msg: error,
    });
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ users });
  } catch (error) {
    next({
      status: 500,
      msg: error,
    });
  }
};

module.exports = { register, login, setAvatar, getAllUsers };
