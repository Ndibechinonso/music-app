import React from "react";
import Button from "../Button/Button";
import "./PlaylistModalButtons.css";

const PlaylistModalButtons = (props) => {
    return (
        <div className="playlistModalButtonsDiv">
            {/* <div className="createPlaylistDiv">
                <Button
                    text="Create playlist"
                    className="createPlaylistClass"
                    onClick={props.onClick}
                />
            </div>{" "} */}
            <div>
                <button className="numberCountClass" disabled>
                    {props.songCount}
                </button>
            </div>
        </div>
    );
};

export default PlaylistModalButtons;
