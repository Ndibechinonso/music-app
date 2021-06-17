import React, { useEffect, useState } from "react";
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

const CarouselGrid = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    });

    const [trackId, setTrackId] = useState(null);

    const fetchedLastPlayed = useSelector((state) => state.homePageData.data[1]);

    if (fetchedLastPlayed) {
        var lastPlayed = fetchedLastPlayed.data;
    }

    const fetchedRecommendedReleaseData = useSelector(
        (state) => state.homePageData.data[2]
    );

    if (fetchedRecommendedReleaseData) {
        var latestTracks = fetchedRecommendedReleaseData.data;
    }

    const userData = useSelector((state) => state.userData.data[0]);
    const playlistsData = useSelector((state) => state.playlistsPageData.data[0]);
    if (playlistsData) {
        var myPlaylists = playlistsData.data;
    }

    if (playlistsData) {
        var createdPlaylists = myPlaylists.filter(
            (playlist) => playlist.creator.name == userData.name
        );
    }

    const accessToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    
    const addTrack = (playlistId, trackId) => {
        if (trackId) {
            axios
                .post("https://deezify-app-feeder.herokuapp.com/addTrack", {
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

    function addFavTrack(trackId) {
        if (trackId) {
            axios
                .post("http://localhost:5000/addFavTrack", {
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
                <div className="lastPlayedheader">Last played songs</div>
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
                        {lastPlayed ? (
                            lastPlayed.map((data) => {
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
                                                    src={data.album.cover_xl}
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
                </div>
            </div>

            <div className="latestTracksBody">
                <div className="lastPlayedheader">Latest tracks</div>
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
                                                        src={track.cover_xl}
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
                        {playlistsData
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
