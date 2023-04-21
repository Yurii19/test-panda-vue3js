import { APP_ID } from "@/variables";

// export const getHourlyWeather = (cityName, start, end) => {
//   return fetch(
//     `https://history.openweathermap.org/data/2.5/history/city?q=${cityName}&type=hour&start=${start}&end=${end}&appid=${APP_ID}`
//   );
// };

export const getWeatherAtCity = (url) => {
  return fetch(url);
};

// export const getStatistic = (url) => {
//   return fetch(
//     `https://history.openweathermap.org/data/2.5/aggregated/day?q=London,GB&month=2&day=1&appid=${APP_ID}`
//   );
// };
// export const getHistory = (url) => {
//   return fetch(
//     `https://history.openweathermap.org/data/3.0/history/timemachine?lat=51.51&lon=-0.13&dt=606348800&appid=${APP_ID}`
//   );
// };
export const getWeatherData = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${APP_ID}`
  );
};
