export function createCard(cardData, onImageClick, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCount = cardElement.querySelector('.like-count');
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Event listeners
  cardImage.addEventListener("click", () => onImageClick(cardData));

  console.log(currentUserId)

  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (event) =>
      handleDeleteCard(event, cardElement, cardData._id)
    );
  }
  
  likeButton.addEventListener("click", () => handleLikeClick(likeButton, cardData._id));

  return cardElement;
}

function handleLikeClick(likeButton, cardId) {
  const cardElement = likeButton.closest(".card");
  const likeCountElement = cardElement.querySelector(".like-count");

  // Проверяем текущее состояние лайка
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";

  // Запрос к API
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: "fbac0bd2-60a8-471d-baca-3c798bec7877",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json(); // Обновлённые данные карточки
    })
    .then((updatedCard) => {
      // Обновляем интерфейс
      likeCountElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
    })
    .catch((error) => {
      console.error("Ошибка обновления лайков:", error);
    });
}


function handleDeleteCard(event, cardElement, cardId) {
  event.stopPropagation();
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "fbac0bd2-60a8-471d-baca-3c798bec7877",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      // Удаляем карточку из DOM, если запрос успешен
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка удаления карточки:", error);
    });
} 