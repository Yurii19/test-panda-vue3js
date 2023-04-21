import { APP_ID } from "@/variables";

export const getWeatherAtCity = (url) => {
  return fetch(url);
};

export const getWeatherData = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${APP_ID}`
  );
};

export const addToFavorits = (card) => {
  if (!window.localStorage.favorits) {
    console.log("There are no favorits yet !");
    window.localStorage.setItem("favorits", JSON.stringify([card]));
  } else {
    let data = JSON.parse(window.localStorage.getItem("favorits"));
    if (data.length === 5) {
      alert("No more favorite avalable");
      return;
    } else {
      data = [...data, card];
      window.localStorage.setItem("favorits", JSON.stringify([card]));
    }
    console.log("window.localStorage ", data);
  }
  // console.log(window.localStorage);
};

export const checkIfFavorite = (id) => {
  if (!window.localStorage.favorits) {
    return false;
  }
  const data = JSON.parse(window.localStorage.getItem("favorits"));
  const match = data.includes((el) => el.id === id);
  console.log('checkIfFavorite', match)
  if (match) {
    return true;
  } else {
    return false;
  }
};
