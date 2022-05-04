import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { saveAs } from 'file-saver';

import { FacebookShareButton, RedditShareButton, TwitterShareButton, FacebookIcon, RedditIcon, TwitterIcon } from "react-share";

import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import SearchPhotos from './components/searchPhotos';
import Heart from './components/Heart';
import { FileUpload } from './components/Upload';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
  }
`;

const WrapperImg = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const H1 = styled.h1`
  max-width: 70rem;
  margin: 4rem auto;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  height: auto;
  width: 100%;
  position: relative;
  padding: 1%;
  border: 2px solid transparent;
  border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  border-image-slice: 1;
`;

const P = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;


function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = () => {
    const apiURL = "https://api.unsplash.com";
    const apiKey = "uXbbsQH1xTfKD32n9VZGycYFyH20yIQpSJFha1aAv7s";
    axios
      .get(`${apiURL}/photos/random?client_id=${apiKey}&count=1`)
      .then(res => setImages([...images, ...res.data]))
  }

  const downloadURL = images.map((download) => {
    return download.urls.full;
  });

  const downloadImage = (index) => {
    var red = downloadURL[index];
    saveAs(red, 'image.jpg');
  }

  return (
    <div className="App">
      <Heading />
      <GlobalStyle />
      <SearchPhotos />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <H1>Main Feed:</H1>
        <WrapperImg>
          <FileUpload />
          {images.map((image, index) =>
          (<>
            <Div>
              <Heart />
              <UnsplashImage url={image.urls.thumb} key={image.id} />
              <p className="user"> Photo shot by: {image.user.name}</p><br />
              <button onClick={() => { downloadImage(index) }}>Download</button><br />
              <p>Share:</p><br/>
              <P>
              <FacebookShareButton url={image.links.html} quote={"Check out this awesome image!"}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={image.links.html} quote={"Check out this awesome image!"}>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <RedditShareButton url={image.links.html} quote={"Check out this awesome image!"}>
                <RedditIcon size={40} round={true} />
              </RedditShareButton>
              </P>
            </Div>
          </>))}
        </WrapperImg>
      </InfiniteScroll>
    </div>
  );
}

export default App;
