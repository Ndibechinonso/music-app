import React, { useEffect } from "react";
import "./Genre.css";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "../../components/LoggedInNav";
import { nanoid } from "nanoid";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchGenresData } from "../../redux";

const Genres = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenresData());
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    });

    const {genreData, chartsData} = useSelector((state)=> state.genresPageData)
    
    if (genreData) {
        var genres = genreData.data;
    }
    if (chartsData) {
        var charts = chartsData.data;
    }

    return (
        <div className="artistsContainer">
            <LoggedInNav />
            <div className="artistsBody">
                <div className="header">Genres</div>
                <div>
                    {genres ? (
                        <div className="topArtistsContainer">
                       {genres.map((genre) => {
                            return (
                                <div key={genre.id + nanoid()}>
                                    <div data-aos="fade-up" className="artistImgContainer">
                                        <img src={genre.picture_small} alt="" />
                                        <div className="albumCover">
                                            <img src={genre.picture_small} alt="" />
                                            <div className="albumName">{genre.name} </div>
                                        </div>
                                    </div>
                                    <div className="artistNameDiv">{genre.name}</div>
                                </div>
                            );
                        })
                    }</div> ) : (
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
                <div className="header secondHeader">Charts</div>
                <div>
                    {charts ? (
                        <div className="topArtistsContainer">
                        {charts.map((chart) => {
                            return (
                                <div key={chart.id + nanoid()}>
                                    <div data-aos="fade-up" className="artistImgContainer">
                                        <img src={chart.album.cover_xl} alt="" />
                                        <div className="albumCover">
                                            <img src={chart.artist.picture_small} alt="" />
                                            <div className="albumName">{chart.artist.name} </div>
                                        </div>
                                    </div>
                                    <div className="artistNameDiv">{chart.album.title}</div>
                                </div>
                            );
                        })
                       } </div> ) : (
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

export default Genres;
