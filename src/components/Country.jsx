const Country = ({country}) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital: {country?.capital[0]}</p>
            <p>Area: {country?.area}</p>
            <h4>Languages:</h4>
            <ul>
                {Object.entries(country?.languages).map(([key, value]) => (
                    <li key={key}>
                        {value}
                    </li>
                ))}
            </ul>
            <img src={country?.flags?.png} alt={country?.flags?.alt}/>
        </>
    )
}

export default Country;