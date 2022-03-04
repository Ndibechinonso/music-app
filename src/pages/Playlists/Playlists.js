import React, { useState, useEffect } from "react";
import "./Playlists.css";
import "./Playlists.scss";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "../../components/LoggedInNav";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import cancelButton from "../../Assets/cancelButton.png";
import { fetchPlaylistsPageData } from "../../redux";
import Button from "../../components/Button/Button";
import "react-h5-audio-player/lib/styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../components/CarouselGrid/coupon.css";
import empty from "../../Assets/empty.png";
import { useHistory } from "react-router-dom";

const Playlists = (props) => {

  const accessToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchPlaylistsPageData(accessToken, id));
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  let userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const { loading, playlists, recommendedPlaylistsData } = useSelector(
    (state) => state.playlistsPageData
  );
  const [select, setSelect] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [createPlayListModal, setCreatePlayListModal] = useState(false);
  const [playlistName, setplaylistName] = useState("");
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [playlistDelAlert, setPlaylistDelAlert] = useState(false);
  const [playlistCreateAlert, setPlaylistCreateAlert] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    if (playlists) {
      setMyPlaylists(playlists.data);
    }
  }, [playlists]);

  if (recommendedPlaylistsData) {
    var recommendedPlaylists = recommendedPlaylistsData.data;
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleSubmit = (e) => {
    const value = e.target.value;
    setplaylistName(value);
  };

  const clearPlaylistCreateAlert = () => {
    setTimeout(() => {
      setPlaylistCreateAlert(false);
    }, 3000);
  };

  const playlistActions = (action) => {
    dispatch(fetchPlaylistsPageData());
    if (action === "delete") {
      setPlaylistDelAlert(true);
      clearPlaylistDelAlert();
    } else {
      setPlaylistCreateAlert(true);
      clearPlaylistCreateAlert();
    }
  };
  const submitPlaylist = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/addPlaylist`, {
          id,
          accessToken,
          playlistName,
        })
        .then((response) => {
          setCreatePlayListModal(false);
          playlistActions("create");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylist = () => {
    if (userPlaylist === userData.name) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/deletePlaylist`, {
          playlistId,
          accessToken,
        })
        .then((response) => {
          playlistActions("delete");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}users/deleteOtherUsersPlaylist`,
          {
            playlistId,
            accessToken,
            id,
          }
        )
        .then((response) => {
          playlistActions("delete");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clearPlaylistDelAlert = () => {
    setTimeout(() => {
      setPlaylistDelAlert(false);
    }, 3000);
  };

  return (
    <div className="artistsContainer">
      {playlistCreateAlert ? (
        loading ? null : (
          <div className="deleteAlert">
            You have succesfully added {playlistName} playlist{" "}
          </div>
        )
      ) : null}
      {playlistDelAlert ? (
        loading ? null : (
          <div className="deleteAlert">
            You have succesfully deleted {select} playlist{" "}
          </div>
        )
      ) : null}
      <LoggedInNav />
      <div className="artistsBody">
        <div className="header">Playlists</div>
        {!loading && myPlaylists ? (
          myPlaylists?.length < 1 ? (
            <div className="emptyDiv">
              <img src={empty} alt="" />{" "}
              <p>
                oops, seems like you dont have any data available. Click{" "}
                <a
                  href="https://www.deezer.com/us/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                to go back to deezer and start streaming.
              </p>
            </div>
          ) : (<>
            <div className="topArtistsContainer">
              {myPlaylists.map((playlist) => {
                return (
                  <div key={playlist.id}>
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
                            history.push(`/playlist/${playlist.id}`);
                            setSelect(playlist.title);
                            setPlaylistId(playlist.id);
                          }}
                          title="click frame to preview playlist tracks"
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
    <div className="createPlaylist">
    <Button
      text="Create a playlist"
      className="createPlaylistButton"
      onClick={() => {
        setCreatePlayListModal(true);
        setplaylistName("");
      }}
    />
  </div>
  </>
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
            }}
          >
            <RiDeleteBin6Line className="delete" />
            <span className="del">Delete</span>
          </MenuItem>
        </ContextMenu>
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
              })}{" "}
            </div>
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
