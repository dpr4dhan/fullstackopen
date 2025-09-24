const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status - :response-time ms :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body ?? {})
    console.log('---')
    next()
}
app.use(requestLogger)



let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!!!</h1>')
})

app.get('/api/notes', (request, response) => {
   response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find((note) => note.id === id);
    if(note){
        response.json(note);
    }
    response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/info', (req, res) => {
    const date = new Date();
    const fullDate = date.toDateString() + ' '+date.toTimeString()
    res.send(`<h1>Phonebook has info of ${persons.length} info</h1><h4>${fullDate}</h4>`);
})
app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((person) => person.id === id)
    if(person){
        res.json(person)
    }
    res.status(404).send('No data found!');
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((person) => person.id === id)
    if(person){
        // const filteredPerson = persons.filter((person) => person.id !== id);
        res.status(204).end()
    }
    res.status(404).send('No data found!');
})

const generatePersonId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const filteredPersons = persons.filter((person) => person.name === body.name );
    if(filteredPersons.length > 0 ){
        return res.status(400).json({error: "Name must be unique !"})
    }

    const newPerson = {
        "name" : body.name,
        "number": body.number,
        "id" : generatePersonId()
    }
    res.status(201).json(persons.concat(newPerson))

})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

