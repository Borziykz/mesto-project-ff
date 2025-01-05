// Включение валидации для всех форм
export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault()); // Отключаем стандартное поведение
    setEventListeners(form, config); // Устанавливаем слушатели
  });
};

// Установка слушателей на элементы формы
// Проверка валидности отдельного поля
const isInputValid = (input, config) => {
  const value = input.value.trim(); // Убираем лишние пробелы

  // Проверка длины для текстовых полей
  if (input.type === "text" && value.length < 2) {
    input.setCustomValidity("Поле должно содержать минимум 2 символа.");
    return false;
  }

  // Проверка на кастомный паттерн для текстовых полей
  if (input.type === "text" && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
    input.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
    return false;
  }

  // Сбрасываем кастомное сообщение, если все проверки прошли
  input.setCustomValidity("");
  return input.validity.valid; // Проверяем встроенную валидацию
};

// Переключение состояния кнопки
const toggleButtonState = (inputs, button, config) => {
  const hasInvalidInput = inputs.some(
    (input) => !isInputValid(input, config) || !input.validity.valid
  );

  if (hasInvalidInput) {
    button.disabled = true; // Устанавливаем disabled
    button.classList.add(config.inactiveButtonClass); // Добавляем класс неактивной кнопки
  } else {
    button.disabled = false; // Убираем disabled
    button.classList.remove(config.inactiveButtonClass); // Убираем класс неактивной кнопки
  }
};

// Обработка событий ввода
const handleInput = (form, input, config) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!isInputValid(input, config)) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
  } else {
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  }
};

// Добавление слушателей для формы
const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  // Переключаем состояние кнопки при загрузке
  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      handleInput(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
};

// Проверка валидности одного поля
const checkInputValidity = (input, config) => {
  const errorElement = input
    .closest("form")
    .querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    const errorMessage =
      getCustomErrorMessage(input) || input.validationMessage;
    showInputError(input, errorElement, config, errorMessage);
  } else {
    hideInputError(input, errorElement, config);
  }
};

// Получение кастомного сообщения об ошибке
const getCustomErrorMessage = (input) => {
  if (
    input.dataset.validationMessage &&
    !/^[a-zA-Zа-яА-ЯёЁ\- ]+$/.test(input.value)
  ) {
    return input.dataset.validationMessage;
  }
  return null;
};

// Отображение ошибки
const showInputError = (input, errorElement, config, errorMessage) => {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Скрытие ошибки
const hideInputError = (input, errorElement, config) => {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

// Переключение состояния кнопки

// Очистка ошибок валидации
export const clearValidation = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, submitButton, config); // Деактивируем кнопку
};
