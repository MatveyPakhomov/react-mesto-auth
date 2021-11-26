import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header page__header">
      <img
        src={headerLogo}
        alt="Логотип: Место - Россия"
        className="header__logo"
      />
      <Link to="/sign-in" className="header__link">
        Войти
      </Link>
    </header>
  );
}

export default Header;
