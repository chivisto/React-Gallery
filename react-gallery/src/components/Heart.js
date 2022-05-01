import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Heart extends Component {
    state = { liked: false };
    toggle = () => {
        let localLiked = this.state.liked;

        localLiked = !localLiked;
        this.setState({ liked: localLiked });
    };
    render() {
        return (
            <div className="container">
                <center>
                    <div onClick={() => this.toggle()}>
                        {this.state.liked === false ? (
                            <FontAwesomeIcon icon={faHeart} color="red" border="1px solid black"/>
                        ) : (
                            <FontAwesomeIcon icon={faHeartBroken} color="red" border="1px solid black" />
                        )}
                    </div>
                </center>
            </div>
        );
    }
}

export default Heart;
