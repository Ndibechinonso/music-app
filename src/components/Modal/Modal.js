import React from "react";
import "./Modal.css";

const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="playlistModal" onClick={props.onClose}>
            <div
                className="playlistModal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
