import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Filter(props) {
  return (
    <div>
      <p>find countries <input value={props.filter} onChange={props.handleChange} /></p>
    </div>
  )
}

function Countries(props) {
  const countries = props.countries
  const filter = props.filter
  let filteredArray = props.countries
  if (filter.length === 0) {
    return null;
  }
  if (filter.length > 0) {
    filteredArray = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  }
  if (filter.length > 0 && filteredArray.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (filteredArray.length === 1) {
    const oneCountry = filteredArray[0];
    return <OneCountry country={oneCountry} />

  } else if (filter.length > 0 && filteredArray.length < 1) {
    return (<p>No matches found</p>)
  } else {
    return (
      filteredArray.map(country => <ListCountries key={country.name.common} country={country} />)
    )
  }
}

function OneCountry(props) {
  const country = props.country
  const languages = country.languages
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const endpoint = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital

  useEffect(() => {
    axios
      .get(endpoint)
      .then(res => {
        setWeather(res.data)
      })
  }, [api_key, country, endpoint])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flags.png} height="70" border="1" alt="flag" />
      <h2>Weather in {country.capital}</h2>
      {weather.current ? (
        <div>
          <p><b>temperature: {weather.current.temperature} Celcius</b></p>
          <img src={weather.current.weather_icons[0]} height="50" alt="weather-icon" />
          <p><b>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</b></p>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </div>)
}

function ListCountries(props) {
  const [showOneCountry, setShowOneCountry] = useState(false);

  const toggleOneCountryView = () => {
    setShowOneCountry(!showOneCountry);
  };

  return (
    <div>
      <p>{props.country.name} <button onClick={toggleOneCountryView}>show</button></p>
      {showOneCountry && <OneCountry country={props.country} />}
    </div>
  );
}

function App() {

  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={searchFilter} handleChange={handleFilterChange} />
      <Countries filter={searchFilter} countries={countries} />
    </div>
  )
}

export default App;
