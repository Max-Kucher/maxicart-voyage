"use client"

// import { createContext, useState } from "react";
// import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";

// interface ApartmentsFormContextData {
//     data: any; // Здесь вы можете указать правильный тип для data
//     setData: (data: SearchApartmentsFormData) => void;
// }
//
// export const ApartmentsFormContext = createContext<ApartmentsFormContextData>({
//     data: {},
//     setData: () => {}
// });

interface FindApartmentProviderProps {
    children: React.ReactNode;
}

export default function FindApartmentProvider({ children }: FindApartmentProviderProps) {
    // const [findApartmentData, setFindApartmentData] = useState({});

    return (
        // <ApartmentsFormContext.Provider value={{ data: findApartmentData, setData: setFindApartmentData }}>
            {children}
        // </ApartmentsFormContext.Provider>
    );
};
