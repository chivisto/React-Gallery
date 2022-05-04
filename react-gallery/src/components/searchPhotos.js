import React, { useState } from 'react';
import styled from 'styled-components';
import Unsplash, { toJson } from "unsplash-js";
import Heart from './Heart';
import saveAs from 'file-saver';
import { FacebookShareButton, RedditShareButton, TwitterShareButton, FacebookIcon, RedditIcon, TwitterIcon } from "react-share";


const Form = styled.form`
    max-width: 70rem;
    border-radius: 5xp;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    width: 35%;
    border-radius: 5px;
    padding: 3px;
    margin-left: 3px;
    margin-right: 3px; 
    border: 1px solid gray;
`;

const Button = styled.button`
    color: white;
    background-color: gray;
    border-radius: 5px;
    padding: 5px;
    border: none;
`;

const WrapperImg = styled.section`
max-width: 70rem;
margin: 4rem auto;
display: grid;
grid-gap: 1em;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const H2 = styled.h2`
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
`
const P = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const Button1 = styled.button`
border-radius: 5px;
border: none;
padding: 5px;
width: 50%;
display: flex;
justify-content: center;
margin-left: 25%;
margin-right: 25%;
margin-top: 5.5px;
color: #293241;
background-color: #D3F6DB;
:hover{
    background-color: #258ea6;
    color: white;
    cursor: pointer;
}
  `;



export default function SearchPhotos() {
    const unsplash = new Unsplash({
        accessKey: 'uXbbsQH1xTfKD32n9VZGycYFyH20yIQpSJFha1aAv7s',
    });

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    console.log(query);

    const searchPhotos = async (e) => {
        e.preventDefault();

        unsplash.search
            .photos(query, 1, 20)
            .then(toJson)
            .then((json) => {
                setPics(json.results);
            });
    };
    const downloadURL = pics.map((download) => {
        return download.urls.full;
    });

    const downloadImage = (index) => {
        var red = downloadURL[index];
        saveAs(red, 'image.jpg');
    }
    return (
        <>
            <Form className='form' onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                </label>
                <Input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Search...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="button">
                    Search
                </Button>
            </Form>
            <H2>Search Results:</H2>
            <WrapperImg>
                {pics.map((pic, index) => <Div key={pic.id}>
                    <Heart />
                    <Img
                        alt={pic.alt_description}
                        src={pic.urls.full}
                    ></Img>
                    <p className="like" margin-bottom="30px"> Photo shot by: {pic.user.name}</p>
                    <Button1 onClick={() => { downloadImage(index) }}>Download</Button1><br />
                    <p>Share:</p><br />
                    <P>
                        <FacebookShareButton url={pic.links.html} quote={"Check out this awesome image!"}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={pic.links.html} quote={"Check out this awesome image!"}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                        <RedditShareButton url={pic.links.html} quote={"Check out this awesome image!"}>
                            <RedditIcon size={40} round={true} />
                        </RedditShareButton>
                    </P>
                </Div>)}
            </WrapperImg>
        </>
    )
}
