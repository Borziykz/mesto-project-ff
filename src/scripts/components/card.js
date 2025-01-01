import { toggleLike, deleteCard } from "./api";

export function createCard(cardData, onImageClick, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCount = cardElement.querySelector(".like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Устанавливаем состояние кнопки лайка
  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Event listeners
  cardImage.addEventListener("click", () => onImageClick(cardData));

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

  // Запрос к API (ставим или убираем лайк)
  toggleLike(cardId, isLiked)
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
  deleteCard()
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