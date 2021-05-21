import {FETCH_PAYLIST_REQUEST, FETCH_PAYLIST_SUCCESS, FETCH_PAYLIST_FAILURE} from './playListDataTypes'



    const initialState = {
        loading: false,
        data: [],
        error: ''
    }
    
const playlistReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_PAYLIST_REQUEST: return {
            ...state, loading: true
        }

        case FETCH_PAYLIST_SUCCESS: return {
            loading: false,
            data: action.payload,
            error: ''
        }
        case FETCH_PAYLIST_FAILURE: return {
            loading: false,
            data: [],
            error: action.payload
        }
        default: return state
    }
} 

export default playlistReducer 