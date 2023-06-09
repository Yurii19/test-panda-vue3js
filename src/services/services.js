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
  if (favorits === undefined) {
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
  }
};

export const checkIfFavorite = (id) => {
  const favorits = JSON.parse(window.localStorage.getItem("favorits"));
  if (!favorits) {
    return false;
  }
  const match = favorits.find((el) => el.id === id);
  if (match) {
    return true;
  } else {
    return false;
  }
};

export const removeFromFavorites = (id) => {
  const data = JSON.parse(window.localStorage.getItem("favorits"));
  const newData = data.filter((el) => el.id !== id);
  window.localStorage.setItem("favorits", JSON.stringify(newData));
};

export const createCard = (cityData) => {
  return {
    id: cityData.id,
    isFavorite: checkIfFavorite(cityData.id),
    city_name: cityData.name,
    feels_like: cityData.main.feels_like,
    humidity: cityData.main.humidity,
    pressure: cityData.main.pressure,
    temp: cityData.main.temp,
    temp_max: cityData.main.temp_max,
    temp_min: cityData.main.temp_min,
    lat: cityData.coord.lat,
    lon: cityData.coord.lon,
  };
};

export const createChartData = (params) => {
  return getWeatherData(params.lat, params.lon)
    .then((response) => response.json())
    .then((data) => {
      const src = data.hourly.slice(0, 25);
      const labels = src.map((el) => new Date(el.dt * 1000).getHours() + "h");
      const tempearatures = src.map((el) => Math.round(el.temp));
      const newData = {
        labels: [],
        datasets: [
          {
            label: "City name ",
            backgroundColor: "#32ff7e",
            borderColor: "blue",
            data: [],
          },
        ],
      };
      newData.labels = labels;
      newData.datasets[0].data = tempearatures;
      newData.datasets[0].label = params.cityName;
      return newData
    })
    .then((newData) => newData);
};
