import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container ${props.containerName}`}>
        <button type="button" onClick={props.onClose} aria-label="Кнопка: закрыть" className="popup__close-button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.submitButtonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
