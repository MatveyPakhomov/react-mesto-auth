import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.ownerId === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button"
  }`;

  function handleClick() {
    props.handleClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        onClick={handleClick}
        src={props.url}
        alt={props.alt}
      />
      <div className="card__section">
        <h2 className="card__title">{props.title}</h2>
        <button
          type="button"
          onClick={handleDeleteClick}
          aria-label="Кнопка: удалить карточку"
          className={cardDeleteButtonClassName}
        ></button>
        <div className="card__like-section">
          <button
            type="button"
            onClick={handleLikeClick}
            aria-label="Кнопка: мне нравится"
            className={cardLikeButtonClassName}
          ></button>
          <p className="card__like-counter">{props.likes?.length}</p>
        </div>
      </div>
    </li>
  );
}
