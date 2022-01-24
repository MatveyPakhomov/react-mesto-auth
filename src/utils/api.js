class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getCardList() {
    return fetch(this.url + "/cards", {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this.url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(this.url + `/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this.headers,
      }).then(this._checkResponse);
    } else {
      return fetch(this.url + `/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      }).then(this._checkResponse);
    }
  }
}

const api = new Api({
  baseUrl: "http://api.pakhomov.nomoredomains.rocks",
  headers: {
    // authorization: "df65ab57-8f59-4984-a17c-2f08d584d2db",
    "Content-Type": "application/json",
  },
});

export default api;
