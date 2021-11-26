import React from "react";
import "./styles/Register.css";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // сюда добавим логику обработки формы регистрации
    const { email } = setEmail;
    const { password } = setPassword;
    auth.register(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          required
          id="email"
          name="email"
          type="email"
          value={email}
          className="register__input"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          className="register__input"
          placeholder="Пароль"
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="register__submit-button"
        >
          Зарегистрироваться
        </button>
        <section className="register__section">
          <p className="register__signin">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__login-link">
            Войти
          </Link>
        </section>
      </form>
    </div>
  );
}

export default Register;
