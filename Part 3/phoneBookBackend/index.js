const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())


app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
    const currentTime = new Date().toLocaleString();  
    const numberOfEntries = persons.length;  
    
    
    response.send(`
        <div>
            <p>Phonebook has info for ${numberOfEntries} people.</p>
            <p>${currentTime}</p>
        </div>
    `);
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      console.log('x')
      response.status(404).end()
    }
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      } else if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
          })
      }

      const nameExists = persons.some(entry => entry.name === body.name);
    if (nameExists) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        });
    }

    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})