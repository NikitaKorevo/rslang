import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './constants/routes';
import Home from './pages/Home/Home';
import AudioCall from './pages/AudioCall/AudioCall';
import Authorization from './pages/Authorization/Authorization';
import DevelopmentTeam from './pages/DevelopmentTeam/DevelopmentTeam';
import Sprint from './pages/Sprint/Sprint';
import Statistics from './pages/Statistics/Statistics';
import Textbook from './pages/Textbook/Textbook';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.AUDIO_CALL} element={<AudioCall />} />
        <Route path={ROUTES.AUTHORIZATION} element={<Authorization />} />
        <Route path={ROUTES.DEVELOPMENT_TEAM} element={<DevelopmentTeam />} />
        <Route path={ROUTES.SPRINT} element={<Sprint />} />
        <Route path={ROUTES.STATISTICS} element={<Statistics />} />
        <Route path={ROUTES.TEXTBOOK} element={<Textbook />} />
      </Routes>
    </div>
  );
}

export default App;
