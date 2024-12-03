const config = {
    baseUrl: "https://nomoreparties.co/v1/cohort-42",
    headers: {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      "Content-Type": "application/json",
    },
  };
  
  /**
   * Проверяет ответ от сервера и возвращает JSON или отклоняет промис.
   * @param {Response} res - ответ сервера
   * @returns {Promise} - результат запроса в виде JSON или ошибка
   */
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  /**
   * Получает начальные карточки.
   * @returns {Promise} - массив карточек
   */
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
  };
  
  /**
   * Удаляет карточку.
   * @param {string} cardId - ID карточки
   * @returns {Promise} - результат операции
   */
  // Удаление карточки с сервера
export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then(checkResponse)  // Проверка ответа от сервера
      .catch((err) => {
        console.error("Ошибка удаления карточки:", err);
        throw err;
      });
  };
  
  
  /**
   * Меняет состояние лайка у карточки.
   * @param {string} cardId - ID карточки
   * @param {boolean} isLiked - состояние лайка (true - ставим, false - убираем)
   * @returns {Promise} - обновлённые данные карточки
   */
  export const toggleLikeCardApi = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: config.headers,
    }).then(checkResponse);
  };
  
  /**
   * Обновляет информацию профиля.
   * @param {Object} data - данные профиля { name, about }
   * @returns {Promise} - обновлённые данные профиля
   */
  export const updateProfile = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(checkResponse);
  };
  
  /**
   * Обновляет аватар профиля.
   * @param {string} avatarUrl - URL нового аватара
   * @returns {Promise} - обновлённые данные профиля
   */
  export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(checkResponse);
  };
  
  /**
   * Получает данные текущего пользователя.
   * @returns {Promise} - данные пользователя
   */
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
  };

  