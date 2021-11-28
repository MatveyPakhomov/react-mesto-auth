import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { cardConfig } from "../utils/utils";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList.map((item) => cardConfig(item)));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(props) {
    const isLiked = props.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(props.cardId, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => {
            return item.cardId === props.cardId ? cardConfig(newCard) : item;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(props) {
    api
      .deleteCard(props.cardId)
      .then(() => {
        setCards((state) =>
          state.filter((item) => {
            return item.cardId !== props.cardId;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards(() => [cardConfig(newCard), ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так!");
        }
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
          throw new Error("Что-то пошло не так!");
        }
      })
      .catch((err) => console.log(err));
  }

  function getAuthUserInfo(token) {
    auth
      .getContent(token)
      .then((res) => {
        setUserData({
          email: res.data.email,
          title: "Выйти",
          link: "/sign-in",
        });
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthUserInfo(token);
    }
  }, [loggedIn]);

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setUserData({
      title: "Регистрация",
      link: "/sign-up",
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header userData={userData} onSignOut={handleSignOut} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route element={<Navigate to={!loggedIn ? "sign-in" : "/"} />} />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="delete-place"
            containerName="popup__container_type_delete-place"
            title="Вы уверены?"
            submitButtonName="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
