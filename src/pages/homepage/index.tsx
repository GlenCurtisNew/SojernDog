import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import axios from 'axios';
import styled from 'styled-components';
import Dog from '../../components/Dog';
import { dogTypes } from '../../types';
import { IoReload } from 'react-icons/io5';
import { DOGS_TO_DISPLAY } from '../../constants';
import { ClipLoader } from 'react-spinners';

const Index = (): JSX.Element => {
    const [dogs, setDogs] = useState<Array<dogTypes>>([]);
    const [loading, setLoading] = useState(false);

    const refresh = () => {
        setDogs([]);
    };

    useEffect(() => {
        const fetchDog = async (): Promise<dogTypes> => {
            const [err, result] = await to(axios.get('https://random.dog/woof.json'));
            if (err) {
                throw new Error(`Issue with api call: ${err}`);
            }
            /**
             * We expect API to return this format
             * {
             *     "fileSize": 123,
             *     "url": "https://random.org/aaa-bbb-ccc-ddd.png
             * }
             * In the next block we do some parsing
             * - Extract the url key
             * - Create a URL object and get the hostname and pathname key https://developer.mozilla.org/en-US/docs/Web/API/URL
             * - Split the string on the period, { path = "/aaa-bbb-ccc-ddd", fileType = "png" }
             * - Remove the "/" from the path string and store in keyString
             */
            const { url: urlString } = result?.data;
            const { hostname, pathname } = new URL(urlString);
            const [path, fileType] = pathname.split('.');
            const keyString = path.substring(1);
            return { hostname, keyString, fileType };
        };
        if (dogs.length < DOGS_TO_DISPLAY) {
            if (dogs.length <= 0) {
                setLoading(true);
            }
            fetchDog()
                .then((res) => {
                    // Stop loading as soon as one dog is added to array. The rest will load async
                    if (dogs.length > 0) {
                        setLoading(false);
                    }
                    setDogs((old) => [...old, res]);
                })
                .catch((err) => console.log(err));
        }
    }, [dogs]);

    if (loading) {
        return (
            <LoadingContainer>
                <ClipLoader color={'white'} loading={loading} size={150} />
            </LoadingContainer>
        );
    }

    return (
        <>
            <RefreshContainer>
                <ClickableContainer onClick={refresh}>
                    <p>Refresh</p>
                    <StyledRefresh />
                </ClickableContainer>
            </RefreshContainer>
            <DogsContainer>
                {dogs.map((dog) => (
                    <Dog
                        key={dog.keyString}
                        hostname={dog.hostname}
                        keyString={dog.keyString}
                        fileType={dog.fileType}
                    />
                ))}
            </DogsContainer>
        </>
    );
};

const RefreshContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

const ClickableContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    p {
        margin-right: 0.5em;
    }
    :hover {
        svg {
            color: yellow;
        }
        color: yellow;
    }
`;

const DogsContainer = styled.div`
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const StyledRefresh = styled(IoReload)`
    color: white;
    width: 2em;
    height: 2em;
    margin: 1em 0;
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export default Index;
