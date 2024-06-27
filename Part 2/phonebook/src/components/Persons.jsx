const Persons = ({personsToShow }) => {
    return (
        <ul>
        {personsToShow.map((person, name) => (
          <li key={name}>{person.name} {person.number}</li>
        ))}
      </ul>
    )
  }
  
  export default Persons