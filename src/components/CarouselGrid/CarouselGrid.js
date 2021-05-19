import React from 'react'
import SecondCarousel from '../SecondCarousel'
import './CarouselGrid.css'
import { nanoid } from "nanoid";
import { useSelector } from 'react-redux'
import AOS from 'aos';


const CarouselGrid = ({fetchUsers, userData }) => {

    const fetchedData = useSelector(state => state.data[2])
    const loader = useSelector(state => state.loading)

    if (fetchedData){
          var lastPlayed = fetchedData.data
}

return (
    <div className='carouselGridContainer'>
    <div className='artistsBody'>
        <div className='lastPlayedheader'>Last played songs</div>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                <SecondCarousel show={5} >
    
                    { loader === true ? <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div> : lastPlayed ? lastPlayed.map(data => {
                        return (
                            <div key={data.artist.id + nanoid()} data-aos="fade-left">
    
                                <div >
                                    <div className='slideContainer' style={{ padding: 8 }}>  
                                   <div className='imgContainer'>   <img className='roundedImg' src={data.album.cover_xl} alt="placeholder" style={{ width: '100%' }} /></div>
                                 <div className='titleDiv'>
                                    <p>{data.title}</p>
                                    <p className='artistName'>{data.artist.name}</p></div>
                                    </div>
                                </div>
    
                            </div>
                        )
                    }) : <div class='requesFailed'>FAILED, KINDLY RESTART APP</div>
                 }
                </SecondCarousel>
            </div>
     </div>
      </div>  )
}

export default CarouselGrid