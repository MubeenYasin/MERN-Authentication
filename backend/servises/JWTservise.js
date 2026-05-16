import jwt from "jsonwebtoken";
import config from "../config/config.js";
import RefreshToken from "../models/token.js";
class JWTservise {
  // 1: sign access token
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
      expiresIn: expiryTime,
    });
  }
  // 2: sign refresh token
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
      expiresIn: expiryTime,
    });
  }
  // 3: verify access token
  static verifyAccessToken(token) {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  }
  // 4: verify refresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
  }
  // 5: store refresh token
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshToken({
        token,
        userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}
export default JWTservise;
