import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./DataLoad.css";
import { fetchUsers } from "../../redux";
import { Link } from "react-router-dom";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";
import Button from '../Button/Button'

const DataLoad = (props) => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const loader = useSelector((state) => state.userData.loading);
  const userData = useSelector(state => state.userData.data[0])
  const error = useSelector((state) => state.userData.error);

 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
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
          {!loader ? userData && !userData.id ? <div className='errorDiv'> <div className='errorMsg'>Something went terribly wrong. Please click the button below to take you back to the Login Page </div><div><Link to='/'><Button className='navBarButton' text='Go back to Login Page' /></Link></div></div> : (
            <div className="playCircleActing">
              <Link to="/home">
                  <i className="fas play fa-play"></i>
              </Link>
            </div>
          ) : (
            <div className="playCircle">
              <div className="hourglass"></div>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default DataLoad;
