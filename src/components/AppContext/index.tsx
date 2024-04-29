'use client'

import React, {createContext, FC, useState} from 'react';
import {getCookie} from "cookies-next";

export const AppContext = createContext({})
const AppContextWrapper: FC<{children: React.ReactNode}> = ({children}) => {
    const cookieApartmentFormData = JSON.parse( getCookie('apartmentFormData') || '{}');
    const [apartmentFormData, setApartmentFormData] = useState(cookieApartmentFormData);

    return (
        <AppContext.Provider value={{apartmentFormData, setApartmentFormData}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextWrapper;
