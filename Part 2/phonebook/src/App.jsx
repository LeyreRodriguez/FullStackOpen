import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')



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