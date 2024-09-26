const userModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const maxAge = 30 * 24 * 60 * 60;

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: maxAge });
  return token;
};

module.exports.Register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.json({
        message: "Email already in use",
        status: false,
      });
    }

    const newUser = new userModel({
      username,
      email,
      password,
    });

    const userDetails = await newUser.save();
    const token = createToken(userDetails._id);
    return res.json({
      message: "Account created",
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

module.exports.Login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
  
      if (!existingUser) {
        return res.json({
          message: "User not found",
          status: false,
        });
      }
  
      const passwordMatch = await bcryptjs.compare(
        password,
        existingUser.password
      );
      if (!passwordMatch) {
        return res.json({
          message: "Wrong password",
          status: false,
        });
      }
  
      const token = createToken(existingUser._id);
      res.json({
        message: "Login successful",
        status: true,
        user: existingUser,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Internal server error",
        status: false,
      });
    }
  };