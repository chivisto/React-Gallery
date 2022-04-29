import React, {useState, useEffect} from "react";
import {Heading} from './components/Heading'
import {Loader} from './components/Loader'
import {UnsplashImage} from './components/UnsplashImage'

import axios from "axios";

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
      <Loader />
      {images.map(image => (
        <UnsplashImage url={image.urls.thumb} key={image.id} />
      ))}
    </div>
  );
}

export default App;
