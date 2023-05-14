const express = require('express');
const connectDB = require('./db')
const Person = require('./person');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();



app.get('/persons', async (req, res) => {
    try {
        const persons = await Person.find();
        return res.json(persons);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/persons/:id', async (req, res) => {    //http://localhost:3000/products/1
    try {
        const person = await Person.findById(req.params.id);
        if (!person) throw new Error('Person not found');
        res.json(person);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



app.post('/persons', async (req, res) => {    //http://localhost:3000/products/1
    try {
        const { name, age, gender, email } = req.body;
        const person = new Person({ name, age, gender, email });

        // const person = new Person(req.query.name, parseInt(req.query.age), req.query.gender, req.query.email);
        await person.save();
        return res.json({ success: true });
        //const person = new Person(req.query.name, parseInt(req.query.age), req.query.email);
        //people.push(person);
        //res.json(people);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/persons/:id', async (req, res) => {    //http://localhost:3000/products/1
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) throw new Error('Person not found');
        return res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/persons/:id', async (req, res) => {    //http://localhost:3000/products/1
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) throw new Error('Person not found');
        return res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000");
})