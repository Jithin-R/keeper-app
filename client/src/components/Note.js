import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

function Note(props) {

  const [isEditable, setEditable] = useState(false);

  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleClick() {
    props.onDelete(props.id);
  }

  function handlePress(){
    setEditable(prevValue => !prevValue);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function doneChange(event){
    props.onEdit(props.id, note)
    setEditable(prevValue => !prevValue);
    event.preventDefault();
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>

      {/* form to update the note */}
      {isEditable && (
        <form className="create-note" style={{width:'auto'}}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
          <input
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            value={note.content}
          />
        </form>  
      )}

      {/* delete button */}
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>

      {/* edit button */}
      {!(isEditable) && (
        <button onClick={handlePress}>
          <EditIcon />
      </button>
      )}

      {/* done button */}
      {isEditable && (
        <button onClick={doneChange}>
          <DoneIcon />
      </button>
      )}
      
    </div>
  );
}

export default Note;
