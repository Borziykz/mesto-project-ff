import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getCardsApi, deleteCardApi, likeCardApi } from "./components/api.js";

// Константы
const cardContainer = document.querySelector(".cards__container");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector("#profile-form");
const profileNameInput = profileForm.querySelector("#profile-name");
const profileJobInput = profileForm.querySelector("#profile-job");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector("#card-title");
const cardLinkInput = addCardForm.querySelector("#card-link");
const addCardButton = document.querySelector(".profile__add-button");
const userId = "YOUR_USER_ID"; // Замените на текущий user ID, полученный с сервера.

// Открытие модалки редактирования профиля
profileEditButton.addEventListener("click", () => {
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__job");

  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  clearValidation(profileForm, validationConfig);
  openPopup(document.querySelector("#edit-profile-popup"));
});

// Сабмит формы редактирования профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Здесь вы можете вызвать API для обновления данных профиля
  document.querySelector(".profile__name").textContent = profileNameInput.value;
  document.querySelector(".profile__job").textContent = profileJobInput.value;

  closePopup(document.querySelector("#edit-profile-popup"));
});

// Открытие модалки добавления карточки
addCardButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  openPopup(document.querySelector("#add-card-popup"));
});

// Сабмит формы добавления карточки
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    owner: { _id: userId },
    likes: [],
  };

  cardContainer.prepend(createCard(newCard, handleImageClick, userId, deleteCardApi, likeCardApi));
  closePopup(document.querySelector("#add-card-popup"));
  addCardForm.reset();
});

// Обработчик клика по изображению
function handleImageClick(cardData) {
  const imagePopup = document.querySelector("#image-popup");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

// Получение начальных карточек с API
getCardsApi()
  .then((cards) => {
    cards.forEach((card) => {
      cardContainer.append(createCard(card, handleImageClick, userId, deleteCardApi, likeCardApi));
    });
  })
  .catch((err) => console.error(`Ошибка загрузки карточек: ${err}`));

// Включение валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);
