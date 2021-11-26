import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitButtonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          id="edit-title"
          value={name || ""}
          onChange={handleChangeName}
          name="name"
          className="popup__input popup__input_value_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="edit-title-error" className="popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          type="text"
          id="edit-subtitle"
          value={description || ""}
          onChange={handleChangeDescription}
          name="link"
          className="popup__input popup__input_value_job"
          placeholder="Вид деятельности"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="edit-subtitle-error" className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
