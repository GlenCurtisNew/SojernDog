import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaHeartBroken } from 'react-icons/all';
import { useToasts } from 'react-toast-notifications';
import { dogTypes } from '../types';
import { parseFavorites } from '../helpers/localStorage';

const imageTypes = ['jpg', 'jpeg', 'gif', 'JPG', 'png', 'PNG', 'jfif'];
const videoTypes = ['mp4', 'ogg'];

const isFavorite = (keyString: string) => {
    const localStore = localStorage.getItem('favoriteDogs') || '';
    if (localStore) {
        const parsed = JSON.parse(localStore);
        // Check if key exists on parsed, return true / false
        return !!parsed[keyString];
    }
    return false;
};

const Dog = ({ hostname, keyString, fileType, setFavoriteState }: dogTypes): JSX.Element => {
    const [hover, setHover] = useState(false);
    const [favourite, setFavourite] = useState(isFavorite(keyString));
    const { addToast } = useToasts();
    const handleFavoriteEvent = () => {
        const parsed = parseFavorites();
        // If key is found in map user has favorited this image and wants to un-favorite
        if (parsed[keyString]) {
            delete parsed[keyString];
            localStorage.setItem('favoriteDogs', JSON.stringify(parsed));
            setFavourite(false);
            addToast('You have removed this dog from your favorites', { appearance: 'info' });
            // If we are on the favorites page update it's state to remove the dog from the page
            if (setFavoriteState) {
                setFavoriteState(parsed);
            }
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

    return (
        <DogContainer
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleFavoriteEvent()}
        >
            {hover && favourite && <HeartBroken />}
            {hover && !favourite && <Heart />}
            {getPlayerType({ fileType, keyString, hostname })}
        </DogContainer>
    );
};

// Handle the different player types we expect <img>, <video> or <iframe>
const getPlayerType = ({ fileType, keyString, hostname }: dogTypes): JSX.Element => {
    if (imageTypes.includes(fileType)) {
        return <img src={`https://${hostname}/${keyString}.${fileType}`} alt="Dog Image / Gif" />;
    }
    if (videoTypes.includes(fileType)) {
        return (
            <video src={`https://${hostname}/${keyString}.${fileType}`} autoPlay controls muted>
                Your browser does not support the video tag
            </video>
        );
    }
    return <iframe src={`https://${hostname}/${keyString}.${fileType}`} title="Dog Image / Gif" />;
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

const CommonIconStyles = `
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    opacity: 0.8;
`;

const Heart = styled(FaHeart)`
    ${CommonIconStyles};
    color: red;
`;

const HeartBroken = styled(FaHeartBroken)`
    ${CommonIconStyles};
    color: black;
`;

export default Dog;
