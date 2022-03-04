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

export const fetchArtistsData = (savedToken, savedUserId) => (dispatch) => {
  dispatch(fetchArtistsRequest());
  try {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}users/artistsPage`,
        { accessToken: savedToken,
          userId: savedUserId}
      )

      .then((response) => {
        dispatch(fetchArtistsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchArtistsFailure(error.code));
      });
  } catch (error) {
    dispatch(fetchArtistsFailure(error));
  }
};
