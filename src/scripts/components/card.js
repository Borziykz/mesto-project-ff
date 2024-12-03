// Получаем элементы
const deletePopup = document.querySelector('.popup_type_delete');
const confirmDeleteButton = deletePopup.querySelector('.popup__button_type_confirm');
const cancelDeleteButton = deletePopup.querySelector('.popup__button_type_cancel');
const closeDeleteButton = deletePopup.querySelector('.popup__close');

// Хранение ID карточки, которую собираемся удалить
let cardToDelete = null;

// Открытие попапа с подтверждением удаления
const openDeletePopup = (card) => {
  cardToDelete = card;  // Сохраняем карточку, которую хотим удалить
  deletePopup.classList.add('popup_opened');
};

// Закрытие попапа
const closeDeletePopup = () => {
  deletePopup.classList.remove('popup_opened');
  cardToDelete = null; // Сбросим сохранённую карточку
};

// Обработчик клика на кнопку "Удалить"
const handleDeleteButtonClick = (event) => {
  const card = event.target.closest('.card'); // Ищем карточку, к которой принадлежит кнопка
  const cardOwnerId = card.querySelector('.card__owner').textContent; // Получаем ID владельца карточки
  
  // Проверяем, если эта карточка принадлежит текущему пользователю
  if (cardOwnerId === currentUserId) {
    openDeletePopup(card); // Если наша карточка, открываем попап
  }
};

// Обработчик подтверждения удаления
confirmDeleteButton.addEventListener('click', () => {
  // Вызываем API для удаления карточки
  deleteCardApi(cardToDelete.id)
    .then(() => {
      // Убираем карточку из DOM
      cardToDelete.remove();
      closeDeletePopup(); // Закрываем попап
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
});

// Обработчик кнопки отмены удаления
cancelDeleteButton.addEventListener('click', closeDeletePopup);

// Обработчик кнопки закрытия попапа
closeDeleteButton.addEventListener('click', closeDeletePopup);

// Обработчик события для кнопки удаления на карточке
const deleteButtons = document.querySelectorAll('.card__delete-button');
deleteButtons.forEach((button) => {
  button.addEventListener('click', handleDeleteButtonClick);
});
