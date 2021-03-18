import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import axios from 'axios';
import styled from 'styled-components';
import Dog from '../../components/Dog';

const dogsToDisplay = 6;

const Index = (): JSX.Element => {
    const [dogs, setDogs] = useState<Array<{ hostname: string; key: string; fileType: string }>>([]);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        let loop = 0;
        const fetchDog = async () => {
            const [err, result] = await to(axios.get('https://random.dog/woof.json'));
            if (err) {
                console.error('Issue with fetching endpoints');
            }
            const { url: urlString } = result?.data;
            const { hostname, pathname } = new URL(urlString);
            const [path, fileType] = pathname.split('.');
            const key = path.substring(1);
            setDogs((old) => [...old, { hostname, key, fileType }]);
        };
        while (loop < dogsToDisplay) {
            fetchDog();
            loop++;
        }
    }, []);

    console.log(dogs);

    return (
        <div className="App">
            <button>Next</button>
            <DogsContainer>
                {dogs.map((dog) => (
                    <Dog key={dog.key} hostname={dog.hostname} keyString={dog.key} fileType={dog.fileType} />
                ))}
            </DogsContainer>
        </div>
    );
};

const DogsContainer = styled.div`
    display: flex;
    height: 200px;
    justify-content: center;
    flex-wrap: wrap;
`;

export default Index;
