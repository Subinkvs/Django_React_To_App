import React from "react";
import {useState, useEffect} from 'react';
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

/**frontpage of the note app*/
const Notes = () => {
    let [notes, setNote] = useState([])
    useEffect(() =>{
        getNotes()
    },[])

    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/')
        let data = await response.json()
        setNote(data)

    }
    return(
        <div>
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                <div>
                    {notes.map((note, index) => (
                        <ListItem key= {index} note={note}/>
                    ))}
                </div>

            </div>
        <AddButton></AddButton>
        </div>
    )
}


export default Notes
