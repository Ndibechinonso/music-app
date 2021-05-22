import React, { Component } from "react";
import instagram from '../../Assets/instagram.png'
import {
  LinkedinShareButton,
  LinkedinIcon,
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

        <LinkedinShareButton
          title={title}
          url={url}
        >
          <LinkedinIcon
            size={size}

          />
        </LinkedinShareButton>

      </SubShareCSS>
    );
  }
}

export default SubShare;

