import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { get } from "../store/rootReducers";
import '../styles/Card.scss'
import Card from "./Card";

const CardBoard = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.lists.items)
    const endpoint = 'https://jsonplaceholder.typicode.com/posts/'

    useEffect(() => {
        for(let i = 1; i <=100; i++){
            axios.get(endpoint + i)
            .then(res => {
                dispatch(get(res.data))
            })
            .catch(console.error)
        }
    }, [])

    return(
        <div className="card-container">
            {items?.sort((a, b) => a.id < b.id ? 1 : -1).map(data => 
                <Card key={data.id} data={data}/>
                )}
        </div>
    )
}

export default CardBoard