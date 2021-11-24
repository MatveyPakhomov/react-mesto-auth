import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import profileAvatar from "../images/profile-Avatar.jpg"
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
          <button type="button" onClick={props.onEditAvatar} aria-label="Кнопка: поменять аватар" className="profile__avatar-edit-button">
            <img
              src={currentUser.avatar ? currentUser.avatar : profileAvatar}
              alt="Картинка: портрет - Жак-Ив Кусто"
              className="profile__avatar"
            />
          </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name ? currentUser.name : 'Жак-Ив Кусто'}</h1>
          <button type="button" onClick={props.onEditProfile} aria-label="Кнопка: редактировать" className="profile__edit-button"></button>
          <p className="profile__subtitle">{currentUser.about ? currentUser.about : 'Исследователь океана'}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} aria-label="Кнопка: добавить место" className="profile__add-button"></button>
      </section>
      <div className="cards">
        <ul className="cards__list">
        {props.cards.map(({ key, ...options }) => <Card handleClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={key} { ...options } />)}
        </ul>
      </div>
    </main>
  )
}

export default Main;
