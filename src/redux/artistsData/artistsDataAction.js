import axios from "axios";

import {
    ARTISTS_DATA_REQUEST,
    ARTISTS_DATA_SUCCESS,
    ARTISTS_DATA_FAILURE,
} from "./artistsDataType";

const fetchArtistsRequest = () => {
    return {
        type: ARTISTS_DATA_REQUEST,
    };
};

const fetchArtistsSuccess = (user) => {
    return {
        type: ARTISTS_DATA_SUCCESS,
        payload: user,
    };
};

const fetchArtistsFailure = (error) => {
    return {
        type: ARTISTS_DATA_FAILURE,
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


export const fetchArtistsData = () => {
    if (savedToken && savedUserId)
        return (dispatch) => {
            dispatch(fetchArtistsRequest());
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}users/artistsPage`,
                    requestOptions.body
                )

                .then((response) => {
                    const artistsData = response.data;
                    dispatch(fetchArtistsSuccess(artistsData));
                })
                .catch((error) => {
                    const errorMsg = error.message;
                    dispatch(fetchArtistsFailure(errorMsg));
                });
        };
};
