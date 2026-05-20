import style from "./TextInput.module.css";

function TextInput(props) {
  return (
    <div className={style.texInputWrapper}>
      <input {...props} />
      {props.error && (
        <p className={style.errorMessage}>{props.errormessage}</p>
      )}
    </div>
  );
}

export default TextInput;
