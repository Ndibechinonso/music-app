import React from 'react'
import Button from '../Button/Button'
import './Intro.css'
import drizzy from '../../Assets/drizzy.png'
import weekend from '../../Assets/weekend.png'
import circleG1 from '../../Assets/circleG1.png'
import circleG2 from '../../Assets/circleG2.png'
import FadeInAnimation from "../FadeInAnimation";


export default function Intro (props){
    return(
        <div className='introContainer'>
        <div className='introText'><FadeInAnimation direction="up" ><h2>Discover your moods</h2> </FadeInAnimation>
        <FadeInAnimation direction="up" delay={1}> <p>Explore your music activities and generate  new and exciting playlists without having to open your Deezer app at all</p></FadeInAnimation>
        <FadeInAnimation direction="right" delay={2}>   <div><a href='https://connect.deezer.com/oauth/auth.php?app_id=476242&redirect_uri=http://localhost:3000/dataload&perms=basic_access,email,listening_history'><Button className='introButton' text='Continue with Deezer'/></a></div></FadeInAnimation>
        </div> 
            <div className='picStack'><FadeInAnimation direction="left" ><img className='drizzy' src={drizzy} alt='drake'/></FadeInAnimation> <FadeInAnimation direction="up" delay={1}> <img className='jb' src={weekend}  alt='justin bieber'/></FadeInAnimation> </div>

<img className='leftCircle' src={circleG1} alt='' /> <img className='rightCircle' src={circleG2} alt=''/>
        </div>
    )
}