import React, { useEffect, useState } from "react";
import SecondCarousel from "../SecondCarousel";
import "./CarouselGrid.css";
import { fetchPlaylistsPageData } from "../../redux";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FaList } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import "./coupon.css";
import axios from "axios";
import empty from "../../Assets/empty.png";

const CarouselGrid = () => {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    let userDataString =localStorage.getItem("userData")
    const userData = JSON.parse(userDataString)
    const [trackId, setTrackId] = useState(null);

    const {loading, lastPlayedData, recommendedTracksData, playlistsData} = useSelector((state) => state.homePageData)

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

    const addTrack = (playlistId, trackId) => {
        if (trackId) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}users/addPlaylistTrack`, {
                    playlistId,
                    trackId,
                    accessToken,
                })
                .then((response) => {
                    const responseInfo = response;
                })
                .catch((error) => {
                    const errorMsg = error.message;
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
                    const responseInfo = response;
                })
                .catch((error) => {
                    const errorMsg = error.message;
                });
        }
    }

    return (
        <div className="carouselGridContainer">
            <div className="artistsBody">
                <h2 className="lastPlayedheader">Last played songs</h2>
                {!loading && lastPlayed ? (
                    lastPlayed?.length < 5 ? (
                        <div className="emptyDiv">
                            <img src={empty} alt='no file'/>{" "} 
                            <p>
                                oops, seems like you dont have any data available. Click{" "}
                                <a href="https://www.deezer.com/us/" target="_blank" rel="noopener noreferrer">
                                    here
                                </a>{" "}
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
                            className="test"
                        >
                            <SecondCarousel show={5}>
                                {lastPlayed?.map((data) => {
                                    return (
                                        <div
                                            key={data.artist.id + nanoid()}
                                            className="testKid"
                                            data-aos="fade-left"
                                        >
                                            <div className="testKid" style={{ padding: 8 }}>
                                                <div className="imgContainer">
                                                    {" "}
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

            <div className="latestTracksBody">
                <h2 className="lastPlayedheader">Latest tracks</h2>
                <div
                    style={{
                        maxWidth: 1200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 20,
                    }}
                    className="test"
                >
                    <SecondCarousel show={5}>
                        {latestTracks ? (
                            latestTracks.map((track) => {
                                return (
                                    <ContextMenuTrigger
                                        id="contextmenu"
                                        key={track.id + nanoid()}
                                    >
                                        <div
                                            data-aos="fade-left"
                                            className="testKid"
                                            onContextMenu={() => setTrackId(track.id)}
                                        >
                                            <div className="testKid" style={{ padding: 8 }}>
                                                <div className="imgContainer">
                                                    {" "}
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
                    </SecondCarousel>

                    <ContextMenu id="contextmenu">
                        <MenuItem onClick={addFavTrack(trackId)}>
                            <IoHeartOutline className="watchlist" />
                            <span>Add to favourite</span>
                        </MenuItem>
                        {createdPlaylists
                            ? createdPlaylists.map((playListMenu) => {
                                return (
                                    <MenuItem
                                        key={playListMenu.id}
                                        onClick={addTrack(playListMenu.id, trackId)}
                                    >
                                        <FaList className="watchlist" />
                                        <span>Add to {playListMenu.title}</span>
                                    </MenuItem>
                                );
                            })
                            : null}{" "}
                    </ContextMenu>
                </div>
            </div>
       
        </div> 
    );
};

export default CarouselGrid;
