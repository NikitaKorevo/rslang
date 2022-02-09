import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './constants/routes';
import Home from './pages/Home/Home';
import AudioCall from './pages/AudioCall/AudioCall';
import DevelopmentTeam from './pages/DevelopmentTeam/DevelopmentTeam';
import Sprint from './pages/Sprint/Sprint';
import Statistics from './pages/Statistics/Statistics';
import Textbook from './pages/Textbook/Textbook';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/Authorization/SIgnIn/SignIn.jsx';
import SignUp from './pages/Authorization/SignUp/SignUp.jsx';
import SignUpComplete from './components/SignUpComplete/SignUpComplete.jsx';
import { Context } from './store/store.js';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    JSON.parse(localStorage.getItem('userInfo'))?.isAuth
      ? store.setAuth(true)
      : store.setAuth(false);
  });

  return (
    <div className="App">
      <Header />
      <div className="App-main">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route
            path={`${ROUTES.SIGN_UP}${ROUTES.SIGN_UP_COMPLETE}`}
            element={<SignUpComplete />}
          />
          <Route path={ROUTES.AUDIO_CALL} element={<AudioCall />} />
          <Route path={ROUTES.DEVELOPMENT_TEAM} element={<DevelopmentTeam />} />
          <Route path={ROUTES.SPRINT} element={<Sprint />} />
          <Route path={ROUTES.STATISTICS} element={<Statistics />} />
          <Route path={ROUTES.TEXTBOOK} element={<Textbook />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
