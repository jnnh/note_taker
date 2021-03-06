const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

const { createNewNote, validateNote } = require('./Develop/lib/notes');
const notes = require('./Develop/db/db');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


//api routes
app.get('/api/notes', (req, res)=>{
    res.json(notes);
});

app.post('/api/notes', (req, res) =>{
    req.body.id = notes.length.toString();

    if(!validateNote(req.body)){
        res.status(400).send('The note is not properly formatted');
    }
    else{
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
})

//html routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

//end of routes
app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
});

