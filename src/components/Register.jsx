import React from "react";
import "./styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // сюда добавим логику обработки формы регистрации
    const { email, password } = state;
    props
      .onRegister(email, password)
      .then(() => {
        setError("");
        navigate("/sign-in");
      })
      .catch((e) => setError(e.message));
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
          value={state.email}
          className="register__input"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={state.password}
          className="register__input"
          placeholder="Пароль"
          onChange={handleChange}
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
