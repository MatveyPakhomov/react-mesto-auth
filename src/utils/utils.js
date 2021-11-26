export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export function cardConfig(data) {
  return {
    ownerId: data.owner._id,
    cardId: data._id,
    key: data._id,
    url: data.link,
    title: data.name,
    alt: data.name,
    likes: data.likes,
  };
}

// //формы для валидации
// export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
// export const formAddPlace = document.querySelector('.popup__form_type_add-place');
// export const formEditAvatar = document.querySelector('.popup__form_type_edit-avatar');

// export const container = document.querySelector('.elements__list');
// export const itemTemplate = document.querySelector('.template-elements');

// const profile = document.querySelector('.profile');
// export const editButton = profile.querySelector('.profile__edit-button');
// export const profileName = profile.querySelector('.profile__title');
// export const profileJob = profile.querySelector('.profile__subtitle');
// export const addButton = profile.querySelector('.profile__add-button');
// export const updateButton = profile.querySelector('.profile__avatar-edit-button');
// export const profileAvatar = profile.querySelector('.profile__avatar');

// //popups
// const popupEdit = document.querySelector('.popup_type_edit');

// //popups input
// export const nameInput = popupEdit.querySelector('.popup__input_value_name');
// export const jobInput = popupEdit.querySelector('.popup__input_value_job');

// //селекторы попапов
// export const popupPreview = '.popup_type_view';
// export const popupCard = '.popup_type_create';
// export const popupProfile = '.popup_type_edit';
// export const popupDelete = '.popup_type_delete';
// export const popupAvatar = '.popup_type_update-avatar';
