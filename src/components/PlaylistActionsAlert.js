const PlaylistActionsAlert = (props) =>{

    return(
<>
{props.playing ? ( <div className="loading loading08">
                            <span data-text="P">P</span>
                            <span data-text="L">L</span>
                            <span data-text="A">A</span>
                            <span data-text="Y">Y</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G  </span>
                            <span data-text={props.track}>{props.track}</span>
                            <span data-text='-'>-  </span>
                            <span data-text={props.artist}>{props.artist}</span>
                          </div>): null}

{props.deleting ? (    <div className="loading loading08">
                            <span data-text="D">D</span>
                            <span data-text="E">E</span>
                            <span data-text="L">L</span>
                            <span data-text="E">E</span>
                            <span data-text="T">T</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G</span>
                          </div>): null}
</>
    )
}

export default PlaylistActionsAlert