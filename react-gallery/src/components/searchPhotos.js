import React, { useState } from 'react';
import styled from 'styled-components';
import Unsplash, { toJson } from "unsplash-js";
import { Loader } from './Loader';

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
    grid-auto-rows: 300px;
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
                    placeholder={`Search..."`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="button">
                    Search
                </Button>
            </Form>
            <H2>Search Results:</H2>
            <WrapperImg className="card-list">
                {pics.map((pic) => <div className="card" key={pic.id}>
                    <Img
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.full}
                    ></Img>
                </div>)}
            </WrapperImg>
        </>
    )
}
