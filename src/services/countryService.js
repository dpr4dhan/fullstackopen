import axios from "axios";

const weather_api_key = import.meta.env.VITE_WEATHER_KEY
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherBaseUrl='https://api.openweathermap.org/data/2.5/weather?appid='+weather_api_key+'&units=metric'

const getCountries = () => {
    return axios.get(`${countryBaseUrl}`)
        .then(response => response.data)
}

const getWeather = (capital) => {
    return axios.get(`${weatherBaseUrl}&q=${capital}`)
        .then(response => response.data)
}

export default {getCountries, getWeather}