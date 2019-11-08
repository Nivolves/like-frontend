import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo192.png';

import './Header.scss';

const Header: React.FC = (): JSX.Element => (
  <header>
    <div className="header-container">
      <Link to="/" className="logo-container">
        <img src={logo} alt="NivoLike" />
      </Link>
      <Link to="/history" className="header-link">
        History
      </Link>
    </div>
  </header>
);

export default Header;
