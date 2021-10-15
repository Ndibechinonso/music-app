import axios from "axios";

import {
    GENRES_DATA_REQUEST,
    GENRES_DATA_SUCCESS,
    GENRES_DATA_FAILURE,
} from "./genresDataType";

const fetchGenresRequest = () => {
    return {
        type: GENRES_DATA_REQUEST,
    };
};

const fetchGenresSuccess = (user) => {
    return {
        type: GENRES_DATA_SUCCESS,
        payload: user,
    };
};

const fetchGenresFailure = (error) => {
    return {
        type: GENRES_DATA_FAILURE,
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


export const fetchGenresData = () => {
    if (savedToken && savedUserId)
        return (dispatch) => {
            dispatch(fetchGenresRequest());
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}genres`,
                    requestOptions.body
                )

                .then((response) => {
                    const genresData = response.data;
                    dispatch(fetchGenresSuccess(genresData));
                })
                .catch((error) => {
                    const errorMsg = error.message;
                    dispatch(fetchGenresFailure(errorMsg));
                });
        };
};
