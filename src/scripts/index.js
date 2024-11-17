import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './components/cards.js';
import '../pages/index.css';

// DOM Elements
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editButtonPopup = document.querySelector('.popup_type_edit');
const addButtonPopup = document.querySelector('.popup_type_new-card');
const editFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector(".popup_type_image");
const popupImage = popup.querySelector(".popup__image");
const popupCaption = popup.querySelector(".popup__caption");

// Initialize Cards
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData, openImagePopup);
    cardsContainer.append(card);
  });
}

renderInitialCards();

// Modal Handlers
function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editButtonPopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editButtonPopup);
}

editButton.addEventListener('click', openEditPopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

// Add New Card
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const newCard = createCard({ name: placeName, link: placeLink }, openImagePopup);
  cardsContainer.prepend(newCard);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  closePopup(addButtonPopup);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Open Add Card Popup
addButton.addEventListener('click', () => openPopup(addButtonPopup));

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(popup);
}
