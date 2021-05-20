import React, {useEffect} from 'react'
import './Genre.css'
import { useSelector } from 'react-redux'
import LoggedInNav from '../LoggedInNav'
import { nanoid } from "nanoid";
import AOS from 'aos'
import 'aos/dist/aos.css';

const Artists = (props) => {

    useEffect(()=>{
        AOS.init({
            duration: 1000
        })
    })

        const fetchedData = useSelector(state => state.data[5])
        const fetchedData2 = useSelector(state => state.data[6])
        
        if (fetchedData){
              var genres = fetchedData.data
   }

 if (fetchedData2){
              var charts = fetchedData2.data
              console.log(charts, 'charts')
 }


    return (
        <div className='artistsContainer'>
            <LoggedInNav />
            <div className='artistsBody'>
            <div class='header'>Genres</div>
            <div className='topArtistsContainer'>
                { genres && genres.map(genre =>{
            return(
            <div>
            <div data-aos='fade-up' className='artistImgContainer' key={genre.id + nanoid()}>
                <img src={genre.picture_xl} alt='' />
                <div className='albumCover'><img src={genre.picture_xl} alt='' />
                <div className='albumName'>{genre.name} </div>
                </div>
                </div>

                <div className='artistNameDiv'>{genre.name}</div>
</div>

            )
        })}


   </div>
            <div class='header secondHeader'>Charts</div>
 <div className='topArtistsContainer'>
                { charts && charts.map(chart =>{
            return(
            <div>
            <div data-aos='fade-up' className='artistImgContainer' key={chart.id + nanoid()}>
                <img src={chart.album.cover_xl} alt='' />
                <div className='albumCover'><img src={chart.artist.picture_xl} alt='' />
                <div className='albumName'>{chart.artist.name} </div>
                </div>
                </div>

                <div className='artistNameDiv'>{chart.album.title}</div>
</div>

            )
        })}


   </div>







        </div>
  </div>
    )
}

export default Artists

