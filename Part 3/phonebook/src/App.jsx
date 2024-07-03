import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService  from './services/calls'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })



  useEffect(() => {
    personService 
      .read()
      .then(initialPersons => {
        setPersons(initialPersons)
        
      })
      .catch(error => {
        console.error('Failed to fetch persons:', error)
        setNotification({ message: 'Failed to fetch persons', type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
  }, [])



  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setNotification({ message: `Updated ${newName}`, type: 'success' })
            setTimeout(() => {
              setNotification({ message: null, type: '' })
            }, 5000)
          })
          .catch(error => {
            const errorMessage = error.response?.data?.error || `Information of ${newName} has already been removed from server`;
            setNotification({ message: errorMessage, type: 'error' });
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 5000);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification({ message: `Added ${newName}`, type: 'success' })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => {
          const errorMessage = error.response?.data?.error || 'Failed to create new person';
          console.error(errorMessage);
          setNotification({ message: errorMessage, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        });
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


  const handleDelete = id =>{
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Failed to delete person:', error)
        })
    }
  }
  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
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
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App