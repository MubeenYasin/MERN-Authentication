import style from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './commponents/navbar/Navbar';
import Footer from './commponents/footer/Footer';
import Protected from './commponents/protected/Protected';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  const isAuth = false ; 
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
                  <div>sign-up</div>
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
