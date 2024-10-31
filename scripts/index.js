const cardsContainer = document.querySelector(".places__list");
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');
const closeButton = newCardPopup.querySelector('.popup__close');

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardElement.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

function openImagePopup(imageUrl, title) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  popupImage.src = imageUrl;
  popupImage.alt = title;
  popupCaption.textContent = title;
  
  imagePopup.classList.add('popup_is-opened');
}

const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');
imagePopupCloseButton.addEventListener('click', () => {
  document.querySelector('.popup_type_image').classList.remove('popup_is-opened');
});

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardsContainer.append(card);
  });
}

renderInitialCards();

addButton.addEventListener('click', () => {
  newCardPopup.classList.add('popup_is-opened');
});

closeButton.addEventListener('click', () => {
  newCardPopup.classList.remove('popup_is-opened');
});

function handleNewCardSubmit(event) {
  event.preventDefault();
  
  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);

  newCardForm.reset();
  newCardPopup.classList.remove('popup_opened');
}

newCardForm.addEventListener('submit', handleNewCardSubmit);
