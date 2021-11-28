import React from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
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
    let { email, password } = state;
    props
      .onLogin(email, password)
      .then(() => {
        setError("");
        navigate("/");
      })
      .catch((e) => setError(e.message));
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          required
          id="email"
          name="email"
          type="email"
          value={state.email}
          className="login__input"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={state.password}
          className="login__input"
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="login__submit-button"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
