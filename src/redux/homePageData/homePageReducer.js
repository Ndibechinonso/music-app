import {
    HOMEPAGE_DATA_REQUEST,
    HOMEPAGE_DATA_SUCCESS,
    HOMEPAGE_DATA_FAILURE,
} from "./homePageType";

const initialState = {
    loading: false,
    recommendedAlbumsData: {},
    lastPlayedData: {},
    recommendedTracksData: {},
    error: "",
};

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOMEPAGE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case HOMEPAGE_DATA_SUCCESS:
            return {
                loading: false,
                recommendedAlbumsData: action.payload.recommendedAlbums,
                lastPlayedData: action.payload.lastPlayed,
                recommendedTracksData: action.payload.recommendedTracks,
                error: "",
            };
        case HOMEPAGE_DATA_FAILURE:
            return {
                loading: false,
                recommendedAlbumsData: {},
                lastPlayedData: {},
                recommendedTracksData: {},
                error: action.payload,
            };

        default:
            return state;
    }
};

export default homePageReducer;
