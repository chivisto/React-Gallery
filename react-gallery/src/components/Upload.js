import React from "react";
import styled from "styled-components";

const Div = styled.div`
    margin: 0 auto;
`;
const H3 = styled.h3`
    padding-bottom: 5px;
`;

const P = styled.p`
    padding-bottom: 5px;
`;

export const FileUpload = () => {

    const [file, setFile] = React.useState("");

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }

    const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name} width="267px" height="331px" />;
    };

    return (
        <Div id="upload-box">
            <H3>Upload Image:</H3>
            <input type="file" onChange={handleUpload} />
            <P>File Name: {file.name}</P>
            <p>{file && <ImageThumb image={file} />}</p>
        </Div>
    );
}


