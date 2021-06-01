import {HOMEPAGE_DATA_REQUEST, HOMEPAGE_DATA_SUCCESS, HOMEPAGE_DATA_FAILURE} from './homePageType'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const homePageReducer = (state = initialState, action) => {
    switch(action.type){
        case HOMEPAGE_DATA_REQUEST : return {
            ...state, loading: true
        }
        case HOMEPAGE_DATA_SUCCESS : return{
            loading: false,
            data: action.payload,
            error: ''
        }
        case HOMEPAGE_DATA_FAILURE : return{
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

export default homePageReducer 