import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./DataLoad.css";
import { fetchToken } from "../../redux";
import { Link } from "react-router-dom";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";

const DataLoad = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { cursorChangeHandler } = useContext(MouseContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    dispatch(fetchToken(code));
  }, []);

   const {loading , tokenData : {access_token}, userData, userData: {id}} = useSelector((state) => state.userToken)

  localStorage.setItem("token", access_token);
  localStorage.setItem("userData", JSON.stringify(userData))
  localStorage.setItem("userId", id);

  return (
    <div>
      <DotRing />
      <div
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <div className="playDiv">
          {" "}
          {loading ? (
            <div className="playCircle">
              <div className="lds-circle">
                <div></div>
              </div>
            </div>
          ) : (
            <div className="playCircleActing">
              <Link to="/home">
                <i className="fas play fa-play"></i>
              </Link>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default DataLoad;
