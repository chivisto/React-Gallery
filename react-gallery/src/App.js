import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import SearchPhotos from './components/searchPhotos';
import Heart from './components/Heart';

//Style
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
  grid-auto-rows: 300px;
`;

const H1 = styled.h1`
  max-width: 70rem;
  margin: 4rem auto;
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
      .get(`${apiURL}/photos/random?client_id=${apiKey}&count=10`)
      .then(res => setImages([...images, ...res.data]))
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
          {images.map(image => (<><UnsplashImage url={image.urls.thumb} key={image.id} /> <Heart /></>))}
        </WrapperImg>
      </InfiniteScroll>
    </div>
  );
}

export default App;
