import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      submitButtonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          id="create-title"
          value={name || ""}
          onChange={handleChangeName}
          name="name"
          placeholder="Название"
          className="popup__input popup__input_value_place"
          required
          minLength="2"
          maxLength="30"
        />
        <span id="create-title-error" className="popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          type="url"
          id="create-subtitle"
          value={link || ""}
          onChange={handleChangeLink}
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_value_link"
          required
        />
        <span id="create-subtitle-error" className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}
