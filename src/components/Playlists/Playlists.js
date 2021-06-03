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
import './Playlists.scss'
import { fetchPlaylistsPageData } from '../../redux'
import Button from '../Button/Button'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Playlists = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlaylistsPageData())
    }, [])

    const playlistsData = useSelector(state => state.playlistsPageData.data[0])
    if (playlistsData) {
        var myPlaylists = playlistsData.data
        console.log(myPlaylists, 'myPlaylists')
    }

    const recommendedPlaylistsData = useSelector(state => state.playlistsPageData.data[1])
    if (recommendedPlaylistsData) {
        var recommendedPlaylists = recommendedPlaylistsData.data
        console.log(recommendedPlaylists, 'recommendedPlaylists')
    }

    const playlistData = useSelector(state => state.playlist.data)
    const loader = useSelector(state => state.playlist.loading)
    const [show, setShow] = useState(false)
    const [select, setSelect] = useState('')
    const [tracklist, settracklist] = useState(null)
    // const [trackCount, setTrackCount] = useState(null)
    const [playTrack, setPlayTrack] = useState(false)
    const [trackId, setTrackId] = useState(null)
    const [playlistId, setPlaylistId] = useState('')
    const [playlistTrackId, setPlaylistTrackId] = useState('')
    const [audioPlaying, setAudioPlaying] = useState(false)
    var audioTune = new Audio(setTrackId);
    const [confirmDelete, setConfirmDelete] = useState(false)
