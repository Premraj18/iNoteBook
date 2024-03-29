const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/FetchUser')

//ROUTE 1: Get All Notes using: GET "/api/note/fetchallnotes" :login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Add a new Note using: POST "/api/note/addnote" :login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    //If there ar errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Add note
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE 3: Update an existing Note using: put "/api/note/updatenote" :login required
router.put('/updatenote/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    //If there ar errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
        //create a new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 4: Delete an existing Note using: put "/api/note/deletenote" :login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    //Find the note to be deleted and delete it
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router