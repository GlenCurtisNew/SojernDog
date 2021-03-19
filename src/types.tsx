export type dogTypes = {
    hostname: string;
    keyString: string;
    fileType: string;
    setFavoriteState?: (parsed: favoriteObject) => void;
};

export type favoriteObject = {
    [key: string]: dogTypes;
};
