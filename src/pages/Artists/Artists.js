import React, { useEffect } from "react";
import "./Artists.css";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "../../components/LoggedInNav";
import { nanoid } from "nanoid";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchArtistsData } from "../../redux";
import empty from "../../Assets/empty.png";

const Artists = (props) => {
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtistsData());
    }, []);


    const {loading, artistsData, recommendedArtistsData} = useSelector((state) => state.artistsData)

    if (artistsData) {
        var myArtists = artistsData.data;
    }
    if (recommendedArtistsData) {
        var recommendedArtists = recommendedArtistsData.data;
    }

    return (
        <div className="artistsContainer">
            <LoggedInNav />
            <div className="artistsBody">
                <h2 className="header">My Top Artists</h2>
                {!loading && artistsData ? (
                    myArtists?.length < 1 ? (
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
                            {myArtists?.map((artist) => {
                                return (
                                    <div key={artist.id + nanoid()}>
                                        <div data-aos="fade-up" className="artistImgContainer">
                                            <img src={artist.picture_small} alt="" />
                                            <div className="albumCover">
                                                <img src={artist.picture_small} alt="" />
                                                <div className="albumName">{artist.name} </div>
                                            </div>
                                        </div>
                                        <div className="artistNameDiv">{artist.name}</div>
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

                <div className="header secondHeader">Recomended Artists</div>
                <div>
                    {recommendedArtists ? (
                        <div className="topArtistsContainer">
                       { recommendedArtists.map((artist) => {
                            return (
                                <div key={artist.id + nanoid()}>
                                    <div data-aos="fade-up" className="artistImgContainer">
                                        <img src={artist.picture_small} alt="" />
                                        <div className="albumCover">
                                            <img src={artist.picture_small} alt="" />
                                            <div className="albumName">{artist.name} </div>
                                        </div>
                                    </div>

                                    <div className="artistNameDiv">{artist.name}</div>
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

export default Artists;
