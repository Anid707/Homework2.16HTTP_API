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

// 4.1* (для самостоятельного выполнения - по желанию)
// Добавить в виджет определение местоположения пользователя и показ погоды по выявленным координатам.
// В документации смотрим раздел *By geographic coordinates*.
// Пример работы с геолокацией браузера (объект navigator) посмотрите ЗДЕСЬ.
// ВАЖНО. JS является однопоточным языком, в котором все действия выполняются последовательно. http-запрос выполнится быстрее, чем определение геолокации, из-за чего не будет работать (в url координаты поступят как undefined).
// Нужно оформить запрос за прогнозом как функцию, которая будет вызываться после получения геопозиции.

const current = document.getElementById("current"),
forecast = document.getElementById("forecast");

let xmlHttp = new XMLHttpRequest();
xmlHttp.onload = function(){

    let weatherObjArr = JSON.parse(xmlHttp.responseText);
    addEl("div", weatherObjArr.city.name, "", current);
    addEl("div", new Date().toLocaleDateString() + "\n" + new Date().toLocaleTimeString().slice(0,-3), "forecast-date", current);
////
    let currentWeatherBlock = addEl("div", "", "current-weather", current);
    let currentImg = document.createElement("img");
    currentImg.src = `https://openweathermap.org/img/wn/${weatherObjArr.list[0].weather[0].icon}@2x.png`;
    currentWeatherBlock.appendChild(currentImg);
    addEl("div", weatherObjArr.list[0].weather[0].main, "", currentWeatherBlock);
    addEl("div", weatherObjArr.list[0].main.temp + " \u2103", "", currentWeatherBlock);
/////
    let currentWindBlock = addEl("div", "", "current-wind", current);
    addEl("div", "Speed", "", currentWindBlock);
    addEl("div", weatherObjArr.list[0].wind.speed + " m/s", "", currentWindBlock);

    for (let i = 8; i < weatherObjArr.list.length; i+=8){
        let forecastBlock = addEl("div", "", "forecast-block", forecast);
        addEl("div", weatherObjArr.list[i].dt_txt, "forecast-date", forecastBlock);
        let forecastImg = document.createElement("img");
        forecastImg.src = `https://openweathermap.org/img/wn/${weatherObjArr.list[i].weather[0].icon}@2x.png`;
        forecastBlock.appendChild(forecastImg);
        addEl("div", weatherObjArr.list[i].main.temp + " \u2103", "", forecastBlock);
    }
};

const addEl = (tag, content, className, block) => {
    let tagEl = document.createElement(tag);
    tagEl.innerText = content;
    tagEl.className = className;
    block.appendChild(tagEl);
    return tagEl;
};

const getApi = (url) => {
    xmlHttp.open("GET", url);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.send();
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
function getGeoSuccess(position) {
    const crd = position.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`;
    console.log(url);
    getApi(url);
}
  
function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(getGeoSuccess, error, options);