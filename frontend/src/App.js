import style from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './commponents/Navbar/Navbar';
import Footer from './commponents/Footer/Footer';
import Protected from './commponents/Protected/Protected';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Signup from './pages/Signup/Signup';

function App() {
  const isAuth = useSelector(state => state.user.auth) ; 
  return (
    <div className={style.container}>
      <BrowserRouter>
        <div className={style.layout}>
          <Navbar />
          <Routes>
            <Route
              path='/'
              exact
              element={
                <div className={style.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path='/crypto'
              exact
              element={
                <div className={style.main}>crypto</div>
              }
            />
            <Route
              path='/blogs'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}>Blogs page</div>
                </Protected>
              }
            />
            <Route
              path='/submit'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}>Submit a blog</div>
                </Protected>
              }
            />
            <Route
              path='/login'
              exact
              element={
                <div className={style.main}><Login /></div>
              }
            />
            <Route
              path='/signup'
              exact
              element={
                <div className={style.main}>
                  <div><Signup /></div>
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
