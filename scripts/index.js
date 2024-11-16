// index.js
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
const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Initialize Cards
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
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

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editButtonPopup);
}

editButton.addEventListener('click', openEditPopup);
formElement.addEventListener('submit', handleFormSubmit);

// Add New Card
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const newCard = createCard({ name: placeName, link: placeLink });
  cardsContainer.prepend(newCard);
  closePopup(addButtonPopup);
  newCardForm.reset();
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Open Add Card Popup
addButton.addEventListener('click', () => openPopup(addButtonPopup));

// Close Popups on Click Outside or Close Button
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});
