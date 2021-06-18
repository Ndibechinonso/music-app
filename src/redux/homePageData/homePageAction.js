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

export const fetchHomeData = () => {
  if (savedToken && savedUserId)
    return (dispatch) => {
      setTimeout(() => {
        dispatch(fetchHomePageRequest());
      }, 3000);
      axios
        .post("https://deezify-app-feeder.herokuapp.com/home", {
          accessToken: code,
          userId: id,
        })

        .then((response) => {
          const homePageData = response.data;
          console.log(homePageData, "homePageData");
          dispatch(fetchHomePageSuccess(homePageData));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchHomePageFailure(errorMsg));
        });
    };
};
