import React, { useState, useEffect } from 'react'
import './LoggedInNav.css'
import dropdown from '../../Assets/dropdown.png'
import icon from '../../Assets/icon.png'
import icon2 from '../../Assets/icon2.png'
import icon3 from '../../Assets/icon3.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import { useFormik, yupToFormErrors } from 'formik';
import cancelButton from '../../Assets/cancelButton.png'
import Button from '../Button/Button'
import axios from 'axios'
import * as Yup from 'yup'
import deezifylogo from '../../Assets/deezifylogo.png'
import autoplayoff from '../../Assets/autoplayoff.png'
import autoplayon from '../../Assets/autoplayon.png'
import feedback from '../../Assets/feedback.png'


function LoggedInNav(props) {
  const userData = useSelector(state => state.userData.data[0])
  const [show, setShow] = useState(false)
  const [accountlink, setaccountlink] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function accountDrop() {
    setaccountlink(true)
  }

  function pageClickEvent() {
    setaccountlink(false)
  }

  useEffect(() => {
    if (accountlink) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  },
    [accountlink]
  )

  const SignupForm = () => {

    const validate = values => {

      const errors = {};
      if (!values.fullName) {
        errors.fullName = 'Required';
      } else if (values.fullName.length > 15) {
        errors.fullName = 'Must be 15 characters or less';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.feedback) {
        errors.feedback = 'Required';
      }
      return errors;
    };

    const { handleSubmit, setFieldValue, values, errors, resetForm } = useFormik({
      initialValues: {
        fullName: '',
        email: '',
        feedback: ''
      },
      validationSchema: Yup.object({
        fullName: Yup.string().required("Please enter a name")
        , email: Yup.string().email().required("Please enter a valid email account")
        , feedback: Yup.string().required("Please enter your feedback")
      })
      ,
      onSubmit: values => {
          
             axios.post('https://music-app-feeder.herokuapp.com/feedback', { fullName: values.fullName, email: values.email, feedback: values.feedback })
             .then(response => {
              const responseInfo = response.message
              console.log(responseInfo, "responseInfo")
              setIsSubmitted(true)
              resetForm({values: ''})
            })
            .catch(error => {
              const errorMsg = error.message
              console.log(errorMsg, "errorMsg")
            })
        },
      });
  
      return (
        <div>
          {!isSubmitted ? <form onSubmit={handleSubmit}>
            <div className='closeBtn'><div onClick={() => setShow(false)} className='closeContainer'><img className='closeImg' src={cancelButton} alt='' /></div></div>
            <div className='feedbackModal-title'> We appreciate your feedback</div>
            <p className='feedBackText'>Please leave a message for us and we will reach out to you as soon as possible</p>
  
            <div className='inputDiv'>
              <div className='inputGroup'>
                <label htmlFor="firstName">Full Name</label><br />
                <input
                  className='userInfo'
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={e => setFieldValue("fullName", e.target.value)}
                  value={values.fullName}
                /><br />
                {errors.fullName ? <div className='error'>{errors.fullName}</div> : null}
              </div>
  
              <div className='inputGroup'>
                <label htmlFor="email">Email Address</label><br />
                <input
                  className='userInfo'
                  id="email"
                  name="email"
                  type="email"
                  onChange={e => setFieldValue("email", e.target.value)}
                  value={values.email}
                /><br />
                {errors.email ? <div className='error'>{errors.email}</div> : null}
              </div>
  
              <div className='inputGroup'>
                <label htmlFor="feedback">Feedback</label><br />
                <textarea
                  className='userInfo'
                  id="feedback"
                  name="feedback"
                  type="text"
                  onChange={e => setFieldValue("feedback", e.target.value)}
                  value={values.feedback}
                /><br />
                {errors.feedback ? <div className='error'>{errors.feedback}</div> : null}
              </div>
            </div>
  
            <div className='buttonDiv'> <Button className='feedbackButton' text='Submit' type='submit' /></div>
          </form> : <div><div className='closeBtn'><div onClick={() => {setShow(false); setIsSubmitted(false)}} className='closeContainer'><img className='closeImg' src={cancelButton} alt='' /></div></div>
            <div className='feedbackClass'><div><img src={feedback} /></div><p>Thank you for sharing this with us. We will get back to you as soon as possible.</p><p>Till then, Keep streamiing!!!</p></div></div>}
        </div>);
    };
    return (
      <div>
        <Modal show={show} onClose={() => {setShow(false); setIsSubmitted(false)}} >
          {SignupForm()}
        </Modal>
  
        <div className='loggedNavBar'>
          <Link to='/home'> <h2><img src={deezifylogo} /></h2></Link>
          <ul className='loggedNavBar-links'>
            <Link to='/home'> <li className='' >Home</li></Link> <Link to='/artists'><li>Artists </li></Link> <Link to='/playlists'><li>PlayLists </li></Link> <Link to='/genres'> <li>Genres </li> </Link> <li onClick={accountDrop}><img src={dropdown} alt='dropdown icon' /></li>
          </ul>
        </div>
  
        { accountlink ? <div className='accountModal'>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            {userData ? <div className='settings'><img src={userData.picture_xl} className='user userImg' alt='' /><p>{userData.name}</p></div>
              : <div className='settings'> <i className="fas userIcon fa-user-circle"></i> User</div>}
            <div className='settings' onClick={() => { setShow(true); setaccountlink(false) }}><img src={icon} className='user' alt='feedback icon' /> Send Feedback</div>
            <div className='settings'><img src={icon2} className='user' alt='autoplay icon' /> Auto play on hover <div className='autoplayDiv'>{autoPlay ? <img src={autoplayon} onClick={() => setAutoPlay(false)} /> : <img src={autoplayoff} onClick={() => setAutoPlay(true)} />} </div> </div>
            <Link to='/'><div className='settings'><img src={icon3} className='user' alt='logout icon' /> Log out</div></Link>
          </div>
        </div> : null}
      </div>
    )
  }
  
  export default LoggedInNav