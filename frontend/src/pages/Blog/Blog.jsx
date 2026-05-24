import { getAllBlogs } from "../../api/internal";
import Loader from "../../commponents/Loader/Loader";
import { useState, useEffect } from "react";
import style from "./Blog.module.css"

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async function getAllBlogsApi() {
      const respose = await getAllBlogs();

      if (respose.status === 200) {
        setBlogs(respose.data.blogs);
      }
    })();
    setBlogs([]);
  }, []);

  if (blogs.length === 0) {
    return <Loader />;
  }

  return (
    <div className={style.blogWrapper}>
      {blogs.map((blog) => (
        <div id={blog._id} className={style.blog}>
          <h2>{blog.title} </h2>
          <img src={blog.photoPath} alt="No access" />
          <p>{blog.content} </p>
        </div>
      ))}
    </div>
  );
}
export default Blog;
