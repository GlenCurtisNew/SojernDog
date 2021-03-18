import React from 'react';
import styled from 'styled-components';

const imageTypes = ['jpg', 'jpeg', 'gif', 'JPG', 'png', 'PNG'];

const Dog = ({ hostname, keyString, fileType }: any) => {
    if (imageTypes.includes(fileType)) {
        return (
            <DogContainer>
                <img src={`https://${hostname}/${keyString}.${fileType}`} alt="Dog Image / Gif" />
            </DogContainer>
        );
    }

    console.log('fileType', fileType);

    return (
        <DogContainer>
            <iframe src={`https://${hostname}/${keyString}.${fileType}`} title="Dog Image / Gif" />
        </DogContainer>
    );
};

const DogContainer = styled.div`
    img,
    iframe {
        height: 400px;
        width: auto;
        padding: 10px;
        border: 0;
        border-radius: 40px;
    }
`;

export default Dog;
