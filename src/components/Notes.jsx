import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes } = context;
    return (
        <div>
            <h2 className='mt-3 mb-4'>Yours Notes</h2>
            <div style={{ display: 'flex', gap:'40px', justifyContent:'center', flexWrap:'wrap' }}>
                {
                    notes.map((note) => (
                        <div key={note._id}>
                            <NoteItem note={note} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notes
