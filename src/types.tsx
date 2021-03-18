export type dogTypes = {
    hostname: string;
    keyString: string;
    fileType: string;
};

export type favoriteObject = {
    [key: string]: dogTypes;
};
