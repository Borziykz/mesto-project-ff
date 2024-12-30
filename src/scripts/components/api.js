// api.js

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
  headers: {
    authorization: 'fbac0bd2-60a8-471d-baca-3c798bec7877',
    'Content-Type': 'application/json',
  }
};

// Функция для обработки ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получить информацию о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(checkResponse);
}

// Получить начальные карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при получении карточек: ${err}`));  // Обработка ошибки
}

// Обновить данные пользователя (имя и описание)
export function updateUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`));
}

// Обновить аватар пользователя
export function updateAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при обновлении аватара: ${err}`));
}

// Добавить новую карточку
export function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
}

// Удалить карточку
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
}

// Поставить или снять лайк
export function toggleLike(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
  .catch((err) => console.log(`Ошибка при лайке карточки: ${err}`));
}
