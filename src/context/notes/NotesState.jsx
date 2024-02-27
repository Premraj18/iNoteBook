import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:4000'

    const initialNote = [];
    const [notes, setNotes] = useState(initialNote);


    // Get all Notes
    const fetchAllNote = async () => {
        // console.log('Adding a new note')
        const res = await fetch(`${host}/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
            },
        });

        const notes = await res.json();

        setNotes(notes)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // console.log('Adding a new note')


        if (title === "" || description === "") {
            alert("Please fill all the credentials")
        }
        else {

            try {

                const res = await fetch(`${host}/api/note/addnote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
                    },
                    body: JSON.stringify({ title, description, tag })
                });

                const note = await res.json();
                setNotes(notes.concat(note))

            } catch (error) {
                alert({ error: error.message })
            }
        }
    }

    //Delete a note
    const deleteNote = async (id) => {
        const res = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
            },
        });

        const json = await res.json();
        // console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {

        const res = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNjY0NTY5ZmEyYTVkNzk1YWY4MjI5In0sImlhdCI6MTcwODU0OTIwNn0.jfxNzX2EEyIQ0LFZ2GQLvijIWp-QOdNmr_Jtn0I0kYs'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await res.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // console.log(newNotes)

        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            // console.log(element)
            if (element._id === id) {
                element.title = title,
                element.description = description,
                element.tag = tag;
                break;
            }
        }

        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;