import React from 'react'
import LoggedInNav from '../LoggedInNav'
import './Terms.css'

export default function Terms(props){
return(
    <div>
        <LoggedInNav />
<div class='terms'>
    <h2>Request permisions</h2>
    
   <p>Muzify, the deezer widget app requires 
    authorization to perform the following actions;

    Access my basic information
    include surname, first name, playlists history
    Send me messages</p> 
</div>
</div>
)
}