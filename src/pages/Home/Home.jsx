import React from 'react';
import './Home.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Home() {
  return (
    <div className="Home">
      <Header />
      <main className="main">Главная</main>
      <Footer />
    </div>
  );
}

export default Home;
