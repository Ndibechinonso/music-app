import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./DataLoad.css";
import { fetchToken } from "../../redux";
import { Link } from "react-router-dom";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";
import Button from '../Button/Button'

const DataLoad = (props) => {
  
  const {cursorChangeHandler } = useContext(MouseContext);
  const loader = useSelector((state) => state.userToken.loading);
  const accessToken = useSelector(state => state.userToken.data[0])
  const userData = useSelector(state => state.userToken.data[1])
  const userDataId = useSelector(state => state.userToken.data[2])
  console.log(userData, 'user')
  console.log(accessToken, 'accessToken')
  console.log(userDataId, 'userDataId')

  localStorage.setItem("token", accessToken)
  localStorage.setItem("userId", userDataId)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchToken());
  }, []);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    localStorage.setItem("code", code);
  }, []);

  return (
    <div>
      <DotRing />
      <div
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <div className="playDiv">
          {" "}
          {loader ? (
            <div className="playCircle">
              <div className="hourglass"></div>
            </div>
          ) : !userData ? <div className='errorDiv'> <div className='errorMsg'>Something went terribly wrong. Please click the button below to take you back to the Login Page </div><div><Link to='/'><Button className='navBarButton' text='Go back to Login Page' /></Link></div></div> : (
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
