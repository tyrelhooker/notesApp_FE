import React from 'react'

const Note = ({ note, toggleImportanceOf }) => {

  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      {note.content}
      <button className="noteButton" onClick={toggleImportanceOf}>
        {label}
      </button>
    </li>
  )
}

export default Note;