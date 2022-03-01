import React, { useState, useEffect } from "react";
import './LoggedInNav.css'
import icon from "../../Assets/icon.png";
import icon2 from "../../Assets/icon2.png";
import icon3 from "../../Assets/icon3.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import { useFormik } from "formik";
import cancelButton from "../../Assets/cancelButton.png";
import Button from "../Button/Button";
import axios from "axios";
import * as Yup from "yup";
import deezifylogo from "../../Assets/deezifylogo.png";
import autoplayoff from "../../Assets/autoplayoff.png";
import autoplayon from "../../Assets/autoplayon.png";
import feedback from "../../Assets/feedback.png";
import { NavLink, useHistory } from "react-router-dom";

import { fetchPlayState, fetchStopState } from "../../redux";
import { debounce } from "../../utilities/helpers";

const LoggedInNav = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  let userDataString =localStorage.getItem("userData")
  const userData = JSON.parse(userDataString)

  const [show, setShow] = useState(false);
  const [accountlink, setaccountlink] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
      currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
  const navbarStyles = {
    position: "fixed",
    textAlign: "center",
    transition: "top 0.6s",
  };

  const accountDrop = () => {
    setaccountlink(true);
  }

  const pageClickEvent = () => {
    setaccountlink(false);
  }

  const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userData")
    history.push('/')
  }

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 681){
        logout()
      }
}
    window.addEventListener('resize', handleResize)
  })


  useEffect(() => {
    if (accountlink) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [accountlink]);

  const SignupForm = () => {
    const { handleSubmit, setFieldValue, values, errors, resetForm } =
      useFormik({
        initialValues: {
          fullName: "",
          email: "",
          feedback: "",
        },
        validationSchema: Yup.object({
          fullName: Yup.string().required("Please enter a name"),
          email: Yup.string()
            .email()
            .required("Please enter a valid email account"),
          feedback: Yup.string().required("Please enter your feedback"),
        }),
        onSubmit: (values) => {
          setIsSubmitting(true)
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}feedback`, {
              fullName: values.fullName,
              email: values.email,
              feedback: values.feedback,
            })
            .then((response) => {
              const responseInfo = response.message;
              setIsSubmitted(true);
              resetForm({ values: "" });
            })
            .catch((error) => {
              const errorMsg = error.message;
            });
        },
      });

    return (
      <div>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="closeBtn">
              <div onClick={() => setShow(false)} className="closeContainer">
                <img className="closeImg" src={cancelButton} alt="" />
              </div>
            </div>
            {/* <div className="feedbackModal-title">
              {" "}
              We appreciate your feedback
            </div> */}
            <p className="feedBackText">
              Please leave a message for us and we will reach out to you as soon
              as possible
            </p>

            <div className="inputDiv">
              <div className="inputGroup">
                <label htmlFor="firstName">Full Name</label>
                <br />
                <input
                  className="userInfo"
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={(e) => setFieldValue("fullName", e.target.value)}
                  value={values.fullName}
                />
                <br />
                {errors.fullName && isSubmitting ? (
                  <div className="error">{errors.fullName}</div>
                ) : null}
              </div>

              <div className="inputGroup">
                <label htmlFor="email">Email Address</label>
                <br />
                <input
                  className="userInfo"
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  value={values.email}
                />
                <br />
                {errors.email  && isSubmitting ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>

              <div className="inputGroup">
                <label htmlFor="feedback">Feedback</label>
                <br />
                <textarea
                  className="userInfo"
                  id="feedback"
                  name="feedback"
                  type="text"
                  onChange={(e) => setFieldValue("feedback", e.target.value)}
                  value={values.feedback}
                />
                <br />
                {errors.feedback  && isSubmitting ? (
                  <div className="error">{errors.feedback}</div>
                ) : null}
              </div>
              <div className="buttonDiv">
                {" "}
                <Button
                  className="feedbackButton"
                  text="Submit"
                  type="submit"
                />
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div className="closeBtn">
              <div
                onClick={() => {
                  setShow(false);
                  setIsSubmitted(false);
                }}
                className="closeContainer"
              >
                <img className="closeImg" src={cancelButton} alt="" />
              </div>
            </div>
            <div className="feedbackClass">
              <div className='feedback-img'>
                <img src={feedback} alt="" />
              </div>
              <p>
                Thank you for sharing this with us. We will get back to you as
                soon as possible.
              </p>
              <p>Till then, Keep streamiing!!!</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <Modal
        show={show}
        onClose={() => {
          setShow(false);
          setIsSubmitted(false);
        }}
      >
        {SignupForm()}
      </Modal>

      <div
        className="loggedNavBar"
        style={{ ...navbarStyles, top: visible ? "0" : "-120px" }}
      >
        <Link to="/home">
          {" "}
          <h2>
            <img src={deezifylogo} alt="deezify-logo" className='deezify-logo'/>
          </h2>
        </Link>
        <div className='nav-right'>
        <ul className="loggedNavBar-links">
          <NavLink className="navLink" activeClassName="is-active" to="/home">
            Home
          </NavLink>

          <NavLink
            className="navLink"
            activeClassName="is-active"
            to="/artists"
          >
            Artists
          </NavLink>

          <NavLink
            className="navLink"
            activeClassName="is-active"
            to="/playlists"
          >
            PlayLists
          </NavLink>

          <NavLink className="navLink" activeClassName="is-active" to="/genres">
            Genres
          </NavLink>
        </ul>
        <div className="dropdownDiv">
          {userData ? (
            <img src={userData.picture_small} className="user userImg" alt="" onClick={accountDrop}/>
          ) : <i className="uil uil-user-circle"></i>}{" "}
          {/* <li onClick={accountDrop}>
            <img src={dropdown} alt="dropdown icon" className="dropdownIcon" />
          </li> */}
        </div>
        </div>
      </div>

      {accountlink ? (
        <div className="accountModal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {userData ? (
              <div className="settings">
                <img
                  src={userData.picture_small}
                  className="user userImg"
                  alt=""
                />
                <p>{userData.name}</p>
              </div>
            ) : (
              <div className="settings">
                {" "}
                <i className="uil uil-user-circle"></i> User
              </div>
            )}
            <div
              className="settings"
              onClick={() => {
                setShow(true);
                setaccountlink(false);
              }}
            >
              <img src={icon} className="user" alt="feedback icon" /> Send
              Feedback
            </div>
            <div className="settings">
              <img src={icon2} className="user" alt="autoplay icon" /> Auto play
              on hover{" "}
              <div className="autoplayDiv">
                {autoPlay ? (
                  <img
                    src={autoplayon}
                    onClick={() => {
                      setAutoPlay(false);
                      dispatch(fetchStopState());
                    }}
                    alt=""
                  />
                ) : (
                  <img
                    src={autoplayoff}
                    onClick={() => {
                      setAutoPlay(true);
                      dispatch(fetchPlayState());
                    }}
                    alt=""
                  />
                )}{" "}
              </div>{" "}
            </div>
            {/* <Link to="/"> */}
              <div className="settings" onClick={logout}>
                <img src={icon3} className="user" alt="logout icon" /> Log out
              </div>
            {/* </Link> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LoggedInNav;
