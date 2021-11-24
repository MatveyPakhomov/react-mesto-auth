import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      containerName="popup__container_type_edit-avatar"
      title="Обновить аватар"
      submitButtonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input type="url" id="update-avatar" ref={avatar} name="avatar" placeholder="Ссылка на новый аватар" className="popup__input popup__input_value_link" required />
        <span id="update-avatar-error" className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
