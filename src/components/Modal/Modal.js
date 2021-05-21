import React from 'react'
import './Modal.css'

const Modal = (props) =>{
if(!props.show){
    return null
}
    return(
        <div className='playlistModal' onClick={props.onClose}>
            <div className='playlistModal-content' onClick={e => e.stopPropagation()}>
{/* <div className="playlistModal-header">

   
    </div> */}
   {props.children}
            </div>
        </div>
    )
}

export default Modal