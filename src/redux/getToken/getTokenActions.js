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

export const fetchToken = (code) => (dispatch) => {
  dispatch(fetchTokenRequest())
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}`, { code: code })

      .then((response) => {
        dispatch(fetchTokenSuccess(response.data))
      })
      .catch((error) => {
        window.location.href = "/"
        dispatch(fetchTokenFailure(error.code))
      })
  } catch (error) {
    dispatch(fetchTokenFailure(error))
  }
};
