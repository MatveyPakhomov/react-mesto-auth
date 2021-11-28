import React from "react";

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}
    >
      <figure className="popup__image-field">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Кнопка: закрыть"
          className="popup__close-button popup__close-button_image"
        ></button>
        <img
          className="popup__image"
          src={props.card?.url}
          alt={props.card?.title}
        />
        <figcaption className="popup__caption">{props.card?.title}</figcaption>
      </figure>
    </div>
  );
}
