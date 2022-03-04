import axios from "axios";

import {
  PLAYLISTS_DATA_REQUEST,
  PLAYLISTS_DATA_SUCCESS,
  PLAYLISTS_DATA_FAILURE,
} from "./playlistsPageDataType";

const fetchPlaylistsRequest = () => {
  return {
    type: PLAYLISTS_DATA_REQUEST,
  };
};

const fetchPlaylistsSuccess = (user) => {
  return {
    type: PLAYLISTS_DATA_SUCCESS,
    payload: user,
  };
};

const fetchPlaylistsFailure = (error) => {
  return {
    type: PLAYLISTS_DATA_FAILURE,
    payload: error,
  };
};

export const fetchPlaylistsPageData = (savedToken, savedUserId) => (dispatch) => {
  dispatch(fetchPlaylistsRequest())
  try {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}users/playlistPage`,
       {  accessToken: savedToken,
        userId: savedUserId}
      )

      .then((response) => {
        dispatch(fetchPlaylistsSuccess(response.data))
      })
      .catch((error) => {
        dispatch(fetchPlaylistsFailure(error.code))
      })
  } catch (error) {
    dispatch(fetchPlaylistsFailure(error))
  }
};
