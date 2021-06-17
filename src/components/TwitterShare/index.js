import React, { Component } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

import SubShareCSS from "./CSS";

class TwitterShare extends Component {
  render() {
    const {
      url = "https://do-re-me.netlify.app/",
      title = "Deezer management app",
      size = "2.85rem",
    } = this.props;

    return (
      <SubShareCSS>
        <TwitterShareButton title={title} url={url}>
          <TwitterIcon size={size} />
        </TwitterShareButton>
      </SubShareCSS>
    );
  }
}

export default TwitterShare;
