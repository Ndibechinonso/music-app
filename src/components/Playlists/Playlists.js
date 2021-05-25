import React, { useState, useEffect } from 'react'
import './Playlists.css'
import { useSelector, useDispatch } from 'react-redux'
import LoggedInNav from '../LoggedInNav'
import AOS from 'aos'
import 'aos/dist/aos.css';
import Modal from '../Modal/Modal'
import axios from 'axios'
import { fetchPlaylist } from '../../redux'
import play from '../../Assets/play.png'
import pause from '../../Assets/pause.png'
import playlistLogo from '../../Assets/playlistLogo.png'
import cancelButton from '../../Assets/cancelButton.png'
import deleteButton from '../../Assets/deleteButton.png'
import PlaylistModalButtons from '../PlaylistModalButtons/PlaylistModalButtons'

const Playlists = (props) => {
    const dispatch = useDispatch()
    const playlistData = useSelector(state => state.playlist.data)
    const loader = useSelector(state => state.playlist.loading)
    const [show, setShow] = useState(false)
    const [select, setSelect] = useState('')
    const [tracklist, settracklist] = useState(null)
    const [trackCount, setTrackCount] = useState(null)
    const [playTrack, setPlayTrack] = useState(false)
    const [trackId, setTrackId] = useState('')
    const [playlistId, setPlaylistId] = useState('')
    const [playlistTrackId, setPlaylistTrackId] = useState('')

    const audioTune = new Audio(`${trackId}`);
  
    useEffect(() => {
        audioTune.load();
    }, [])
  
console.log(tracklist, 'tracklist')
        const playSound = () => {
            audioTune.play();
            setPlayTrack(true)
        }

        // pause audio sound
        const stopSound = () => {
            audioTune.pause();
            audioTune.currentTime = 0;
            setPlayTrack(false)
          }
     

    useEffect(() => {
        AOS.init({
            duration: 1000
        })
    })

    useEffect(async () => {
        if (tracklist) {
            console.log(tracklist, 'tracklist')
            localStorage.setItem('playlistUrl', tracklist)
        }
    })

    const fetchedData = useSelector(state => state.userData.data[9])
    const fetchedData2 = useSelector(state => state.userData.data[10])
    const accessToken = useSelector(state => state.userData.data[11])


    if (fetchedData) {
        var playlists = fetchedData.data
    }

    if (fetchedData2) {
        var recomplaylists = fetchedData2.data
        console.log(recomplaylists, 'recomplaylists')
    }

    const requestOptions = {
        headers: { "Content-Type": "application/json" },
        body: {
            playlistId: {playlistId},  
            playlistTrackId: {playlistTrackId},
            accessToken: {accessToken}
 }, };

      console.log({playlistId}, 'playlistId')
      console.log({playlistTrackId}, 'playlistTrackId')
      console.log({accessToken}, 'accessToken')

//     function deleteTrack(){
//         axios.post('http://localhost:5000/users', requestOptions.body )
//         .then(response => {
//             const responseInfo = response
//  } )
//           .catch(error => {
//             const errorMsg = error.message
//           })
          
//     }

    return (
        <div className='artistsContainer'>
            <LoggedInNav />
            <div className='artistsBody'>
                <div className='header'>Playlists</div>
                <div className='topArtistsContainer'>
                    {playlists && playlists.map(playlist => {
                        return (
                            <div key={playlist.id}>
                                <Modal show={show} onClose={() => setShow(false)} title='Playlists'>
                                    <div className='closeBtn'><div onClick={() => setShow(false)} className='closeContainer'><img className='closeImg' src={cancelButton} alt='' /></div></div>
                                    <div className='playlistModal-title'>{select} playlist</div>
                                    <div className='playlistModal-createDiv'> {!loader ? <PlaylistModalButtons songCount={`${playlistData.length} songs`}/> : null}</div>
                                    {!loader ? playlistData.map(track => {
                                        return (
                                            <div key={track.id} className='childrenContainer' >

                                                <div className='playlistModal-body'>
                                                    <div className='modalListDiv'><img className='deleteImg' src={deleteButton} alt='' onClick={()=> {setPlaylistTrackId(track.id)}} /><img className='twndimg' src={track.artist.picture_xl} alt='' /></div> <div className='playListModalTittle'><div>{track.title}</div> <div>{track.artist.name}</div></div> <div className='playlistPlayDiv'><img className='playImg' src={play} onClick={() => { setTrackId(track.preview); playSound()}} alt='' /> <img className='playImg' src={pause} onClick={() => { setTrackId(track.preview); stopSound()}} alt='' /> <img className='playlistLogoImg' src={playlistLogo} alt='' /></div>

                                                </div>
                                            </div>
                                        )
                                    }) : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>}

                                </Modal>
                                <div data-aos='fade-up' className='artistImgContainer' onClick={() => { setShow(true); setSelect(playlist.title); setPlaylistId(playlist.id); settracklist(playlist.tracklist); dispatch(fetchPlaylist(playlist.tracklist)) }}>
                                    <img src={playlist.picture_xl} alt='' />
                                    <div className='albumCover'><img src={playlist.picture_xl} alt='' />
                                        <div className='albumName'>{playlist.title} </div>
                                    </div>
                                </div>

                                <div className='artistNameDiv'>{playlist.title}</div>
                            </div>
                        )
                    })}
                </div>

                <div class='header secondHeader'>Recommended Playlists</div>
<div className='topArtistsContainer'>
            { recomplaylists && recomplaylists.map(recomplaylist =>{
        return(
        <div>
        <div data-aos='fade-up' className='artistImgContainer' key={recomplaylist.id}>
            <img src={recomplaylist.picture_xl} alt='' />
            <div className='albumCover'><img src={recomplaylist.picture_xl} alt='' />
            <div className='albumName'>{recomplaylist.title} </div>
            </div>
            </div>

            <div className='artistNameDiv'>{recomplaylist.title}</div>
</div>
        )
    })}
</div>
            </div>
        </div>
    )
}

export default Playlists