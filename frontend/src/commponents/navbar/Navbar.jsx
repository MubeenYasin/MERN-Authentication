import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  const is_active = ({ isActive }) => isActive ? style.active : style.inActive;
  const isAuthticate = false ;

  return (
    <>
      <nav className={style.navbar}>
        <NavLink to="/" className={`${style.logo} ${style.inActive}`}>
          Sibgha Collection
        </NavLink>
        <NavLink to="/" className={is_active}>
          Home
        </NavLink>
        <NavLink to="/crypto" className={is_active}>
          Crypto Currencies
        </NavLink>
        <NavLink to="/blogs" className={is_active}>
          Blogs
        </NavLink>
        <NavLink to="/submit" className={is_active}>
          Submit
        </NavLink>
        { isAuthticate ? <div><button className={style.signoutBtn}>Logout</button></div> : <div>
        <NavLink to="/login" className={is_active}>
          <button className={style.loginBtn}>Login</button>
        </NavLink>
        <NavLink to="/signup" className={is_active}>
          <button className={style.signupBtn}>Sign Up</button>
        </NavLink>
        </div>}
      </nav>
        <div className={style.seprator}></div>
    </>
  );
}

export default Navbar;
