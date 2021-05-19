import React, { useEffect } from 'react'
import './HomePage.css'
import LoggedInNav from '../LoggedInNav'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { nanoid } from "nanoid";
import Carousel from '../Carousel'
import CarouselGrid from '../CarouselGrid/CarouselGrid'
 import {fetchUsers} from '../../redux'
 import AOS from 'aos';


const HomePage = (props) => {
 
    const fetchedData = useSelector(state => state.data[1])


    if (fetchedData){
          var recommendedAlbums = fetchedData.data
}

    return (
   
        <div>
            <LoggedInNav />
            <div className='recommendedAlbumsContainer' style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Carousel show={3} >
           
            {  recommendedAlbums ? recommendedAlbums.map(data => {
          return (
              <div key={data.artist.id + nanoid()} data-aos="fade-left">

                <div>
                    <div style={{ padding: 8 }}>
                        <img src={data.cover_xl} alt="placeholder" style={{ width: '50%' }} />
                    </div>
                </div>
               
            </div>
            )

        }) 
        
        : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>
        }

            </Carousel>
        </div> 


<CarouselGrid />
        </div>
 
    );
};

export default HomePage;