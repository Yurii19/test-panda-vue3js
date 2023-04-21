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
  const favorits = window.localStorage.favorits;
  // console.log('favorits', favorits)
  if (favorits === undefined) {
    // console.log("There are no favorits yet !");
    window.localStorage.setItem("favorits", JSON.stringify([card]));
    return;
  } else {
    const data = JSON.parse(window.localStorage.getItem("favorits"));
    if (data.length === 5) {
      alert("No more favorite avalable");
      return;
    } else {
     const newData = [...data, card];
      window.localStorage.setItem("favorits", JSON.stringify(newData));
    }
    //  console.log("window.localStorage ", data);
  }
  // console.log(window.localStorage);
};

export const checkIfFavorite = (id) => {
  const favorits = JSON.parse(window.localStorage.getItem("favorits"));
  console.log("Favorits before checking: ", favorits, 'ID : ',id);
  if (!favorits) {
    console.log("favorits is undefined");
    return false;
  }
//  const data = 
 // console.log(data);
  const match = favorits.find((el) => el.id === id);
  console.log("checkIfFavorite", match);
  if (match) {
    return true;
  } else {
    return false;
  }
};
