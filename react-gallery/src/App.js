import React, {useState, useEffect} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';
import {UnsplashImage} from './components/UnsplashImage';


import axios from 'axios';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

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


function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const apiURL = "https://api.unsplash.com";
    const apiKey = "uXbbsQH1xTfKD32n9VZGycYFyH20yIQpSJFha1aAv7s";
    axios
    .get(`${apiURL}/photos/random?client_id=${apiKey}&count=10`)
    .then(res => setImages([...images, ...res.data]))
  }, [])

  return (
    <div className="App">
      <Heading />
      <GlobalStyle />
      <Loader />
      <WrapperImg>
        {images.map(image => (
          <UnsplashImage url={image.urls.thumb} key={image.id} />
        ))}
      </WrapperImg>
    </div>
  );
}

export default App;
