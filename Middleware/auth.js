const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const authToken = authHeader && authHeader.split(" ")[1];

    if (!authToken) {
      return res.json({
        message: "No Auth Token Found",
        status: false,
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    } catch (error) {
      return res.json({
        message: "An Error occured in Auth",
      });
    }

    const user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.json({
        message: "Unauthorized Access",
        status: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware Error : ", error);
    return res.json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
