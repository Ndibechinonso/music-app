import React, {useEffect} from 'react'
import './HomePage.css'
import LoggedInNav from '../LoggedInNav'
import { useSelector } from 'react-redux'

import { nanoid } from "nanoid";
import Carousel from '../Carousel'
import CarouselGrid from '../CarouselGrid/CarouselGrid'
 import AOS from 'aos';
 import 'aos/dist/aos.css';

const HomePage = (props) => {
    useEffect(()=>{
        AOS.init({
            duration: 1000
        })
    })
    const fetchedData = useSelector(state => state.userData.data[1])
    const fetchedData2 = useSelector(state => state.userData.data[7])
   
    console.log(fetchedData2, 'rectracks')


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