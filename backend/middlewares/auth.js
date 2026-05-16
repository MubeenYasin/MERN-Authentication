import JWTservise from "../servises/JWTservise.js";
import User from "../models/user.js";
import UserDto from "../dto/userDto.js";

const auth = async (req, res, next) => {
  try {
    // 1: access token and refresh toekn validation
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
      const error = {
        status: 401,
        message: "Unathurized User",
      };
      return next(error);
    }
    // 2: varify access token and refresh token
    let id;
    try {
      id = JWTservise.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }
    let user;
    try {
      user = await User.findOne({ _id: id });
    } catch (error) {
      return next(error);
    }
    const userDto = new UserDto(user);
    req.user = userDto;
    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
