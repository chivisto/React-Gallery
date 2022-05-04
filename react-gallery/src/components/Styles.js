import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
  }
`;

export const WrapperImg = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const H1 = styled.h1`
  max-width: 70rem;
  margin: 4rem auto;
`;

export const Div = styled.div`
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

export const P = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;

export const Button = styled.button`
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
}
`;