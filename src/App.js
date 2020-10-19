import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes';
import './App.css';


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initNotes => setNotes(initNotes))
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => 
          note.id !== id 
          ? note 
          : returnedNote 
        ))
      })
  }


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('');
      })

  }


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div className='App'>
      <h1>Notes</h1>
      <form className="noteForm" onSubmit={addNote}>
        <input 
          className="inputBox"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button className="inputButton" type="submit">save</button>
      </form>   
      <div>
        <button className="importantToggle" onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul className="notes">
        {notes.map((note, i) => 
          <Note 
            key={i} 
            className='note'
            note={note}
            toggleImportanceOf={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      
    </div>
  )
}

export default App;
