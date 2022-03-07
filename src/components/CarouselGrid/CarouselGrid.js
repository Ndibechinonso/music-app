import React, { useEffect, useState, useRef } from "react";
import SecondCarousel from "../SecondCarousel";
import "./CarouselGrid.css";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FaList } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import "./coupon.css";
import axios from "axios";
import empty from "../../Assets/empty.png";
import Loader from "../../components/Loader";


const CarouselGrid = () => {
  const itemEls = useRef(new Array())

  const accessToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  let userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const [trackId, setTrackId] = useState(null);
  const { loading, lastPlayedData, recommendedTracksData, playlistsData } = useSelector((state) => state.homePageData);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  if (lastPlayedData) {
    var lastPlayed = lastPlayedData.data;
  }

  if (recommendedTracksData) {
    var latestTracks = recommendedTracksData.data;
  }

  if (playlistsData) {
    var myPlaylists = playlistsData?.data;
    var createdPlaylists = myPlaylists?.filter(
      (playlist) => playlist.creator.name == userData.name
    );
  }

  const addTrack = (playlistId) => {
    if (trackId) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/addPlaylistTrack`, {
          playlistId,
          trackId,
          accessToken,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addFavTrack = (trackId) => {
    if (trackId) {
      axios
        .post("http://localhost:5000/users/addFavTrack", {
          trackId,
          id,
          accessToken,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  };

  return (
    <div className="carouselGridContainer">
   
      <div className="artistsBody">
        <h2 className="lastPlayedheader">Last played songs</h2>
        {!loading && lastPlayed ? (
          lastPlayed?.length < 5 ? (
            <div className="emptyDiv">
              <img src={empty} alt="no file" />
              <p>
                oops, seems like you dont have any data available. Click
                <a
                  href="https://www.deezer.com/us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                to go back to deezer and start streaming.
              </p>
            </div>
          ) : (
            <div
              style={{
                maxWidth: 1200,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 20,
              }}
              className="carousel-container"
            >
              <SecondCarousel show={5}>
                {lastPlayed?.map((data) => {
                  return (
                    <div
                      key={data.artist.id + nanoid()}
                      className="carousel-child"
                      data-aos="fade-left"
                    >
                      <div className="carousel-child" style={{ padding: 8 }}>
                        <div className="imgContainer">
                          
                          <img
                            className="roundedImg"
                            src={data.album.cover_small}
                            alt="placeholder"
                            style={{ width: "100%" }}
                          />
                          <div className="titleDiv">
                            <p className="trackName">{data.title}</p>
                            <p className="artistName">{data.artist.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </SecondCarousel>
            </div>
          )
        ) : <Loader />}
      </div>

      <div className="artistsBody">
        <h2 className="lastPlayedheader">Latest tracks</h2>
        <div
          style={{
            maxWidth: 1200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
          }}
          className="carousel-container"
        >
          <SecondCarousel show={5}>
            {latestTracks ? (
              latestTracks.map((track, index) => {
                return (
              
                  <ContextMenuTrigger
                  id='contextmenu'
                   key={track.id + nanoid()}
                 >      
                    <div
                      data-aos="fade-left"
                      className="carousel-child"
                      onContextMenu={() => setTrackId(track.id)}
                      // key={track.id}
                    >
               
                      <div className="carousel-child" style={{ padding: 8 }}>
                        <div className="imgContainer">
                          <img
                            className="roundedImg"
                            src={track.cover_small}
                            alt="placeholder"
                            style={{ width: "100%" }}
                          />
                          <div className="titleDiv">
                            <p className="trackName">{track.title}</p>
                            <p className="artistName">{track.artist.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </ContextMenuTrigger>
       
                    );
              })
            ) :<Loader />}
          </SecondCarousel>

          <ContextMenu id="contextmenu">
            <MenuItem onClick={() => addFavTrack(trackId)}>
              <IoHeartOutline className="watchlist" />
              <span>Add to favourite</span>
            </MenuItem>
            {createdPlaylists
              ? createdPlaylists.map((playListMenu) => {
                  return (
                    <MenuItem
                      key={playListMenu.id}
                      onClick={() =>addTrack(playListMenu.id)}
                    >
                      <FaList className="watchlist" />
                      <span>Add to {playListMenu.title}</span>
                    </MenuItem>
                  );
                })
              : null}
          </ContextMenu>
        </div>
      </div>
    </div>
  );
};

export default CarouselGrid;
