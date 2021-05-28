import React from 'react'
import Button from '../Button/Button'
import './Intro.css'
import drizzy from '../../Assets/drizzy.png'
import weekend from '../../Assets/weekend.png'
import circleG1 from '../../Assets/circleG1.png'
import circleG2 from '../../Assets/circleG2.png'
import FadeInAnimation from "../FadeInAnimation";
import comingSoon from '../../Assets/comingSoon.png'
import mobFrame from '../../Assets/mobFrame.png'


export default function Intro (props){
    return(
        <div>
        <div className='introContainer'>
        <div className='introText'><FadeInAnimation direction="up" ><h2>Discover your moods</h2> </FadeInAnimation>
        <FadeInAnimation direction="up" delay={1}> <p>Explore your music activities and generate  new and exciting playlists without having to open your Deezer app at all</p></FadeInAnimation>
        <FadeInAnimation direction="right" delay={2}>   <div><a href='https://connect.deezer.com/oauth/auth.php?app_id=475622&redirect_uri=https://do-re-me.netlify.app/dataload&perms=basic_access,email,manage_library,delete_library,listening_history'><Button className='introButton' text='Continue with Deezer'/></a></div></FadeInAnimation>
        </div> 
        <div className='picStack'><FadeInAnimation direction="left" ><img className='drizzy' src={drizzy} alt='drake'/></FadeInAnimation> <FadeInAnimation direction="up" delay={1}> <img className='jb' src={weekend}  alt='justin bieber'/></FadeInAnimation> </div>

<img className='leftCircle' src={circleG1} alt='' /> <img className='rightCircle' src={circleG2} alt=''/>

        </div>

        <div className='mobDiv'>
            <div className='comingSoon'><img src={comingSoon} /></div>
     <p>Deezify is live on desktop devices, mobile coming soon</p>
        <div><div><a href='https://www.deezer.com/us'><Button className='introButton' text='Continue with Deezer'/></a></div></div>
        <div className='artistFrame'><img src={mobFrame} /></div>
        </div>

        </div>
    )
}