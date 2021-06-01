import {PLAYLISTS_DATA_REQUEST, PLAYLISTS_DATA_SUCCESS, PLAYLISTS_DATA_FAILURE} from './playlistsPageDataType'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const playlistsPageReducer = (state = initialState, action) => {
    switch(action.type){
        case PLAYLISTS_DATA_REQUEST : return {
            ...state, loading: true
        }
        case PLAYLISTS_DATA_SUCCESS : return{
            loading: false,
            data: action.payload,
            error: ''
        }
        case PLAYLISTS_DATA_FAILURE : return{
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

export default playlistsPageReducer 