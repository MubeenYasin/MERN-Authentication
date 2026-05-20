import { useState } from "react";
import TextInput from "../../commponents/TextInput/TextInput";
import style from "./Login.module.css";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
      console.log(`response await login(data)`);
      console.log(response);
      console.log(`response await login(data)`);

      // 1. setUser
      const user = {
        _id: response.data.User._id,
        email: response.data.User.email,
        name: response.data.User.name,
        auth: response.data.auth,
        // auth: true,
      };
      dispatch(setUser(user));
      // 2. redirect to home page
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error
      setError(response.response.data.errorMessage);
    }
  };
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });
  return (
    <div className={style.loginWrapper}>
      <div className={style.loginHeader}>Login to your account</div>
      <TextInput
        type="text"
        placeholder="email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        placeholder="passwors"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button className={style.loginBtn} onClick={handleLogin}>
        Login
      </button>
      <span>
        Don't have an account?
        <button
          className={style.registerBtn}
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </span>
    </div>
  );
}
export default Login;
