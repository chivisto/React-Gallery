import React, { useState } from 'react';
import styled from 'styled-components';

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

export default function SearchPhotos() {
    const [query, setQuery] = useState(initialState);
    console.log(query);

    return (
        <>
            <Form>
                <label className="label" htmlFor="query">
                    {" "}
                </label>
                <Input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="button">
                    Search
                </Button>
            </Form>
        </>
    )
}
