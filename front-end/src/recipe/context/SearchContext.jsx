import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchedItem, setSearchedItem] = useState([]);
    const [searchedItemFromApi, setSearchedItemFromApi] = useState([]);

    return (
        <SearchContext.Provider value={{ searchedItem, setSearchedItem, searchedItemFromApi, setSearchedItemFromApi }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };