import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Navbar.css";
import copylink from "../../Assets/copy-link.png";
import FadeInAnimation from "../FadeInAnimation";
import SubShare from "../SubShare";
import TwitterShare from "../TwitterShare";
import copy from "copy-to-clipboard";
import deezifylogo from "../../Assets/deezifylogo.png";

 const Navbar = (props) => {
  const [navlink, setNavlink] = useState(false);
  const [aboutlink, setAboutlink] = useState(false);
  const [sharelink, setSharelink] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentURL = window.location.href;
  const pageClickEvent = () => {
    setNavlink(false);
    setAboutlink(false);
    setSharelink(false);
  }

  useEffect(() => {
    if (navlink) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [navlink]);

  const dislayAboutLink = () =>{
    setNavlink(true);
    setAboutlink(true);
  }

  const dislayShareLink = () =>{
    setNavlink(true);
    setSharelink(true);
  }

  const hideCopiedLink = () => {
    copy(currentURL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 6000);
  }

  return (
    <div>
      <div className="navBar">
        
        <h2>
          <img src={deezifylogo} alt="" className="deezify-logo" />
        </h2>
        <ul className="navBar-links">
          <li className="aboutlink" onClick={dislayAboutLink}>
            <i className="uil uil-link-h share"></i>About
          </li>
          <li onClick={dislayShareLink}>
            <i className="uil uil-share-alt share"></i>Share
          </li>
          <div>
            <a
              href={`https://connect.deezer.com/oauth/auth.php?app_id=${process.env.REACT_APP_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&perms=${process.env.REACT_APP_PERMISSIONS}`}
            >
              <Button className="navBarButton" text="Log in" />
            </a>
          </div>
        </ul>
      </div>

      {navlink ? (
        <div className="modal">
          {aboutlink ? (
            <div className="about-modal" onClick={(e) => e.stopPropagation()}>
              <FadeInAnimation direction="up">
                <h2>About us</h2>
                <p>
                  Deezify is a streaming analytics and music discovery tool for
                  Deezer users created using the deezer API
                </p>
                <h2>Privacy</h2>
                <p style={{ marginBottom: "0" }}>
                  We require access to your Deezer account to get the access for
                  your streaming activities. However, we will never store your
                  Deezer data on any server
                </p>
              </FadeInAnimation>
            </div>
          ) : null}

          {sharelink ? (
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
              <FadeInAnimation direction="up">
                
                <h2>Share Deezify</h2>
                <p>Choose your preferred social platform</p>
              </FadeInAnimation>
              <div className="socialRow">
                <TwitterShare /> <SubShare />
                <div>
                  <img
                    src={copylink}
                    onClick={() => hideCopiedLink()}
                    className="socialRowImg"
                    alt="copy icon"
                  />
                  {copied ? <p className="copied">Copied</p> : null}
                </div>
              </div>
              {/* <div className='socialRow'><img src={twitter} className='socialRowImg' alt='twitter icon'/> <img src={instagram} className='socialRowImg' alt='instagram icon'/> <img src={copylink} className='socialRowImg' alt='copy icon'/> </div> */}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Navbar