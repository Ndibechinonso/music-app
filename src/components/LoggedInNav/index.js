import React, { useState, useEffect } from 'react'
import './LoggedInNav.css'
import dropdown from '../../Assets/dropdown.png'
import icon from '../../Assets/icon.png'
import icon2 from '../../Assets/icon2.png'
import icon3 from '../../Assets/icon3.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


 function LoggedInNav(props) {
 const userData = useSelector(state => state.data[0])

    const [accountlink, setaccountlink] = useState(false)

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

    return (
      
        <div>
            <div className='loggedNavBar'>
                <Link to='/home'> <h2>Muzify</h2></Link>
                <ul className='loggedNavBar-links'>
                    <Link to='/home'> <li className='' >Home</li></Link> <Link to='/artists'><li>Artists </li></Link> <li>PlayLists </li> <li>Podcasts </li><li onClick={accountDrop}><img src={dropdown} alt='dropdown icon' /></li>
                </ul>
            </div>

            { accountlink ? <div className='accountModal'>
                <div className='modal-content'>
                    <div className='settings'><img src={userData.picture_xl} className='user userImg' alt='' /><p>{userData.name}</p> </div>
                    <div className='settings'><img src={icon} className='user' alt='feedback icon' /> Send Feedback</div>
                    <div className='settings'><img src={icon2} className='user' alt='autoplay icon' /> Auto play on hover</div>
                    <div className='settings'><img src={icon3} className='user' alt='logout icon' /> Log out</div>
                </div>
            </div> : null}
        </div>
        
    )
}

export default LoggedInNav