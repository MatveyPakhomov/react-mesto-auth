import React from "react";
import "./styles/InfoTooltip.css";
import failImage from "../images/fail.svg";
import successImage from "../images/success.svg";

function InfoTooltip(props) {
  return (
    <div className={`infoTooltip ${props.card ? "infoTooltip_opened" : ""}`}>
      <div className="infoTooltip__container">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Кнопка: закрыть"
          className="infoTooltip__close-button infoTooltip__close-button"
        ></button>
        <img
          className="infoTooltip__image"
          src={successImage}
          alt="Картинка: красный крестик в кружке"
        />
        <p className="infoTooltip__title">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
