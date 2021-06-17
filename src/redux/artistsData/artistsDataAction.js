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

console.log(savedToken, "savedToken");
console.log(savedUserId, "savedUserId");

export const fetchArtistsData = () => {
    if (savedToken && savedUserId)
        return (dispatch) => {
            dispatch(fetchArtistsRequest());
            axios
                .post(
                    "https://deezify-app-feeder.herokuapp.com/artists",
                    requestOptions.body
                )

                .then((response) => {
                    const artistsData = response.data;
                    console.log(artistsData, "artistsData");
                    dispatch(fetchArtistsSuccess(artistsData));
                })
                .catch((error) => {
                    const errorMsg = error.message;
                    dispatch(fetchArtistsFailure(errorMsg));
                });
        };
};
