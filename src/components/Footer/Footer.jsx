import React from 'react';
import './Footer.scss';
import rssLogo from '../../assets/svg/rssLogo.svg';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__content">
        <div className="left-column">
          <a
            className="rss-logo-link"
            href="https://rs.school/js/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="rss-logo-img" src={rssLogo} alt="rss-logo" />
          </a>
          <span className="year">2022</span>
        </div>
        <div className="right-column">
          <a
            className="github-link"
            href="https://github.com/NikitaKorevo"
            target="_blank"
            rel="noopener noreferrer"
          >
            nikitakorevo
          </a>
          <a
            className="github-link"
            href="https://github.com/alexzdch"
            target="_blank"
            rel="noopener noreferrer"
          >
            alexzdch
          </a>
          <a
            className="github-link"
            href="https://github.com/artemgomel89"
            target="_blank"
            rel="noopener noreferrer"
          >
            artemgomel89
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
