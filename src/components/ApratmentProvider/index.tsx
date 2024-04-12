'use client'
import React, {createContext, FC, ReactNode, useState} from 'react';

export const ApartmentContext = createContext({});


const ApartmentProvider: FC<{children: ReactNode}> = ({children}) => {
    const [apartmentPrice, setApartmentPrice] = useState(null);
    const [apartmentNights, setApartmentNights] = useState(null);
    return (
        <ApartmentContext.Provider value={{
            apartmentPrice,
            setApartmentPrice,
            setApartmentNights,
            apartmentNights
        }}>
            {children}
        </ApartmentContext.Provider>
    );
};

export default ApartmentProvider;
