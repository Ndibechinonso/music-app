import React, { useEffect } from 'react'
import './HomePage.css'
import LoggedInNav from '../LoggedInNav'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from "nanoid";
 import CustomisedCarousel from '../CustomisedCarousel'
import CarouselGrid from '../CarouselGrid/CarouselGrid'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {fetchHomeData, fetchPlaylistsPageData} from '../../redux'

const HomePage = (props) => {
  
    useEffect(() => {
        AOS.init({
            duration: 1000
        })
    })

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchHomeData());
    }, []);

    useEffect(()=>{
        dispatch(fetchPlaylistsPageData())
        },[])
  
    const homePageData = useSelector(state => state.homePageData.data)
   console.log(homePageData, 'homePageData')
   const fetchedRecommendedData = useSelector(state => state.homePageData.data[0])
   console.log(fetchedRecommendedData, 'fetchedRecommendedData')
  
     if (fetchedRecommendedData) {
        var recommendedAlbums = fetchedRecommendedData.data
         console.log(recommendedAlbums, 'recommendedAlbums')
   }
    

    return (
        <div>
            <LoggedInNav />
             <div className='parentSlide'>
            
            <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showArrows={false} showThumbs={false}>
                        {recommendedAlbums ? recommendedAlbums.map(data => {
                            return (
                                <div key={data.artist.id + nanoid()} data-aos="fade-left">
                                    
                                        <div className='bgPicDiv' style={{ padding: 8, width: '100%' }} >

                                        <div className='newAlbumTittle'>
                                    <div className='newAlbumIntro'>New Album Released by</div>
                                    <div className='newAlbumArtist'>{data.artist.name}</div>
                                    </div>
                                            <img src={data.cover_xl} alt="placeholder" style={{ width: '100vw', height: '631px' }} className='bgPic' />
                                        </div>
                                   
                                </div>
                            )
                        })
                            : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>
                        }</Carousel>
                   

 <div className='carouselContainer'>
                <div className='recommendedAlbumsContainer' style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64}}>
                    <CustomisedCarousel show={3}>
                        {recommendedAlbums ? recommendedAlbums.map(data => {
                            return (
                                <div key={data.artist.id + nanoid()} data-aos="fade-left" className='slideDiv'>

                                        <div style={{ padding: 8 }} >
                                          <div className='albumGrid'><img src={data.cover_xl} alt="placeholder" style={{ width: '100%' }} />
                                            <div className='albumTitle'>{data.title}</div></div>
                                        </div>
                                        
                                </div>
                            )
                        })
                            : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>
                        }
                    </CustomisedCarousel>
                </div>
                </div> 

            </div> 

          <CarouselGrid /> 

        </div>

    );
};

export default HomePage;