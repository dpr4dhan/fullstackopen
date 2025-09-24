const Weather = ({weather}) => {
    return (
        <>
            <h4>Weather in {weather?.name}</h4>
            <p>Temperature: {weather?.main?.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}/>
            <p>Wind: {weather?.wind?.speed} m/s</p>
        </>
    )
}

export default Weather;