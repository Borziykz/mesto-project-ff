import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import "../pages/index.css";
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, addCard } from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// DOM Elements
const profilePopup = document.getElementById("edit-profile-popup");
const profileForm = profilePopup.querySelector(".popup__form");
const cardPopup = document.getElementById("new-card-popup");
const cardForm = cardPopup.querySelector(".popup__form");
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editButtonPopup = document.querySelector(".popup_type_edit");
const addButtonPopup = document.querySelector(".popup_type_new-card");
const editFormElement = document.querySelector(".popup_type_edit .popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileImageChange = document.querySelector(".popup_type_profile_image");
const avatarInput = document.querySelector(".avatar__input");
const popup = document.querySelector(".popup_type_image");
const popupImage = popup.querySelector(".popup__image");
const popupCaption = popup.querySelector(".popup__caption");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const placeNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const placeLinkInput = newCardForm.querySelector(".popup__input_type_url");
const saveButton = editFormElement.querySelector(validationConfig.submitButtonSelector);

let currentUserId;

// Fetch User Data
getUserInfo()
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    currentUserId = userData._id;

    return getInitialCards();
  })
  .then((cards) => {
    cards.forEach((cardData) => {
      const card = createCard(cardData, openImagePopup, currentUserId);
      cardsContainer.append(card);
    });
  })
  .catch((err) => console.error(`Ошибка: ${err}`));

// Open and Update Profile Popup
function openEditPopup() {
  clearValidation(editFormElement, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editButtonPopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  toggleButtonState(saveButton, true);

  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closePopup(editButtonPopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => toggleButtonState(saveButton, false));
}

editButton.addEventListener("click", openEditPopup);
editFormElement.addEventListener("submit", handleEditFormSubmit);

// Update Avatar
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = profileImageChange.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(saveButton, true);

  updateAvatar({ avatar: avatarInput.value })
    .then((user) => {
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
      closePopup(profileImageChange);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => toggleButtonState(saveButton, false));
}

profileImageChange.addEventListener("submit", handleAvatarFormSubmit);

// Add New Card
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = cardForm.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(saveButton, true);

  addCard({ name: placeNameInput.value, link: placeLinkInput.value })
    .then((newCardData) => {
      const newCard = createCard(newCardData, openImagePopup, currentUserId);
      cardsContainer.prepend(newCard);
      closePopup(addButtonPopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => toggleButtonState(saveButton, false));
}

cardForm.addEventListener("submit", handleNewCardFormSubmit);

// Open Image Popup
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popup);
}

function toggleButtonState(button, isLoading, initialText = "Сохранить") {
  button.textContent = isLoading ? "Сохранение..." : initialText;
}

function openNewCardPopup() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  clearValidation(newCardForm, validationConfig); // Очистка ошибок и деактивация кнопки
  openPopup(addButtonPopup);
}

function openAvatarPopup() {
  avatarInput.value = "";
  clearValidation(profileImageChange, validationConfig); // Очистка ошибок и деактивация кнопки
  openPopup(profileImageChange);
}

addButton.addEventListener("click", openNewCardPopup);
profileImage.addEventListener("click", openAvatarPopup);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target === popup ||
      event.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});
