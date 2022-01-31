import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  
  const [notes, setNotes] = useState([]);
  const [isChanged, setIsChanged] = useState(false); //Re-renders the page after any change

  // getting Notes from the Database using REST api and axios
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/')
      .then(res => {
        setNotes(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [isChanged]);

  // posting new Note to the Database
  function addNote(newNote) {
    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/',
      data: {
        title : newNote.title,
        content : newNote.content
      }
    });

    setIsChanged(prevVal => !prevVal);
  }

  // updating the Note
  function editNote(id, editedNote) {
    axios({
      method: 'put',
      url: `http://127.0.0.1:8000/api/${id}/`,
      data: {
        title : editedNote.title,
        content : editedNote.content
      }
    });

    setIsChanged(prevVal => !prevVal);

  }

  // deleting the Note
  function deleteNote(id) {
    const URL = `http://127.0.0.1:8000/api/${id}/`
    axios.delete(URL, {
      data: {
        id: id
      }
    });

    setIsChanged(prevVal => !prevVal);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
