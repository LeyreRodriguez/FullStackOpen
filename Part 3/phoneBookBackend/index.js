require('dotenv').config()

const express = require('express')
const morgan = require('morgan');
require('mongoose');

const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



app.get('/api/persons', (request, response, next) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})


app.get('/info', (request, response, next) => {
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
    .catch(error => next(error))
});
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON());
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error));
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
  app.post('/api/persons', (request, response, next) => {
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
          .catch(error => next(error));
      })
      .catch(error => next(error));
  });
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
      number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        if (updatedPerson) {
          response.json(updatedPerson);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error));
  });
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }

    next(error);
  };


  app.use(errorHandler);

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })