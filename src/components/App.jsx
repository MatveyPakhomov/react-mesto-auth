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
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userInfo, cardList]) => {
          setCurrentUser(userInfo);
          setCards(cardList.map((item) => cardConfig(item)));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // React.useEffect(() => {
  //   checkToken();
  // });

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
    setIsInfoTooltipOpen(false);
    setInfoTooltipData({});
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keyup", handleEscClose);
    return () => document.removeEventListener("keyup", handleEscClose);
  });

  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleOverlayClose);
    return () => document.removeEventListener("mousedown", handleOverlayClose);
  }, []);

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
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  // const handleLogin = ({ password, email }) => {
  //   auth
  //     .login(password, email)
  //     .then((res) => {
  //       console.log(res.message);
  //       if (res.message === "Вход совершен успешно") {
  //         checkToken()
  //         setIsLoggedIn(true);
  //         history.push("/");
  //         setUserEmail(email);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsInfoTooltipOpen(true);
  //       setMessage({
  //         image: failedReg,
  //         text: "Что-то пошло не так! Попробуйте ещё раз.",
  //       });
  //     });
  // };

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "success",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function getAuthUserInfo(jwt) {
    auth
      .getContent(jwt)
      .then((res) => {
        setLoggedIn(true);
        navigate("/");
        setUserData({
          email: res.data.email,
          title: "Выйти",
          link: "/sign-in",
        });
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    const jwt = document.cookie.valueOf("jwt");
    if (jwt) {
      getAuthUserInfo(jwt);
    }
    //пока думаю как решить эту проблему
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // function checkToken() {
  //   const jwt = document.cookie.valueOf("jwt");
  //   if (jwt) {
  //     console.log(jwt);
  //     auth
  //       .getContent(jwt)
  //       .then((res) => {
  //         setUserData({
  //           email: res.data.email,
  //           title: "Выйти",
  //           link: "/sign-in",
  //         });
  //         setLoggedIn(true);
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  // React.useEffect(() => {
  //   if (document.cookie.includes("jwt=")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
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
            <Route
              path="*"
              element={!loggedIn ? <Navigate to="/sign-in" /> : "/"}
            />
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
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            data={infoTooltipData}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
