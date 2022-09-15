import axios from "axios";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/rootReducers";
import "../styles/Form.scss"

const Form = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const endpoint = 'https://jsonplaceholder.typicode.com/posts/'
    const submitFile = (e) => {
        e.preventDefault()
        const formData = {
            userId: 1,
            title: title,
            body: body
        }
        axios.post(endpoint, formData)
        .then(res => {
            dispatch(add(res.data))
        })
        .catch(console.error)
        setOpen(false)
        setBody('')
        setTitle('')
    }

    return(
        <div className="form-container">
            {open ? (
                <div className="form-container-box">
                    <h1>Add new items here</h1>
                    <form onSubmit={submitFile}>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type title here"/>
                        <input type='text' value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type body here"/>
                        <div>
                            <button type="submit">Submit</button>
                            <button className="close" onClick={() => setOpen(false)}>x</button>
                        </div>
                    </form>
                </div>

            ) : (
                <button onClick={() => setOpen(!open)}>Add new form +</button>
            )}
        </div>
    )
}

export default Form