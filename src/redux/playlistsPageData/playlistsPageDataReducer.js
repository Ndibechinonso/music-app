import {
    PLAYLISTS_DATA_REQUEST,
    PLAYLISTS_DATA_SUCCESS,
    PLAYLISTS_DATA_FAILURE,
} from "./playlistsPageDataType";

const initialState = {
    loading: false,
    playlists: {},
    recommendedPlaylistsData: {},
    error: "",
};

const playlistsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYLISTS_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PLAYLISTS_DATA_SUCCESS:
            return {
                loading: false,
                playlists: action.payload.playlistsData,
                recommendedPlaylistsData: action.payload.recommendedPlaylistsData,
                error: "",
            };
        case PLAYLISTS_DATA_FAILURE:
            return {
                loading: false,
                playlists: {},
                recommendedPlaylistsData: {},
                error: action.payload,
            };

        default:
            return state;
    }
};

export default playlistsPageReducer;
