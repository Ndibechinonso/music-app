import {
    GENRES_DATA_REQUEST,
    GENRES_DATA_SUCCESS,
    GENRES_DATA_FAILURE,
} from "./genresDataType";

const initialState = {
    loading: false,
    genreData: {},
    chartsData: {},
    error: "",
};

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENRES_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GENRES_DATA_SUCCESS:
            return {
                loading: false,
                genreData: action.payload.genre,
                chartsData: action.payload.charts,
                error: "",
            };
        case GENRES_DATA_FAILURE:
            return {
                loading: false,
                genreData: {},
                chartsData: {},
                error: action.payload,
            };

        default:
            return state;
    }
};

export default genresReducer;
