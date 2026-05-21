import signupSchema from "../../schemas/signupSchema";
import { useState } from "react";
import TextInput from "../../commponents/TextInput/TextInput";
import style from "./Signup.module.css";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/internal";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleSignup = async () => {
    const data = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const response = await signup(data);

    if (response.status === 201) {
      // console.log(response);
      // 1. setUser
      const user = {
        _id: response.data.newUser._id,
        name: response.data.newUser.name,
        email: response.data.newUser.email,
        mobile: response.data.newUser.mobile,
        auth: response.data.auth,
        // auth: true,
      };
      dispatch(setUser(user));
      // 2. redirect to home page
      navigate("/");
    } else if (response.response.status === 409) {
      // display error
      setError(response?.response?.data?.message);
    }
  };
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mibile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });
  return (
    <div className={style.signupWrapper}>
      <div className={style.signupHeader}>Create an account</div>
      <TextInput
        type="text"
        placeholder="Name"
        name="name"
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.name && touched.name ? true : undefined}
        errormessage={errors.name}
      />
      <TextInput
        type="text"
        placeholder="Mobile"
        name="mobile"
        value={values.mobile}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.mobile && touched.mobile ? true : undefined}
        errormessage={errors.mobile}
      />

      <TextInput
        type="text"
        placeholder="Email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.email && touched.email ? true : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password && touched.password ? true : undefined}
        errormessage={errors.password}
      />
      <TextInput
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={values.confirm_password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={
          errors.confirm_password && touched.confirm_password ? true : undefined
        }
        errormessage={errors.confirm_password}
      />
      {error && <p className={style.errorMsg}>{error}</p>}
      <button className={style.signupBtn} onClick={handleSignup}>
        Signup
      </button>

      <span>
        Have an account?
        <button className={style.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </span>
      {error && <p className={style.errorMsg}>{error}</p>}
    </div>
  );
}
export default Signup;
