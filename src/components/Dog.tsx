import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaHeartBroken } from 'react-icons/all';
import { useToasts } from 'react-toast-notifications';
import { dogTypes, favoriteObject } from '../types';

const imageTypes = ['jpg', 'jpeg', 'gif', 'JPG', 'png', 'PNG', 'jfif'];
const videoTypes = ['mp4', 'ogg'];

const isFavorite = (keyString: string) => {
    const localStore = localStorage.getItem('favoriteDogs') || '';
    if (localStore) {
        const parsed = JSON.parse(localStore);
        if (parsed[keyString]) {
            return true;
        }
        return false;
    }
    return false;
};

const Dog = ({ hostname, keyString, fileType }: dogTypes): JSX.Element => {
    const [hover, setHover] = useState(false);
    const [favourite, setFavourite] = useState(isFavorite(keyString));
    const { addToast } = useToasts();
    const handleFavoriteEvent = () => {
        const localStore = localStorage.getItem('favoriteDogs') || '';
        let parsed: favoriteObject = {};
        if (localStore) {
            parsed = JSON.parse(localStore);
        }
        // If key is found in map user has favorited this image and wants to un-favorite
        if (parsed[keyString]) {
            delete parsed[keyString];
            localStorage.setItem('favoriteDogs', JSON.stringify(parsed));
            setFavourite(false);
            addToast('You have removed this dog from your favorites', { appearance: 'info' });
            return;
        }
        // Else use the keyString as the map lookup and store newly updated obj in localStorage
        parsed[keyString] = {
            hostname,
            keyString,
            fileType,
        };
        localStorage.setItem('favoriteDogs', JSON.stringify(parsed));
        setFavourite(true);
        addToast('You have added this dog to your favorites', { appearance: 'success' });
    };

    // Handle Images
    if (imageTypes.includes(fileType)) {
        return (
            <DogContainer
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => handleFavoriteEvent()}
            >
                {hover && favourite && <HeartBroken />}
                {hover && !favourite && <Heart />}
                <img src={`https://${hostname}/${keyString}.${fileType}`} alt="Dog Image / Gif" />
            </DogContainer>
        );
    }

    // Handle Videos
    if (videoTypes.includes(fileType)) {
        return (
            <DogContainer
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => handleFavoriteEvent()}
            >
                {hover && favourite && <HeartBroken />}
                {hover && !favourite && <Heart />}
                <video src={`https://${hostname}/${keyString}.${fileType}`} autoPlay controls>
                    Your browser does not support the video tag
                </video>
            </DogContainer>
        );
    }

    // If unknown filetype Iframe
    return (
        <DogContainer
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleFavoriteEvent()}
        >
            {hover && favourite && <HeartBroken />}
            {hover && !favourite && <Heart />}
            <iframe src={`https://${hostname}/${keyString}.${fileType}`} title="Dog Image / Gif" />
        </DogContainer>
    );
};

const DogContainer = styled.div`
    position: relative;
    img,
    iframe,
    video {
        height: 400px;
        width: auto;
        padding: 10px;
        border: 0;
        border-radius: 40px;
        transition: transform 1s;
    }

    :hover {
        transform: scale(1.05);
    }
`;

const Heart = styled(FaHeart)`
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    color: red;
    opacity: 0.8;
`;

const HeartBroken = styled(FaHeartBroken)`
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    color: black;
    opacity: 0.8;
`;

export default Dog;
