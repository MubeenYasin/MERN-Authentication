import User from "../models/user.js ";
import UserDto from "../dto/userDto.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import JWTservise from "../servises/JWTservise.js";
import RefreshToken from "../models/token.js";

// to creat object of authController
const mobilePattren = /^0[1-9]\d{6,14}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
const oneDay = 1000 * 60 * 60 * 24;
const authController = {
  //REGISTER CONTROLLER
  //  1: register function
  register: async (req, res, next) => {
    try {
      const { name, mobile, email, password } = req.body;
      const userRegisterSchema = Joi.object({
        name: Joi.string().min(5).max(24).required(),
        mobile: Joi.string().pattern(mobilePattren).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(),
        confirmPassword: Joi.ref("password"),
      });
      //  2: user input validation with Joi Object function
      const { error } = userRegisterSchema.validate(req.body);
      // if error occored
      if (error) {
        // return res.status(400).send(error.details[0].message);
        return next(error);
      }
      //  3: if mobile number or email is already exist
      const mobileExist = await User.exists({ mobile });
      const emailExist = await User.exists({ email });
      if (mobileExist) {
        const error = {
          status: 409,
          message: "Mobile number already registered use another number",
        };
        return next(error);
      }
      if (emailExist) {
        const error = {
          status: 409,
          message: "Email already registered use another email",
        };
        return next(error);
      }
      //  5: store user data in db
      const user = new User(req.body);
      await user.save();

      let accessToken;
      let refreshToken;
      try {
        //  token generation
        accessToken = JWTservise.signAccessToken(
          { _id: user._id, email: user.email },
          "30m",
        );
        refreshToken = JWTservise.signRefreshToken({ _id: user._id }, "24h");
      } catch (error) {
        return next(error);
      }

      // store refresh token in db
      await JWTservise.storeRefreshToken(refreshToken, user._id);
      //  send toeken in cookie
      res.cookie("accessToken", accessToken, {
        maxAge: oneDay,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: oneDay,
        httpOnly: true,
      });

      const userDto = new UserDto(user);
      res.status(201).json({ newUser: userDto, auth: true });
    } catch (error) {
      return next(error);
    }
  },

  //  LOGIN CONTROLLER
  login: async (req, res, next) => {
    const { email, password } = req.body;
    let user;

    //  1: validation user's inputs in form
    try {
      const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(),
      });
      //  2: if validation error, return error
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      user = await User.findOne({ email }); // all data will be get from User document
      if (!user) {
        return res.status(404).send("Invalid Email");
      }
      // to compare password from database and userEmail form req.body
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTservise.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTservise.signRefreshToken({ _id: user._id }, "24h");
    //  update refresh token in database
    try {
      await RefreshToken.updateOne(
        { _id: user._id },
        { token: refreshToken },
        { upsert: true },
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: oneDay,
      hhtpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: oneDay,
      hhtpOnly: true,
    });

    const userDto = new UserDto(user);
    res.status(200).json({ User: userDto, auth: true});
  },

  //  LOGOUT CONTROLLER
  logout: async (req, res, next) => {
    console.log(req);
    // 1: delete refresh token
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }
    //  2:  clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // 3: response
    res.status(200).json({ user: null, auth: false });
  },

  // REFRESH CONTROLLER
  refresh: async (req, res, next) => {
    // 1. get refresh token
    const orignalRrefreshToken = req.cookies.refreshToken;
    // 2. veryfy refresh token
    let _id;
    try {
      _id = JWTservise.verifyRefreshToken(orignalRrefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unaturised ....."
      }
      return next(error);
    }
    try {
      const match = RefreshToken.findOne({ _id: _id, token: orignalRrefreshToken })

      if (!match) {
        const error = {
          status: 401,
          message: "Unathurised ....."
        }
        return next(error)
      }
    }
    catch (e) {
      return next(e)
    }
    // 3. generate new token
    try {
      const newRefreshToken = JWTservise.signRefreshToken({ _id: _id }, '30m')
      const newAccessToken = JWTservise.signAccessToken({ _id: _id }, '60m')
      // 4. update data base
      await RefreshToken.updateOne({ _id: _id }, { token: newRefreshToken })
      // await RefreshToken.updateOne({_id: _id}, {token: newAccessToken})
      res.cookie('newAccessToken', newAccessToken, {
        maxAge: oneDay,
        httpOnly: true
      })
      res.cookie('newRefreshToken', newRefreshToken, {
        maxAge: oneDay,
        httpOnly: true
      })
    } catch (error) { return next(error) }
    // 5. response
    const user = await User.findOne({ _id: _id })
    const userDto = new UserDto(user)
    res.status(200).json({ user: userDto, auth: true })
  },
};

export default authController;
