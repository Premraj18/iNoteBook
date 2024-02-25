import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:4000'

    const notesInitial = [
        {
            "_id": "65d6725327a66f110c2e73c4",
            "user": "65d664569fa2a5d795af8229",
            "title": "My title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        },
        {
            "_id": "65d6725327a66f110c2e73c5",
            "user": "65d664569fa2a5d795af8229",
            "title": "My title 2",
            "description": "Exercise for 30 min",
            "tag": "personal 2",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        },
        {
            "_id": "65d6725327a66f110c2e73c6",
            "user": "65d664569fa2a5d795af8230",
            "title": "My title 2",
            "description": "Exercise for 30 min",
            "tag": "personal 2",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        },
        {
            "_id": "65d6725327a66f110c2e73c7",
            "user": "65d664569fa2a5d795af8229",
            "title": "My title 2",
            "description": "Exercise for 30 min",
            "tag": "personal 2",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        },
        {
            "_id": "65d6725327a66f110c2e73c8",
            "user": "65d664569fa2a5d795af8229",
            "title": "My title 2",
            "description": "Exercise for 30 min",
            "tag": "personal 2",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    // Add a note
    const addNote = async (title, description, tag) => {
        // console.log('Adding a new note')

        const res = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = res.json();

        const note = {
            "_id": "65d6725327a66f110c2e73c9",
            "user": "65d664569fa2a5d795af8229",
            "title": title,
            "description": description,
            "tag": "personal",
            "date": "2024-02-21T21:59:47.737Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = (id) => {
        console.log('Delete note with id: ', id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {

        const res = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
            },
            body: JSON.stringify(data)
        });

        const json = res.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title,
                element.description = description,
                element.tag = tag
            }
            
        }
    }
        
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;