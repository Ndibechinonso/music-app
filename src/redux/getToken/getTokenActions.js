import axios from "axios";

import { TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE } from "./getTokenTypes";

const fetchTokenRequest = () => {
    return {
        type: TOKEN_REQUEST,
    };
};

const fetchTokenSuccess = (token) => {
    return {
        type: TOKEN_SUCCESS,
        payload: token,
    };
};

const fetchTokenFailure = (error) => {
    return {
        type: TOKEN_FAILURE,
        payload: error,
    };
};
const savedCode = localStorage.getItem("code");

const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: {
        code: savedCode,
    },
};

export const fetchToken = (code) => {
    return (dispatch) => {
        dispatch(fetchTokenRequest());
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}`, { code: code })

            .then((response) => {
                const token = response.data;
                dispatch(fetchTokenSuccess(token));
            })
            .catch((error) => {
                window.location.href = "/";
                const errorMsg = error.message;
                dispatch(fetchTokenFailure(errorMsg));
            });
    };
};
