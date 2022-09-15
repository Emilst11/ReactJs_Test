import { combineReducers } from "redux";

const initialState = {
    items: []
}

export const get = (text) => {
    return{
        type: "GET",
        payload: text
    }
}
export const del = (id) => {
    return{
        type: "DEL",
        payload: id
    }
}

export const edit = (data) => {
    return{
        type: "EDIT",
        payload: data
    }
}

export const add = (data) => {
    return{
        type: "ADD",
        payload: data
    }
}

const listReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case "GET":
            return {
                ...state,
                items: [...state.items, payload]
            }
        
        case 'DEL':
            return{
                ...state,
                items: state.items.filter(item => item.id !== payload)
            }
        case 'ADD':
            state.items.unshift(payload)
            return{
                ...state,
                items: [...state.items]
            }
        case 'EDIT':
            state.items.splice(payload.id - 1, 1, payload)
            return{
                ...state,
                items: [...state.items]
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    lists: listReducer
})

export default rootReducer