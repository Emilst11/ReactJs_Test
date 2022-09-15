import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { del, edit } from "../store/rootReducers";
import '../styles/Card.scss'
import delIcon from '../assets/delete.png'

const Card = ( {data} ) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const dispatch = useDispatch()
    const endpoint = 'https://jsonplaceholder.typicode.com/posts/'

    const deleteItem = (id) => {
        axios.delete(endpoint + `:${id}`)
        .then(() => {
            dispatch(del(id))
            console.log('Delete')
        })
        .catch(console.error)
    }
    const clickForm = () => setOpen(true)
    const closeForm = () => setOpen(false)

    const fileChange = (e) => {
        e.preventDefault()
        const datas = {
            title: title,
            body: body
        }
        axios.patch(endpoint + `${data.id}`, datas)
        .then(res => {
            console.log(JSON.stringify(res.data))
            dispatch(edit(res.data))
        })
        .catch(error => console.log(error))

        setTitle('')
        setBody('')
        setOpen(false)
    }

    return(
        <div key={data.id} className="card">
            {open ? (
                <div>
                    <button onClick={closeForm} className="close">X</button>
                    <form onSubmit={fileChange}>
                        <h1>Edit this card</h1>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Input new title"/>
                        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Input new body"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                    <div>
                    <h1 onClick={clickForm}>{data.title}</h1>
                    <p onClick={clickForm}>{data.body}</p>
                    <button onClick={() => deleteItem(data.id)}><img src={delIcon} alt="delete" /></button>
                </div>
            )}
        </div>
    )
}

export default Card