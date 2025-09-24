import axios from "axios";

// const weather_api_key = import.meta.env.VITE_WEATHER_KEY
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherBaseUrl='https://api.openweathermap.org/data/2.5/weather?appid=b3cb56177199b7d1ff6f77e3664df5e8&units=metric'

const getCountries = () => {
    return axios.get(`${countryBaseUrl}`)
        .then(response => response.data)
}

const getWeather = (capital) => {
    return axios.get(`${weatherBaseUrl}&q=${capital}`)
        .then(response => response.data)
}

export default {getCountries, getWeather}