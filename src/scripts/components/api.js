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
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получить информацию о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkResponse);
}

// Получить начальные карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkResponse);
}

// Обновить данные пользователя (имя и описание)
export function updateUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

// Обновить аватар пользователя
export function updateAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

// Добавить новую карточку
export function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

// Удалить карточку
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

// Поставить или снять лайк
export function toggleLike(cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers
  });
}

