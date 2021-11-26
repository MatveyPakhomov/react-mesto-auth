import React from "react";
import './styles/Login.css'

function Login() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('hello')
  }

  return(
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input required id="email" name="email" type="email" className="login__input" placeholder="Email" />
        <input required id="password" name="password" type="password" className="login__input" placeholder="Пароль" />
        <button type="submit" onSubmit={handleSubmit} className="login__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
