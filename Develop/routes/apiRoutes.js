const router = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
let notes = require('../db/db.json')

//reads notes out of the json
router.get('/notes', (req, res) => {
    res.json(notes);
});

//makes a note, assings it a random unique id, pushes it to the db.json file 
router.post('/notes', (req, res) => {
    const makeNote = req.body;
    makeNote.id = uuidv4();
    notes.push(makeNote);
    writeToFile(notes);
    res.json(notes); 
});

//sets delition ID, filters the note out of the db, writes new notes to file
router.delete('/notes/:id', (req, res) => {
    const deletionID = req.params.id;
    var notesRemaining = notes.filter(note => note.id !== deletionID);
    writeToFile(notesRemaining);
    notes = notesRemaining;
    res.json(notes);
});

function writeToFile(data) {
    try{
        const fileWritten = fs.writeFileSync('../db/db.json', json.stringify(data));
        return fileWritten;
    }
    catch{
        return console.log('Failed to write file')
    }
};

module.exports = router;