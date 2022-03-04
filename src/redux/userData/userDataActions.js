import axios from "axios";

import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "./userDataTypes";

const fetchUserRequest = () => {
  return {
    type: USER_DATA_REQUEST,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: user,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: USER_DATA_FAILURE,
    payload: error,
  };
};

export const fetchUsers = (code) => (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}navbar`, { code: code })

      .then((response) => {
        dispatch(fetchUserSuccess(response.data))
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.code))
      })
  } catch (error) {
    dispatch(fetchUserFailure(error))
  }
};
