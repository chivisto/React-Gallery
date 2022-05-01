import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Div = styled.div`
    width: 15px;
    height: 15px;
    position: relative;
`;

class Heart extends Component {
    state = { liked: false };
    toggle = () => {
        let localLiked = this.state.liked;

        localLiked = !localLiked;
        this.setState({ liked: localLiked });
    };
    render() {
        return (
            <Div className="container">
                <center>
                    <div onClick={() => this.toggle()}>
                        {this.state.liked === false ? (
                            <FontAwesomeIcon icon={faHeartBroken} color="black" border="1px solid black" />
                        ) : (
                            <FontAwesomeIcon icon={faHeart} color="red" border="1px solid black"/>
                        )}
                    </div>
                </center>
            </Div>
        );
    }
}

export default Heart;
