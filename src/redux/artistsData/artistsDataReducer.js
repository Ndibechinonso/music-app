import {
    ARTISTS_DATA_REQUEST,
    ARTISTS_DATA_SUCCESS,
    ARTISTS_DATA_FAILURE,
} from "./artistsDataType";

const initialState = {
    loading: false,
    data: [],
    error: "",
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTISTS_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ARTISTS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: "",
            };
        case ARTISTS_DATA_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        // case 'FETCH_DATA': return {
        //     loading: false,
        //     data: action.payload,
        //     error: ''
        // }
        default:
            return state;
    }
};

export default artistsReducer;
