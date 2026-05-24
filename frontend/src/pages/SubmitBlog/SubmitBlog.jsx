import { useState } from "react";
import { useSelector } from "react-redux";
import { submitBlog } from "../../api/internal";
import style from "./SubmitBlog.module.css";
import TextInput from "../../commponents/TextInput/TextInput";
import { useNavigate } from "react-router-dom";

function SubmitBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  
  // 1. یہاں '_Id' کو بدل کر '_id' کر دیا (تاکہ مونوگو ڈی بی آئی ڈی ٹھیک سے ملے)
  const author = useSelector((state) => state.user._id); 

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    // اگر یوزر نے تصویر سلیکٹ نہیں کی تو یہیں روک دیں
    if (!photo) {
      alert("select pictue");
      return;
    }

    const data = { author, title, content, photo };
    const response = await submitBlog(data);
    
    // 2. یہاں چیک کریں کہ response ملا ہے اور اس کا status 201 ہے
    if (response && response.status === 201) {
      navigate("/blogs");
    } else {
      alert("lgin again");
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>Create a Blog</div>
      <TextInput
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        className={style.content}
        placeholder="Your content goes here...."
        maxLength={500}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={style.photoPtompt}>
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => getPhoto(e)}
        />
      </div>
      {photo !== '' ? <img src={photo} width={100} alt="img"/>: ''}
      <button className={style.submitBtn} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
}
export default SubmitBlog;