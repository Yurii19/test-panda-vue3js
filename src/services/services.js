import { APP_ID } from "@/variables";

export const getLocations = ()=>{
  const options = {

  }
  return fetch(`https://bulk.openweathermap.org/sample/city.list.json.gz?appid=${APP_ID}`)
}

export const getWeatherAtCity = (url) => {
  return fetch(url);
};
