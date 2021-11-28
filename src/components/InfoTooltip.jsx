import React from "react";
import "./styles/InfoTooltip.css";
import failImage from "../images/fail.svg";
import successImage from "../images/success.svg";

export default function InfoTooltip({ data, ...props }) {
  const successAnswer = "Вы успешно зарегистрировались!";
  const failAnswer = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`infoTooltip ${props.isOpen ? "infoTooltip_opened" : ""}`}>
      <div className="infoTooltip__container">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Кнопка: закрыть"
          className="infoTooltip__close-button"
        ></button>
        <img
          className="infoTooltip__image"
          src={data.className === "success" ? successImage : failImage}
          alt={`Картинка: ${
            data.className === "success" ? "черная галочка" : "красный крестик"
          } в кружке`}
        />
        <p className={`infoTooltip__title`}>
          {data.className === "success" ? successAnswer : failAnswer}
        </p>
      </div>
    </div>
  );
}
