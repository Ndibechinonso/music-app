import axios from "axios";

import {
  HOMEPAGE_DATA_REQUEST,
  HOMEPAGE_DATA_SUCCESS,
  HOMEPAGE_DATA_FAILURE,
} from "./homePageType";

const fetchHomePageRequest = () => {
  return {
    type: HOMEPAGE_DATA_REQUEST,
  };
};

const fetchHomePageSuccess = (user) => {
  return {
    type: HOMEPAGE_DATA_SUCCESS,
    payload: user,
  };
};

const fetchHomePageFailure = (error) => {
  return {
    type: HOMEPAGE_DATA_FAILURE,
    payload: error,
  };
};

export const fetchHomeData = (code, id) => (dispatch) => {
  dispatch(fetchHomePageRequest())
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/homePage`, {
        accessToken: code,
        userId: id,
      })

      .then((response) => {
        dispatch(fetchHomePageSuccess(response.data))
      })
      .catch((error) => {
        dispatch(fetchHomePageFailure(error.code))
      })
  } catch (error) {
    dispatch(fetchHomePageFailure(error))
  }
};
