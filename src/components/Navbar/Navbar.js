import React, {useState, useEffect} from 'react'
import Button from '../Button/Button'
import './Navbar.css'
import twitter from '../../Assets/twitter.png'
import instagram from '../../Assets/instagram.png'
import copylink from '../../Assets/copy-link.png'
import { Link } from 'react-router-dom'
import FadeInAnimation from "../FadeInAnimation";

export default function Navbar(props) {
    
const [navlink, setNavlink] = useState(false)
const [aboutlink, setAboutlink] = useState(false)
const [sharelink, setSharelink] = useState(false)

function pageClickEvent() {
    setNavlink(false)
    setAboutlink(false)
    setSharelink(false)
}

useEffect(() => {
    if (navlink) {
      window.addEventListener('click', pageClickEvent);

    }
    return () => {
        window.removeEventListener('click', pageClickEvent);
      }
  }, [navlink]);

  function dislayAboutLink(){
      
   setNavlink(true);
   setAboutlink(true)
  }

  function dislayShareLink(){
    setNavlink(true)
    setSharelink(true)
   }
    return (
        <div>
            <div className='navBar'>
              
               <Link to='/home'> <h2>Muzify</h2></Link>
                <ul className='navBar-links'>
                    <li className='aboutlink' onClick={dislayAboutLink} >About</li> <li onClick={dislayShareLink}>Share <i className="fas fa-external-link-alt share"></i>
                    </li>
               <div><a href='https://connect.deezer.com/oauth/auth.php?app_id=475622&redirect_uri=https://do-re-me.netlify.app/home&perms=basic_access,email,listening_history'><Button className='navBarButton' text='Log in' /></a></div>
                </ul>
            </div>

           {navlink ? <div className='modal'>
            {aboutlink ? <div className='about-modal'>
            <FadeInAnimation direction="up" >  
                    <h2>About us</h2>
                    <p>Muzify is a streaming analytics and music discovery tool for Deezer users created using the deezer API</p>
                    <h2>Privacy</h2>
                    <p>We require access to your Deezer account to get the access for your streaming activities. However, we will never store your Deezer data on any server</p>
                    </FadeInAnimation> </div>  : null}

              {sharelink ?  <div className='share-modal'>
              <FadeInAnimation direction="up">  <h2>Share Muzify</h2>
                    <p>Choose your preferred social platform</p>
                    <div className='socialRow'><img src={twitter} className='socialRowImg' alt='twitter icon'/> <img src={instagram} className='socialRowImg' alt='instagram icon'/> <img src={copylink} className='socialRowImg' alt='copy icon'/> </div>
                    </FadeInAnimation>  </div> : null}
            </div>  : null }

        </div>
    )
}