export function createCard(cardData, onImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Event listeners
  cardImage.addEventListener("click", () => onImageClick(cardData));
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) =>
    handleDeleteCard(event, cardElement)
  );

  likeButton.addEventListener("click", () => handleLikeClick(likeButton));

  return cardElement;
}

function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(event, cardElement) {
  event.stopPropagation();
  cardElement.remove();
}
