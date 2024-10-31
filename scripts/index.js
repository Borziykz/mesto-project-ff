const cardsContainer = document.querySelector(".places__list");
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');
const closeButton = newCardPopup.querySelector('.popup__close');

function deleteCard(event, cardElement) {
  event.stopPropagation();
  cardElement.remove();
}

function createCard(cardData, deleteCardHandler) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) => deleteCardHandler(event, cardElement));
  
  return cardElement;
}


function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard);
    cardsContainer.append(card);
  });
}

renderInitialCards();
