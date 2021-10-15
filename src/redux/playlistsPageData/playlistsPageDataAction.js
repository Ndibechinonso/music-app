import axios from "axios";

import {
    PLAYLISTS_DATA_REQUEST,
    PLAYLISTS_DATA_SUCCESS,
    PLAYLISTS_DATA_FAILURE,
} from "./playlistsPageDataType";

const fetchPlaylistsRequest = () => {
    return {
        type: PLAYLISTS_DATA_REQUEST,
    };
};

const fetchPlaylistsSuccess = (user) => {
    return {
        type: PLAYLISTS_DATA_SUCCESS,
        payload: user,
    };
};

const fetchPlaylistsFailure = (error) => {
    return {
        type: PLAYLISTS_DATA_FAILURE,
        payload: error,
    };
};

const savedToken = localStorage.getItem("token");
const savedUserId = localStorage.getItem("userId");

const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: {
        accessToken: savedToken,
        userId: savedUserId,
    },
};


export const fetchPlaylistsPageData = () => {
    if (savedToken && savedUserId)
        return (dispatch) => {
            dispatch(fetchPlaylistsRequest());
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}playlists`,
                    requestOptions.body
                )

                .then((response) => {
                    const playlistsPageData = response.data;
                    dispatch(fetchPlaylistsSuccess(playlistsPageData));
                })
                .catch((error) => {
                    const errorMsg = error.message;
                    dispatch(fetchPlaylistsFailure(errorMsg));
                });
        };
};
