import {useEffect, useState} from "react";
import countryService from "./services/countryService.js";
import Notification from "./components/Notification.jsx";
import Weather from "./components/Weather.jsx";
import Country from "./components/Country.jsx";

const App = () => {
    const [filterCountry, setFilterCountry] = useState('')
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryWeather, setCountryWeather] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if(filterCountry){
            countryService.getCountries(filterCountry)
                .then(countries => {
                    const filteredCountry = countries.filter((country) => {
                       return country.name.common.toLowerCase().startsWith(filterCountry.toLowerCase());
                    });
                    if(filteredCountry.length > 10){
                        setErrorMessage('Too many matches, be more specific');
                        setCountries(null);
                        setCountry(null)
                    }
                    else if(filteredCountry.length === 1){
                        setCountry(filteredCountry[0]);
                        setErrorMessage(null);
                        setCountries(null);
                        setCountryWeather(null);
                    }
                    else{
                        setErrorMessage(null);
                        setCountries(filteredCountry);
                        setCountry(null)
                        setCountryWeather(null)
                    }
                });
        }

    }, [filterCountry]);

    useEffect(() => {
        if(country){
            countryService.getWeather(country.capital[0])
                .then(weather => {
                    console.log('weather',weather);
                    setCountryWeather(weather);
                })
                .catch(err => <Notification message={err} type="error" /> )
        }else{
            setCountryWeather(null);
        }
    }, [country]);

    const handleShow = (country) => {
        setCountry(country);
        setCountries(null);
        setErrorMessage(null);
    }

    return (
        <div>
            <label htmlFor="filterCountry">Find countries</label>
            <input type="text" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}/>
            {errorMessage && <Notification message={errorMessage} type="error"/>}
            {country && (
                <div>
                    <Country country={country} />
                    {countryWeather && <Weather weather={countryWeather} /> }
                </div>
            )}
            {countries && countries.map((country) => <li key={country.area}>{country.name.common}<button onClick={() => handleShow(country)}>Show</button></li>)}
        </div>
    )
}

export default App;