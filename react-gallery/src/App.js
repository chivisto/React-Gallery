import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { saveAs } from 'file-saver';


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
    //console.log(download.urls.full)
    return download.urls.full;
  });

  const downloadImage = (index) => {
    var red = downloadURL[index];
     saveAs(red, 'image.jpg');    
 }
  
  const shareURL = images.map((share) => {
    //console.log(download.urls.full)
    return share.links.self;
  });
  
  const shareImage = (e) => {
    var green = shareURL[e];
    //Make this do something in a little 
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
          {images.map((image, index, e) =>
          (<>
            <Div>
              <Heart />
              <UnsplashImage url={image.urls.thumb} key={image.id} />
              <p className="like"> Amount of Likes ❤️ {image.likes}</p>
              <button onClick={ () => {downloadImage(index)}}>Download</button><br />
              <button onClick={ () => {shareImage(e)}}>Share</button>
            </Div>
          </>))}
        </WrapperImg>
      </InfiniteScroll>
    </div>
  );
}

export default App;
