import "./Playlist.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlaylist } from "../../redux";
import { fetchPlaylistsPageData } from "../../redux";
import LoggedInNav from "../../components/LoggedInNav";
import play from "../../Assets/play.png";
import stop from "../../Assets/stop.png";
import playlistLogo from "../../Assets/playlistLogo.png";
import deleteButton from "../../Assets/deleteButton.png";
import AudioPlayer from "react-h5-audio-player";
import PlaylistModalButtons from "../../components/PlaylistModalButtons/PlaylistModalButtons";
import PlaylistActionsAlert from "../../components/PlaylistActionsAlert";

const Playlist = (props) => {
  const { id } = useParams();
  const accessToken = localStorage.getItem("token");
  const savedUserId = localStorage.getItem("userId");

  // const playlistData = useSelector((state) => state.playlist.data);
  const { playlists } = useSelector((state) => state.playlistsPageData);
  const playOnHover = useSelector((state) => state.playOnHover.play);
  const filterdPlaylist = playlists?.data?.filter(
    (playlist) => playlist.id == id
  );

  useEffect(() => {
    if (filterdPlaylist) {
      setSelect(filterdPlaylist?.[0]?.title);
    }
  }, [filterdPlaylist]);

  const selectedPlaylist = useSelector((state) => state.playlist.data);
  const loader = useSelector((state) => state.playlist.loading);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [trackId, setTrackId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [textLength, setTextLength] = useState(50);
  const [trackTitle, setTrackTitle] = useState(null);
  const [freshPlaylist, setFreshPlaylist] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [select, setSelect] = useState("");

  useEffect(() => {
    dispatch(fetchPlaylistsPageData(accessToken, savedUserId));
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlaylist(`https://api.deezer.com/playlist/${id}/tracks`));
  }, []);

  useEffect(() => {
    const freshPlaylistData = selectedPlaylist;
    setFreshPlaylist(freshPlaylistData);
  }, [selectedPlaylist]);

  const truncate = (str) => {
    return str.length > textLength ? str.substring(0, textLength) + "..." : str;
  };

  const autoPlaySong = (song) => {
    if (playOnHover) {
      setAudioPlaying(true);
      setTrackId(song);
    }
  };

  const stopPlay = () => {
    setTrackId(null);
    setTrackTitle(null);
    setAudioPlaying(false);
  };

  const playSong = (song) => {
    setAudioPlaying(true);
    setTrackId(song);
  };

  const player = () => (
    <AudioPlayer
      autoPlay
      src={trackId}
      // onPlay={(e) => setPlaying(true)}
      onEnded={(e) => setAudioPlaying(false)}
    />
  );

  const deleteTrack = (playlistId, playlistTrackId) => {
    if (playlistTrackId && accessToken) {
      setConfirmDelete(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/deletePlaylistTrack`, {
          playlistId,
          playlistTrackId,
          accessToken,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setTextLength(10);
      } else {
        setTextLength(50);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <LoggedInNav />
      <div className="fixedModalBar">
        {select ? (
          <div className="playlistModal-title">{select} playlist</div>
        ) : null}
        <PlaylistActionsAlert deleting={confirmDelete} />
        <PlaylistActionsAlert
          playing={audioPlaying}
          track={trackTitle}
          artist={artistName}
        />

        <div className="playlistModal-createDiv">
          <PlaylistModalButtons songCount={`${freshPlaylist?.length} songs`} />
        </div>

        {freshPlaylist?.map((track, index) => {
          return (
            <div key={track.id} className="childrenContainer">
              <div
                className="playlistModal-body"
                onMouseEnter={() => autoPlaySong(track.preview)}
                onMouseLeave={() => {
                  autoPlaySong(null);
                  playOnHover && setAudioPlaying(false);
                }}
              >
                <div className="modalListDiv">
                  <img
                    className="deleteImg"
                    src={deleteButton}
                    alt=""
                    onClick={() => {
                      setAudioPlaying(false);
                      deleteTrack(id, track.id);
                      setTimeout(() => {
                        dispatch(
                          fetchPlaylist(
                            `https://api.deezer.com/playlist/${id}/tracks`
                          )
                        );
                        setConfirmDelete(false);
                      }, 2000);
                    }}
                  />
                  <img
                    className="twndimg"
                    src={track.artist.picture_small}
                    alt=""
                  />
                </div>
                <div className="playListModalTittle">
                  <div className="trackTitle">
                    {index + 1 + ". "}
                    {truncate(track.title)}
                  </div>
                  <div className="modalArtistName">
                    {truncate(track.artist.name)}
                  </div>
                </div>
                <div className="playlistPlayDiv">
                  
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
                      setArtistName(track.artist.name);
                    }}
                    alt=""
                  />
                  <img className="playlistLogoImg" src={playlistLogo} alt="" />
                </div>
              </div>
            </div>
          );
        })}

        <div className="musicPlayer">{audioPlaying ? player() : null}</div>
      </div>
    </>
  );
};

export default Playlist;
