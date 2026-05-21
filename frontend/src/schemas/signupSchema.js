import * as yup from "yup"


const mobilePattren = /^0[1-9]\d{6,14}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
const errorMsg = 'use lowercase, uppercase and degits only, minimum 6 letters'

const signupSchema = yup.object().shape({
    name: yup.string().min(5).max(24).required('Name is required'),
    email: yup.string().email().required('Email is required'),
    mobile: yup.string().matches(mobilePattren, "Invalid Mobile number").required('Mobile number is required'), // yup module
    password: yup.string().matches(passwordPattern, {message: errorMsg}).required('Password is requird'), // yup module
    confirmPassword: yup.string().oneOf([yup.ref("password")]).required('Confirm Password is required')

})

export default signupSchema