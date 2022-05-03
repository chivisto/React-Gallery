import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Div = styled.div`
    width: auto;
    height: auto;
    position: absolute;
    background-color: white;
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
            <div className="container">
                <Div onClick={() => this.toggle()}>
                    {this.state.liked === false ? (
                        <FontAwesomeIcon icon={faHeartBroken} color="black" border="1px solid black" />
                    ) : (
                        <FontAwesomeIcon icon={faHeart} color="red" border="1px solid black" />
                    )}
                </Div>
            </div>
        );
    }
}

export default Heart;
