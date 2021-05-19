import React from 'react'
import './Artists.css'
import { useSelector } from 'react-redux'
import LoggedInNav from '../LoggedInNav'
import { nanoid } from "nanoid";

const Artists = (props) => {

        const fetchedData = useSelector(state => state.data[3])
        const fetchedData2 = useSelector(state => state.data[4])
        if (fetchedData){
              var favoriteArtist = fetchedData.data
   }

 if (fetchedData2){
              var recommendedArtist = fetchedData2.data
 }


    return (
        <div className='artistsContainer'>
            <LoggedInNav />
            <div className='artistsBody'>
            <div class='header'>My Top Artists</div>
            <div className='topArtistsContainer'>
                { favoriteArtist && favoriteArtist.map(artist =>{
            return(
            <div>
            <div className='artistImgContainer' key={artist.id + nanoid()}>
                <img src={artist.picture_xl} alt='' />
                <div className='albumCover'><img src={artist.picture_xl} alt='' />
                <div className='albumName'>{artist.name} </div>
                </div>
                </div>

                <div className='artistNameDiv'>{artist.name}</div>
</div>

            )
        })}


   </div>
            <div class='header secondHeader'>Recomended Artists</div>
 <div className='topArtistsContainer'>
                { recommendedArtist && recommendedArtist.map(artist =>{
            return(
            <div>
            <div className='artistImgContainer' key={artist.id + nanoid()}>
                <img src={artist.picture_xl} alt='' />
                <div className='albumCover'><img src={artist.picture_xl} alt='' />
                <div className='albumName'>{artist.name} </div>
                </div>
                </div>

                <div className='artistNameDiv'>{artist.name}</div>
</div>

            )
        })}


   </div>







        </div>
  </div>
    )
}

export default Artists

