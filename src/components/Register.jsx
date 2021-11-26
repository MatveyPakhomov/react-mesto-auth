import React from "react";
import './styles/Register.css'
import { Link } from "react-router-dom";

function Register() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('hello')
  }

  return(
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input required id="email" name="email" type="email" className="register__input" placeholder="Email" />
        <input required id="password" name="password" type="password" className="register__input" placeholder="Пароль" />
        <button type="submit" onSubmit={handleSubmit} className="register__submit-button">Зарегистрироваться</button>
        <section className="register__section">
          <p className="register__signin">Уже зарегистрированы?</p>
          <Link to="signin" className="register__login-link">Войти</Link>
        </section>
      </form>
    </div>
  );
}

export default Register;
