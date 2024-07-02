require('dotenv').config()

const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express()
const cors = require('cors')

const Person = require('./models/person')
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
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const currentTime = new Date().toLocaleString();
      response.send(`
        <div>
          <p>Phonebook has info for ${count} people.</p>
          <p>${currentTime}</p>
        </div>
      `);
    })
    .catch(error => {
      console.error('Error fetching person count:', error);
      response.status(500).json({ error: 'Something went wrong' });
    });
});


  
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  


  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })





  app.post('/api/persons', (request, response) => {
    const body = request.body;
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' });
    }
  
    Person.findOne({ name: body.name })
      .then(existingPerson => {
        if (existingPerson) {
          return response.status(400).json({ error: 'name must be unique' });
        }
  
        const person = new Person({
          name: body.name,
          number: body.number
        });
  
        person.save()
          .then(savedPerson => {
            response.json(savedPerson);
          })
          .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'something went wrong' });
          });
      })
      .catch(error => {
        console.error(error);
        response.status(500).json({ error: 'something went wrong' });
      });
  });


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })