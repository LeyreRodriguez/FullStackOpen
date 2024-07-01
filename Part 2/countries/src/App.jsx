import { useState, useEffect  } from 'react'

import countriesService from './services/API'


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  

  useEffect(() => {
    countriesService 
      .read()
      .then(initialCountries => {
        setCountries(initialCountries)
        
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      })
  }, [])


  const filterCountries = (event) => {
    setFilter(event.target.value);
  }


  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries;

  return (
    <div>
        <div>
              find countries <input value = {filter} 
              onChange = {filterCountries} />     


          {countriesToShow.length === 1 ? (
            <div>
              <h1>{countriesToShow[0].name.common}</h1>
              <div>Capital: {countriesToShow[0].capital}</div>
              <div>Area: {countriesToShow[0].area} km²</div>
              <h3>Languages:</h3>
              <ul>
                {Object.values(countriesToShow[0].languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
              <img src={countriesToShow[0].flags.png} alt={`Flag of ${countriesToShow[0].name.common}`} width="100" />
            </div>
            ) : countriesToShow.length > 10 ? (
              <p>Too many matches, please specify your search further.</p>
            ) : (
              <ul>
                {countriesToShow.map((country, index) => (
                  <li key={index}>{country.name.common}</li>
                ))}
              </ul>
            )}
              

            
          </div>
  
      </div>  
      
  )
}

export default App
