import React, { useState, useEffect } from "react";
import "./Playlists.css";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "../LoggedInNav";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "../Modal/Modal";
import axios from "axios";
import { fetchPlaylist } from "../../redux";
import play from "../../Assets/play.png";
import pause from "../../Assets/pause.png";
import playlistLogo from "../../Assets/playlistLogo.png";
import cancelButton from "../../Assets/cancelButton.png";
import deleteButton from "../../Assets/deleteButton.png";
import PlaylistModalButtons from "../PlaylistModalButtons/PlaylistModalButtons";
import "./Playlists.scss";
import { fetchPlaylistsPageData } from "../../redux";
import Button from "../Button/Button";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../CarouselGrid/coupon.css";
import empty from "../../Assets/empty.png";

const Playlists = (props) => {

  const dispatch = useDispatch();

  const playOnHover = useSelector((state) => state.playOnHover.play);

  useEffect(() => {
    dispatch(fetchPlaylistsPageData());
  }, []);

  const playlistsData = useSelector((state) => state.playlistsPageData.data[0]);
  const playlistLoader = useSelector(
    (state) => state.playlistsPageData.loading
  );

  if (playlistsData) {
    var myPlaylists = playlistsData.data;
  }

  const recommendedPlaylistsData = useSelector(
    (state) => state.playlistsPageData.data[1]
  );
  if (recommendedPlaylistsData) {
    var recommendedPlaylists = recommendedPlaylistsData.data;
  }

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
  const [playIcon, setPlayIcon] = useState(play);
  const [createPlayListModal, setCreatePlayListModal] = useState(false);
  const [playlistName, setplaylistName] = useState("");
  const [trackTitle, setTrackTitle] = useState(null);
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [playlistDelAlert, setPlaylistDelAlert] = useState(false);
  const [playlistCreateAlert, setPlaylistCreateAlert] = useState(false);



 const playSong = (song) => {
    setAudioPlaying(true);
    setTrackId(song);
   
  };

  const autoPlaySong = (song) => {
    if (playOnHover) {
      setTrackId(song);
    } else {
      setTrackId(null);
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

  function stopPlay() {
    setTrackId(null);
    setTrackTitle(null);
    setAudioPlaying(false);
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const accessToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  function deleteTrack(playlistId, playlistTrackId) {
    if (playlistTrackId) {
      setConfirmDelete(true);
      axios
        .post("https://deezify-app-feeder.herokuapp.com/delete", {
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

  function clearPlaylistCreateAlert() {
    setTimeout(() => {
      setPlaylistCreateAlert(false);
    }, 3000);
  }

  function submitPlaylist(e) {
    e.preventDefault();
    axios
      .post("https://deezify-app-feeder.herokuapp.com/addPlaylist", {
        id,
        accessToken,
        playlistName,
      })
      .then((response) => {
        const responseInfo = response;
        setPlaylistCreateAlert(true);
        clearPlaylistCreateAlert();
        setplaylistName("");
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }

  const userData = useSelector((state) => state.userData.data[0]);

  function deletePlaylist() {
    if (userPlaylist == userData.name) {
      axios
        .post("https://deezify-app-feeder.herokuapp.com/deleteUserPlaylist", {
          playlistId,
          accessToken,
        })
        .then((response) => {
          const responseInfo = response;
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    } else {
      axios
        .post("https://deezify-app-feeder.herokuapp.com/deleteOtherPlaylists", {
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

  function clearPlaylistDelAlert() {
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
        {!playlistLoader && myPlaylists ? (
          myPlaylists.length < 1 ? (
            <div className="emptyDiv">
              <img src={empty} />{" "}
              <p>
                oops, seems like you dont have any data available. Click{" "}
                <a href="https://www.deezer.com/us/" target="_blank">
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
                              songCount={`${playlistData.length} songs`}
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
                                onMouseLeave={() => autoPlaySong(null)}
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
                                    src={track.artist.picture_xl}
                                    alt=""
                                  />
                                </div>{" "}
                                <div className="playListModalTittle">
                                  <div className="trackTitle">
                                    {index + 1 + "." + " "}
                                    {track.title}
                                  </div>{" "}
                                  <div className="modalArtistName">
                                    {track.artist.name}
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
                          <img src={playlist.picture_xl} alt="" />
                          <div className="albumCover">
                            <img src={playlist.picture_xl} alt="" />
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

        <div className="musicPlayer">
     
          {audioPlaying ? player(): null}
        </div>
        
        <div className="header secondHeader">Recommended Playlists</div>
        <div className="topArtistsContainer">
          {recommendedPlaylists ? (
            recommendedPlaylists.map((recomplaylist) => {
              return (
                <div key={recomplaylist.id}>
                  <div data-aos="fade-up" className="artistImgContainer">
                    <img src={recomplaylist.picture_xl} alt="" />
                    <div className="albumCover">
                      <img src={recomplaylist.picture_xl} alt="" />
                      <div className="albumName">{recomplaylist.title} </div>
                    </div>
                  </div>

                  <div className="artistNameDiv">{recomplaylist.title}</div>
                </div>
              );
            })
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
        </div>
      </div>
    </div>
  );
};

export default Playlists;
