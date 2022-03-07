import axios from "axios";
import errorHandler from "../../components/errorHandler";
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


export const fetchGenresData = (savedToken, savedUserId) => (dispatch) => {
  dispatch(fetchGenresRequest())
  try {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}users/genrePage`,
        {accessToken: savedToken,
          userId: savedUserId}
      )

      .then((response) => {
        dispatch(fetchGenresSuccess(response.data))
        errorHandler(response.data.code)
      })
      .catch((error) => {
        dispatch(fetchGenresFailure(error))
      })
  } catch (error) {
    dispatch(fetchGenresFailure(error))
  }
};
