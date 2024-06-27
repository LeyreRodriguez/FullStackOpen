import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson =  { name: newName, number : newNumber}
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName('') 
    setNewNumber('')
  }


  const filterName = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

        <Filter
          filter = {filter} 
          filterName={filterName} 
        />
      
      <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          handleName={handleName} 
          newNumber={newNumber} 
          handleNumber={handleNumber} 
        />
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App