import React from "react";
import { useParams } from 'react-router-dom'
import {useState, useEffect} from "react";
import { ReactComponent as Arrowleft } from '../assets/arrow-left (1).svg'
import { useNavigate } from "react-router-dom";


const NotePage = () => {

    
    const{id} = useParams()
    const navigate = useNavigate();
    let [note, setNote] = useState(null)

    
  useEffect(() =>{
   
    getNote()

  }, [id])

    let getNote = async () => {
        if(id === 'new') return
        let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)

    }

    let updateNote = async () => {

            fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

    }

    let deleteNote = async () =>{
        fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let createNote = async () =>{
        fetch(`http://127.0.0.1:8000/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(note)
        })
    }

    let handleSubmit = () => {
        navigate('/')
        if(id !== 'new' && note.body == ''){
          deleteNote()
        }
       
        
        else if(id !== 'new'){
          updateNote()
        }
        else if(id === 'new'&& note.body !== null && note.body !== ''){
          createNote()
        }
       
        
      }

    return(
        <div className="note">
            <div className="note-header">
                <h3>
                    <Arrowleft onClick={handleSubmit}></Arrowleft>
                </h3>
                {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
            ):(
            <button onClick={handleSubmit}>Done</button>
            )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage