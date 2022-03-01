import React, { useState, useEffect } from "react";
import "./Playlists.css";
import "./Playlists.scss";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "../../components/LoggedInNav";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { fetchPlaylist } from "../../redux";
import play from "../../Assets/play.png";
import stop from "../../Assets/stop.png";
import playlistLogo from "../../Assets/playlistLogo.png";
import cancelButton from "../../Assets/cancelButton.png";
import deleteButton from "../../Assets/deleteButton.png";
import PlaylistModalButtons from "../../components/PlaylistModalButtons/PlaylistModalButtons";
import { fetchPlaylistsPageData } from "../../redux";
import Button from "../../components/Button/Button";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../components/CarouselGrid/coupon.css";
import empty from "../../Assets/empty.png";

const Playlists = (props) => {

  const dispatch = useDispatch();

  const playOnHover = useSelector((state) => state.playOnHover.play);
  
  let userDataString =localStorage.getItem("userData")
  const userData = JSON.parse(userDataString)
  const accessToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  
  const {loading, playlists, recommendedPlaylistsData} = useSelector((state) => state.playlistsPageData)
  const playlistData = useSelector((state) => state.playlist.data);
  const loader = useSelector((state) => state.playlist.loading);

  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("");
  const [tracklist, settracklist] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const [playlistId, setPlaylistId] = useState("");
  const [playlistTrackId, setPlaylistTrackId] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [createPlayListModal, setCreatePlayListModal] = useState(false);
  const [playlistName, setplaylistName] = useState("");
  const [trackTitle, setTrackTitle] = useState(null);
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [playlistDelAlert, setPlaylistDelAlert] = useState(false);
  const [playlistCreateAlert, setPlaylistCreateAlert] = useState(false);
  const [textLength, setTextLength] = useState(50);

  useEffect(() => {
    dispatch(fetchPlaylistsPageData());
  }, []);

  if (playlists) {
    var myPlaylists = playlists.data;
  }

  if (recommendedPlaylistsData) {
    var recommendedPlaylists = recommendedPlaylistsData.data;
  }

  const playSong = (song) => {
    setAudioPlaying(true);
    setTrackId(song);
  };

  const autoPlaySong = (song) => {
    if (playOnHover) {
      setAudioPlaying(true);
      setTrackId(song);
    } 
  };

  const player = () => (
    <AudioPlayer
      autoPlay
      src={trackId}
      // onPlay={(e) => setPlaying(true)}
      onEnded={(e) => setAudioPlaying(false)}
    />
  );

  const stopPlay = () => {
    setTrackId(null);
    setTrackTitle(null);
    setAudioPlaying(false);
  }

useEffect(() => {
  const handleResize = () => {
  if (window.innerWidth < 620){
    setTextLength(10)  
  }
  else{
    setTextLength(50)  
  }
}

window.addEventListener('resize', handleResize);

return () => {
  window.removeEventListener('resize', handleResize)
}},
[]);

const truncate = (str) => {
  return str.length > textLength ? str.substring(0, textLength) + "..." : str;
}

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const deleteTrack = (playlistId, playlistTrackId) => {
    if (playlistTrackId) {
      setConfirmDelete(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/deletePlaylistTrack`, {
          playlistId,
          playlistTrackId,
          accessToken,
        })
        .then((response) => {
          const responseInfo = response;
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    }
  }

  const handleSubmit = (e) => {
    const value = e.target.value;
    setplaylistName(value);
  };

  const clearPlaylistCreateAlert = () => {
    setTimeout(() => {
      setPlaylistCreateAlert(false);
    }, 3000);
  }

  const submitPlaylist = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/addPlaylist`, {
        id,
        accessToken,
        playlistName,
      })
      .then((response) => {
        const responseInfo = response;
        setPlaylistCreateAlert(true);
        clearPlaylistCreateAlert();
        setplaylistName("");
        setCreatePlayListModal(false)
        dispatch(fetchPlaylistsPageData())
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }

  const deletePlaylist = () => {
    if (userPlaylist === userData.name) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/deletePlaylist`, {
          playlistId,
          accessToken,
        })
        .then((response) => {
          const responseInfo = response;
          dispatch(fetchPlaylistsPageData());
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/deleteOtherUsersPlaylist`, {
          playlistId,
          accessToken,
          id,
        })
        .then((response) => {
          const responseInfo = response;
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    }
  }

  const clearPlaylistDelAlert = () => {
    setTimeout(() => {
      setPlaylistDelAlert(false);
    }, 3000);
  }

  return (
    <div className="artistsContainer">
      {playlistCreateAlert ? (
        <div className="deleteAlert">
          You have succesfully added {playlistName} playlist{" "}
        </div>
      ) : null}
      {playlistDelAlert ? (
        <div className="deleteAlert">
          You have succesfully deleted {select} playlist{" "}
        </div>
      ) : null}
      <LoggedInNav />
      <div className="artistsBody">
        <div className="header">Playlists</div>
        {!loading && myPlaylists ? (
          myPlaylists?.length < 1 ? (
            <div className="emptyDiv">
              <img src={empty} alt=''/>{" "}
              <p>
                oops, seems like you dont have any data available. Click{" "}
                <a href="https://www.deezer.com/us/" target="_blank" rel="noreferrer">
                  here
                </a>{" "}
                to go back to deezer and start streaming.
              </p>
            </div>
          ) : (
            <div className="topArtistsContainer">
              {myPlaylists.map((playlist) => {
                return (
                  <div key={playlist.id}>
                    <Modal
                      show={show}
                      onClose={() => {
                        setShow(false);
                        stopPlay();
                      }}
                    >
                      <div className="fixedModalBar">
                        <div className="closeBtn">
                          <div
                            onClick={() => {
                              setShow(false);
                              stopPlay();
                            }}
                            className="closeContainer"
                          >
                            <img
                              className="closeImg"
                              src={cancelButton}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="playlistModal-title">
                          {select} playlist
                        </div>
                        {confirmDelete ? (
                          <div className="loading loading08">
                            <span data-text="D">D</span>
                            <span data-text="E">E</span>
                            <span data-text="L">L</span>
                            <span data-text="E">E</span>
                            <span data-text="T">T</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G</span>
                          </div>
                        ) : null}
                        {audioPlaying ? (
                          <div className="loading loading08">
                            <span data-text="P">P</span>
                            <span data-text="L">L</span>
                            <span data-text="A">A</span>
                            <span data-text="Y">Y</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G</span>{" "}
                            <span data-text={trackTitle}>{trackTitle}</span>
                          </div>
                        ) : null}
                        
                        <div className="playlistModal-createDiv">
                          {" "}
                          {!loader ? (
                            <PlaylistModalButtons
                              onClick={() => setCreatePlayListModal(true)}
                              songCount={`${playlistData?.length} songs`}
                            />
                          ) : null}
                        </div>{" "}
                      </div>

                      {!loader ? (
                        playlistData.map((track, index) => {
                          return (
                            <div key={track.id} className="childrenContainer">
                              <div
                                className="playlistModal-body"
                                onMouseEnter={() => autoPlaySong(track.preview)}
                                onMouseLeave={() => {autoPlaySong(null); playOnHover && setAudioPlaying(false)}}
                              >
                                <div className="modalListDiv">
                                  <img
                                    className="deleteImg"
                                    src={deleteButton}
                                    alt=""
                                    onClick={() => {
                                      setPlaylistTrackId(track.id);
                                      setAudioPlaying(false);
                                      deleteTrack(playlistId, track.id);
                                      setTimeout(() => {
                                        dispatch(fetchPlaylist(tracklist));
                                        setConfirmDelete(false);
                                      }, 2000);
                                    }}
                                  />
                                  <img
                                    className="twndimg"
                                    src={track.artist.picture_small}
                                    alt=""
                                  />
                                </div>{" "}
                                <div className="playListModalTittle">
                                  <div className="trackTitle">
                                    {index + 1 + ". "}
                                    {truncate(track.title)}
                                  </div>{" "}
                                  <div className="modalArtistName">
                                    {truncate(track.artist.name)}
                                  </div>
                                </div>
                                <div className="playlistPlayDiv">
                                  {" "}
                                  <img
                                    className="stopImg"
                                    src={stop}
                                    onClick={stopPlay}
                                    alt=""
                                  />
                                  <img
                                    className="playImg"
                                    src={play}
                                    onClick={() => {
                                      playSong(track.preview);
                                      setTrackTitle(track.title);
                                    }}
                                    alt=""
                                  />
                                  <img
                                    className="playlistLogoImg"
                                    src={playlistLogo}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="spinnerModal">
                          {" "}
                          <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>{" "}
                        </div>
                      )}
                    </Modal>
                    <ContextMenuTrigger id="contextmenu">
                      <div
                        onContextMenu={() => {
                          setUserPlaylist(playlist.creator.name);
                          setPlaylistId(playlist.id);
                          setSelect(playlist.title);
                        }}
                      >
                        <div
                          data-aos="fade-up"
                          className="artistImgContainer"
                          onClick={() => {
                            setShow(true);
                            setSelect(playlist.title);
                            setPlaylistId(playlist.id);
                            settracklist(playlist.tracklist);
                            dispatch(fetchPlaylist(playlist.tracklist));
                          }}
                        >
                          <img src={playlist.picture_small} alt="" />
                          <div className="albumCover">
                            <img src={playlist.picture_small} alt="" />
                            <div className="albumName">{playlist.title} </div>
                          </div>
                        </div>

                        <div className="artistNameDiv">{playlist.title}</div>
                      </div>
                    </ContextMenuTrigger>{" "}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="spinnerContainer">
            {" "}
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>{" "}
          </div>
        )}

        <ContextMenu id="contextmenu">
          <MenuItem
            onClick={() => {
              deletePlaylist();
              setPlaylistDelAlert(true);
              clearPlaylistDelAlert();
            }}
          >
            <RiDeleteBin6Line className="delete" />
            <span className="del">Delete</span>
          </MenuItem>
        </ContextMenu>

        <div className="createPlaylist">
          <Button
            text="Create a playlist"
            className="createPlaylistButton"
            onClick={() => setCreatePlayListModal(true)}
          />
        </div>
        <Modal
          show={createPlayListModal}
          onClose={() => setCreatePlayListModal(false)}
        >
          <div className="closeBtn">
            <div
              onClick={() => setCreatePlayListModal(false)}
              className="closeContainer"
            >
              <img className="closeImg" src={cancelButton} alt="" />
            </div>
          </div>
          <div className="addPlaylistModal">
            <form className="addPlaylistForm" onSubmit={submitPlaylist}>
              <div className="playlistModal-title addplaylistHeader">
                Create playlist
              </div>

              <input
                className="name"
                id="name"
                name="name"
                placeholder="Playlist name"
                type="text"
                onChange={handleSubmit}
                value={playlistName}
                pattern="\S+.*"
                required
              />

              <div className="addPlaylistButton">
                {" "}
                <Button
                  className="feedbackButton"
                  text="Create"
                  type="submit"
                />
              </div>
            </form>{" "}
          </div>{" "}
        </Modal>

        <div className="musicPlayer">{audioPlaying ? player() : null}</div>

        <div className="header secondHeader">Recommended Playlists</div>
        <div>
          {recommendedPlaylists ? (
            <div className="topArtistsContainer">
            {recommendedPlaylists.map((recomplaylist) => {
              return (
                <div key={recomplaylist.id}>
                  <div data-aos="fade-up" className="artistImgContainer">
                    <img src={recomplaylist.picture_small} alt="" />
                    <div className="albumCover">
                      <img src={recomplaylist.picture_small} alt="" />
                      <div className="albumName">{recomplaylist.title} </div>
                    </div>
                  </div>

                  <div className="artistNameDiv">{recomplaylist.title}</div>
                </div>
              );
            })
          } </div>  ) : (
            <div className="spinnerContainer">
              {" "}
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
