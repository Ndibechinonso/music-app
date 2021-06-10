import {TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE} from './getTokenTypes'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const tokenReducer = (state = initialState, action) => {
    switch(action.type){
        case TOKEN_REQUEST : return {
            ...state, loading: true
        }
        case TOKEN_SUCCESS : return{
            loading: false,
            data: action.payload,
            error: ''
        }
        case TOKEN_FAILURE : return{
            loading: false,
            data: [],
            error: action.payload
        }
        // case 'FETCH_DATA': return {
        //     loading: false,
        //     data: action.payload,
        //     error: ''
        // }
        default: return state
    }
}

export default tokenReducer 