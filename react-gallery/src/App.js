import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { saveAs } from 'file-saver';
import { GlobalStyle, WrapperImg, H1, Div, P, Button} from './components/Styles';
import { FacebookShareButton, RedditShareButton, TwitterShareButton, FacebookIcon, RedditIcon, TwitterIcon } from "react-share";
import axios from 'axios';
import SearchPhotos from './components/searchPhotos';
import Heart from './components/Heart';
import { FileUpload } from './components/Upload';


function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = () => {
    const apiURL = "https://api.unsplash.com";
    const apiKey = "uXbbsQH1xTfKD32n9VZGycYFyH20yIQpSJFha1aAv7s";
    axios
      .get(`${apiURL}/photos/random?client_id=${apiKey}&count=5`)
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
              <p> Photo shot by: {image.user.name}</p><br />
              <Button onClick={() => { downloadImage(index) }}>Download</Button><br />
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
