import { favoriteObject } from '../types';

export const parseFavorites = (): favoriteObject => {
    const localStore = localStorage.getItem('favoriteDogs') || '';
    let parsed: favoriteObject = {};
    if (localStore) {
        parsed = JSON.parse(localStore);
    }
    return parsed;
};

export const isEmpty = (obj: favoriteObject): boolean => {
    return Object.keys(obj).length === 0;
};
