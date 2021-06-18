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
  dispatch(fetchUserRequest());
  try {
    axios
      .post("https://deezify-app-feeder.herokuapp.com/navbar", { code: code })

      .then((response) => {
        const users = response.data;
        console.log(users, "data");
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
      });
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};
