import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

export default function Header({ userData, ...props }) {
  return (
    <header className="header page__header">
      <section className="header__section">
        <img
          src={headerLogo}
          alt="Логотип: Место - Россия"
          className="header__logo"
        />
        <section className="header__user-section">
          <p className="header__user-email">{userData.email}</p>
          <Link
            to={`${userData.link || "/sign-up"}`}
            className="header__link"
            onClick={props.onSignOut}
          >
            {userData.title || "Регистрация"}
          </Link>
        </section>
      </section>
    </header>
  );
}
