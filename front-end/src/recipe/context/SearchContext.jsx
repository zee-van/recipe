import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchedItem, setSearchedItem] = useState([]);

    return (
        <SearchContext.Provider value={{ searchedItem, setSearchedItem }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };