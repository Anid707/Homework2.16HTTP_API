// Задание 1
// По данному url расположена задача:
// https://jsonplaceholder.typicode.com/todos/1
// В html предусмотреть div.
// Достать с сервера заголовок задачи и отобразить его в div.
// const div = document.querySelector(".block");

let xmlHttp = new XMLHttpRequest();
xmlHttp.onload = function(){
    console.log(xmlHttp.responseText);
    let taskObj = JSON.parse(xmlHttp.responseText);
    div.innerText = taskObj.title;
};
xmlHttp.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
xmlHttp.setRequestHeader("Accept", "application/json");
xmlHttp.send();


// Задание 2
// Запросом на сервер по url https://jsonplaceholder.typicode.com/todos достать задачи.
// Отобразить первые 20 задач списком ul на странице. Содержимое каждого li - поле title объекта задачи.

const list = document.querySelector(".list");
let xmlHttp = new XMLHttpRequest();
xmlHttp.onload = function(){
    console.log(xmlHttp.responseText);
    let taskObjArr = JSON.parse(xmlHttp.responseText);
    for (let i = 0; i < 20; i++){
        let li = document.createElement("li");
        li.innerText = taskObjArr[i].title;
        list.appendChild(li);
    }
};
xmlHttp.open("GET", "https://jsonplaceholder.typicode.com/todos");
xmlHttp.setRequestHeader("Accept", "application/json");
xmlHttp.send();


// Задание 3
// Отобразить на странице 10 первых комментариев с сервера *https://jsonplaceholder.typicode.com/comments*
// Оформить тегами как в ПРИМЕРЕ.
// Порядок работы:
// 1) записать в переменную блок для отрисовки результата.
// 2) описать функцию отрисовки результата (напр. addInfo). Функция принимает 3 параметра - тег, содержимое и название класса для CSS. Она создает тег, наполняет его текстом, добавляет класс и помещает в блок на страницу.
// 3) создать http-запрос и получить результат в виде массива объектов (через JSON.parse). Записать этот результат в переменную, т.к. с ним будем дальше работать.
// 4) внутри функции .onload:
// - обойти через цикл первые 10 элементов массива
// - вызвать функцию addInfo 3 раза: для добавления на страницу имени, имейла и комментария.
// 5) прописать CSS для классов.

const resultBlock = document.querySelector(".result");
let xmlHttp = new XMLHttpRequest();
xmlHttp.onload = function(){
    // console.log(xmlHttp.responseText);
    let taskObjArr = JSON.parse(xmlHttp.responseText);
    for (let i = 0; i < 10; i++){
        addInfo("h3", taskObjArr[i].name, "name");
        addInfo("p", taskObjArr[i].email, "email");
        addInfo("p", taskObjArr[i].body, "body");
    }
};
xmlHttp.open("GET", "https://jsonplaceholder.typicode.com/comments");
xmlHttp.setRequestHeader("Accept", "application/json");
xmlHttp.send();

const addInfo = (tag, content, className) => {
    let tagEl = document.createElement(tag);
    tagEl.innerText = content;
    tagEl.className = className;
    resultBlock.appendChild(tagEl);
};


// Задание 4
// Создать собственный погодный виджет на основе данных с сервера погоды.
// Оформить, как в примере: ЗДЕСЬ.
// Документация: https://openweathermap.org/api...
// *Порядок работы:*
// 1) Проверить, работает ли API-ключ, данный в примере. Для этого открыть url https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247
// Если данные отображаются - можно не получать свой ключ, иначе см. п. 1.1.
// 1.1. Зарегистрироваться и получить собственный API-ключ на сайте https://home.openweathermap.or...
// 2) Создать html-css разметку под данные.
// - общий блок для виджета, внутри него два блока - для текущей погоды и для прогноза (пример см. ЗДЕСЬ)
// - внутри нижней части виджета через js будут добавляться строки по дням - это дивы, им нужно сразу прописать стили (flex-распределение вставляемых элементов, нижняя граница).
// 3) Написать JS с HTTP-запросом на url.
// - кастомизировать url запроса: указать нужный город, добавить в url параметр отображения градусов по Цельсию (см. на странице документации раздел *Units of measurement*)
// 4) добавить информацию из ответа в виджет на страницу.
// - в верхней части виджета отобразить город и дату (из полученного JSON-объекта).
// Возможно, текущую дату проще получить из встроенной функции Date, примеры работы с ней ЗДЕСЬ.
// - из JSON-объекта "достать" текущую погоду (.list[0]) - первый объект внутри массива.
// Как узнать url иконки: https://openweathermap.org/wea...
// - в нижней части добавить необходимую информацию через цикл. Вам понадобится каждый 8-й объект, т.к в ответе приходит погода на каждые 3 часа (8 раз в сутки), а нам нужна погода 1 раз в сутки.

//"./weather/weather.js"

// 4.1* (для самостоятельного выполнения - по желанию)
// Добавить в виджет определение местоположения пользователя и показ погоды по выявленным координатам.
// В документации смотрим раздел *By geographic coordinates*.
// Пример работы с геолокацией браузера (объект navigator) посмотрите ЗДЕСЬ.
// ВАЖНО. JS является однопоточным языком, в котором все действия выполняются последовательно. http-запрос выполнится быстрее, чем определение геолокации, из-за чего не будет работать (в url координаты поступят как undefined).
// Нужно оформить запрос за прогнозом как функцию, которая будет вызываться после получения геопозиции.