const [playIcon, setPlayIcon] = useState(play)
    const [createPlayListModal, setCreatePlayListModal] = useState(false)
    const [playlistName, setplaylistName] = useState("")
    useEffect(() => {
        audioTune.load();
    }, [])

    console.log(trackId, 'trackId')


    const playSong = (song) => {
        if(!audioPlaying){
        setTrackId(song)
        setAudioPlaying(true)
     
    } else {
        setTrackId(null) 
        setAudioPlaying(false)
 
    }
    }

    const pauseSong = (song) => {
        audioTune = new Audio(song);
        console.log("pause");

        console.log(audioPlaying)
        audioTune.pause();
        setAudioPlaying(false);
    }
    
    const Player = () => (
        <AudioPlayer
          autoPlay
          src={trackId}
          onPlay={e => setPlayIcon(pause)}
          // other props here
        />
      );

    // const playSound = () => {
    //     audioTune.play();
    //     setPlayTrack(true)
    // }

    // // pause audio sound
    // const stopSound = () => {
    //     audioTune.pause();
    //     audioTune.currentTime = 0;
    //     setPlayTrack(false)
    // }

    useEffect(() => {
        AOS.init({
            duration: 1000
        })
    })

    const accessToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");


    console.log(playlistTrackId, 'playlistTrackId')
    console.log(playlistId, 'playlistId')
    console.log(accessToken, 'accessToken')

    function deleteTrack(playlistId, playlistTrackId) {
        if (playlistTrackId) {
            setConfirmDelete(true)
            axios.post('https://music-app-feeder.herokuapp.com/delete', {
                playlistId, playlistTrackId, accessToken
            })
                .then(response => {
                    const responseInfo = response

                })
                .catch(error => {
                    const errorMsg = error.message
                })
        }
    }

    const handleSubmit = (e) => {
        e.persist();
        const value = e.target.value;
        setplaylistName(value);
      }

    function submitPlaylist(e){
    e.preventDefault()
        axios.post('https://music-app-feeder.herokuapp.com/addPlaylist',{
    id, accessToken, playlistName
        })
        .then(response => {
            const responseInfo = response
            alert('PLAYLIST CREATED')
        })
        .catch(error => {
            const errorMsg = error.message
        })
    }
    console.log(playlistName)
    return (
        <div className='artistsContainer'>
            <LoggedInNav />
            <div className='artistsBody'>
                <div className='header'>Playlists</div>
                <div className='topArtistsContainer'>
                    {myPlaylists ? myPlaylists.map(playlist => {
                        return (
                            <div key={playlist.id}>
                                <Modal show={show} onClose={() => setShow(false)} title='Playlists'>
                                    <div className='fixedModalBar'>
                                        <div className='closeBtn'><div onClick={() => setShow(false)} className='closeContainer'><img className='closeImg' src={cancelButton} alt='' /></div></div>
                                        <div className='playlistModal-title'>{select} playlist</div>
                                        {confirmDelete ? <div class="loading loading08">
                                            <span data-text="D">D</span> <span data-text="E">E</span><span data-text="L">L</span><span data-text="E">E</span><span data-text="T">T</span><span data-text="I">I</span>
                                            <span data-text="N">N</span> <span data-text="G">G</span>
                                        </div> : null}

                                        <div className='playlistModal-createDiv'> {!loader ? <PlaylistModalButtons onClick={ ()=> setCreatePlayListModal(true)} songCount={`${playlistData.length} songs`} /> : null}</div> </div>
                                        
                                    {!loader ? playlistData.map((track, index) => {
                                        return (
                                            <div key={track.id} className='childrenContainer' >

                                                <div className='playlistModal-body' onMouseEnter={() =>playSong(track.preview)} onMouseLeave={()=> playSong(null)}>
                                                    <div className='modalListDiv' ><img className='deleteImg' src={deleteButton} alt='' onClick={() => { setPlaylistTrackId(track.id); deleteTrack(playlistId, track.id); setTimeout(() => { dispatch(fetchPlaylist(tracklist)); setConfirmDelete(false) }, 2000); }} /><img className='twndimg' src={track.artist.picture_xl} alt='' /></div> <div className='playListModalTittle'><div className='trackTitle'>{index + 1 + '.' + ' '}{track.title}</div> <div className='modalArtistName'>{track.artist.name}</div></div> <div className='playlistPlayDiv'><img className='playImg' src={play} onClick={() => playSong(track.preview)}  alt='' /> <img className='playlistLogoImg' src={playlistLogo} alt='' /></div>

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
                    }
                    ) : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>}
               
              
               </div>
               <div className='createPlaylist'><Button text="Create a playlist" className='createPlaylistButton' onClick={ ()=> setCreatePlayListModal(true)}/></div>
               <Modal show={createPlayListModal} onClose={() => setCreatePlayListModal(false)}>
            
               <div className='closeBtn'><div onClick={() => setCreatePlayListModal(false)} className='closeContainer'><img className='closeImg' src={cancelButton} alt='' /></div></div>
               <div className='addPlaylistModal'>
                 <form className='addPlaylistForm' onSubmit={submitPlaylist}>
                 <div className='playlistModal-title addplaylistHeader'>Create playlist</div>
             
                   <input className='name'
                id="name"
                name="name"
                placeholder='Playlist name'
                type="text"
                onChange={handleSubmit}
                value={playlistName} pattern="\S+.*" required/>
               
                <div className='addPlaylistButton'> <Button className='feedbackButton' text='Create' type='submit' /></div>
             


                </form>  </div> </Modal>
               
                <div className='musicPlayer'><Player /></div>
               
                <div className='header secondHeader'>Recommended Playlists</div>
                <div className='topArtistsContainer'>
                    {recommendedPlaylists ? recommendedPlaylists.map(recomplaylist => {
                        return (
                            <div key={recomplaylist.id}>
                                <div data-aos='fade-up' className='artistImgContainer'>
                                    <img src={recomplaylist.picture_xl} alt='' />
                                    <div className='albumCover'><img src={recomplaylist.picture_xl} alt='' />
                                        <div className='albumName'>{recomplaylist.title} </div>
                                    </div>
                                </div>

                                <div className='artistNameDiv'>{recomplaylist.title}</div>
                            </div>
                        )
                    }) : <div className='spinnerContainer'> <div className="lds-facebook"><div></div><div></div><div></div></div> </div>}
                </div>


            </div>
        </div>
    )
}

export default Playlists