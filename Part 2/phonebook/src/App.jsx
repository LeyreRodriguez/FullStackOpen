import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')



  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    console.log(newName)
    console.log(persons)
    const newPerson =  { name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('') 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
            name: <input value = {newName} 
            onChange = {handleName} />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, name) => (
          <li key={name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App