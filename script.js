//Слушатель события клик на кнопке
submit.addEventListener("click", () => {
  render();
});
//Для валидации на keyup
// document.querySelectorAll("input").forEach((item) => {
//   item.addEventListener("keyup", (event) => {
//     render();
//   });
// });

let render = () => {
  //Удаляем все ошибки
  let errorCollection = document.querySelectorAll(".error");
  errorCollection.forEach((error) => {
    error.remove();
  });

  //Коллекция инпутов
  let inputCollection = document.getElementsByTagName("input");

  //Тип инпута
  let type;

  //Получаем массив паролей для сравнения
  let passwords = [
    document.querySelector("#password"),
    document.querySelector("#confirmpassword"),
  ];

  //Проходим циклом по коллекции инпутов получаем тип инпута и запускаем функцию валидации передав в нее нужные параметры
  for (const key in inputCollection) {
    if (Object.hasOwnProperty.call(inputCollection, key)) {
      type = inputCollection[key].getAttribute("type");
      validate(type, inputCollection[key], passwords);
    }
  }
};

//Функция валидации
let validate = (type, input, passwords) => {
  //Перемемнная для регулярных выражений
  let symbols;
  // Перемменная для сообщений ошибок
  let errorMassage;

  //Определение типа валидации для полей инпутов
  if (type === "text") {
    symbols = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    if (!input.value.match(symbols)) {
      errorMassage = "Это поле не может содержать числа";
    }
    if (input.value.length > 20) {
      errorMassage = "Это поле не может содержать больше 20 символов";
    }
    if (input.value.length == "") {
      errorMassage = "Это поле не может быть пустым";
    }
  }

  if (type === "email") {
    symbols =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!input.value.match(symbols)) {
      errorMassage = "Это поле может содержать валидный Email";
    }
    if (input.value.length == "") {
      errorMassage = "Это поле не может быть пустым";
    }
  }

  if (type === "password") {
    symbols =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    if (input.value.length < 7) {
      errorMassage = "Это поле не может быть меньше 8 символов";
    }
    if (!input.value.match(symbols)) {
      errorMassage =
        "Пароль должен содержать цифры, заглавные и строчные буквы, спецсимволы и быть длиннее 8 символов";
    }
    if (input.value.length == 0) {
      errorMassage = "Это поле не может быть пустым";
    }
    //Сравниваем полученные пароли
    if (passwords[0].value !== passwords[1].value) {
      errorMassage = "Пароли не совпадают";
    }
  }

  if (type === "date") {
    let checkBirthDay;

    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDay = date.getDate();

    let userDataBirthDay = input.value;
    let splitData = userDataBirthDay.split("-");

    let userAge = currentYear - splitData[0];

    //Проверка года
    if (userAge > 18) {
      console.log("Больше 18");
    }
    if (userAge < 18) {
      console.log("Меньше 18");
      checkBirthDay = true;
    }

    //Проверка месяца и дня
    if (userAge === 18 && currentMonth + 1 > splitData[1]) {
      console.log("Больше 18");
    }

    if (userAge === 18 && currentMonth + 1 == splitData[1]) {
      if (currentDay >= splitData[2]) {
        console.log("Больше 18");
      } else {
        console.log("Меньше 18");
        checkBirthDay = true;
      }
    }

    if (userAge === 18 && currentMonth + 1 < splitData[1]) {
      console.log("Меньше 18");
      checkBirthDay = true;
    }
    // Для валидации если type не date

    //  symbols = /[0-9]/;
    //  if (!input.value.match(symbols)) {
    //     errorMassage =
    //       "Это поле должно содержать только цифры";
    //   }
    if (checkBirthDay) {
      errorMassage = "Регистрация доступна после 18 лет";
    }
    if (input.value.length == 0) {
      errorMassage = "Это поле не может быть пустым";
    }
  }

  //Выводим сообщение об ошибке если такие имеются
  if (errorMassage) {
    input.insertAdjacentHTML(
      "afterend",
      '<label for="' + input.id + '" class="error">' + errorMassage + "</label>"
    );
  }
  return true;
};
