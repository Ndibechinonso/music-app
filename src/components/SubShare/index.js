import React, { Component } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import SubShareCSS from "./CSS";

class SubShare extends Component {

  render() {

    const {
      url = String(window.location),
      title = "Steadylearner Website",
      size = "2.85rem",
    } = this.props;


    return (
      <SubShareCSS >

        <FacebookShareButton
          title={title}
          url={url}
        >
          <FacebookIcon
            size={size}

          />
        </FacebookShareButton>

      </SubShareCSS>
    );
  }
}

export default SubShare;

