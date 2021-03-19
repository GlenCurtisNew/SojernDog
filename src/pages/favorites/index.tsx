import React, { useState } from 'react';
import { isEmpty, parseFavorites } from '../../helpers/localStorage';
import styled from 'styled-components';
import { FaHeartBroken } from 'react-icons/all';
import Dog from '../../components/Dog';

/**
 * Favorites objects in memory (localStorage) will look like this
 * {
 *     "aaa-bbb-ccc-ddd": {
 *          fileType: "jpg",
 *          hostname: "random.dog",
 *          keyString: "bbb-ccc-ddd-aaa"
 *     },
 *     "bbb-ccc-ddd-aaa": {
 *          fileType: "gif",
 *          hostname: "random.dog",
 *          keyString: "ccc-aaa-bbb-aaa"
 *     }
 * }
 */

const Index = (): JSX.Element => {
    const [favorites, setFavorites] = useState(parseFavorites());
    if (isEmpty(favorites)) {
        return (
            <NoFavoritesContainer>
                <StyledText>You have no favorites!</StyledText>
                <StyledText>Go to the homepage and favorite some doggos!</StyledText>
                <StyledHeart />
            </NoFavoritesContainer>
        );
    }

    return (
        <DogsContainer>
            {Object.keys(favorites).map((key) => (
                <Dog
                    key={key}
                    hostname={favorites[key].hostname}
                    fileType={favorites[key].fileType}
                    keyString={favorites[key].keyString}
                    setFavoriteState={setFavorites}
                />
            ))}
        </DogsContainer>
    );
};

const DogsContainer = styled.div`
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const NoFavoritesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
`;

const StyledText = styled.p`
    margin: 0.5em 0;
    font-size: 2em;
`;

const StyledHeart = styled(FaHeartBroken)`
    width: 3em;
    height: 3em;
`;

export default Index;
