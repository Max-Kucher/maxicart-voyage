import ApartmentCard from "@/components/ApartmentCard";
// import FindApartment from "@/components/FindApartamentForm";
import AddApartmentForm from "@/src/blocks/addApartmentForm";
import PageNavigation from "@/components/PageNavigation";
import useApartments from "@/composables/useApartments";
import Apartment from "@/types/Apartment";
import React from "react";
import { cookies } from 'next/headers'
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";
import {NoSSRFindApartamentForm} from "@/components/FindApartamentForm/NoSSRFindApartamentForm";
import appConfig from "@/config/app";


async function CardsList() {
    const cookieStore = cookies();
    const savedSearch = cookieStore.get(`${appConfig.cookieKeys.apartmentFormSearch}-backend`);
    let searchParams: ApartmentsSearchParams = {};

    if (savedSearch === null || savedSearch === undefined) {
        searchParams = {
            items_per_page: 15,
            sort_by: 'id',
            sort_order: 'asc',
        };
    } else {
        searchParams = JSON.parse(savedSearch.value);
    }

    const { searchApartments } = useApartments();
    const apartments = await searchApartments(searchParams);

    console.log(apartments.data.length);

    return apartments.data.map((apartment: Apartment) => (<ApartmentCard
        key={`index-apartment-${apartment.id}`}
        image={apartment.photos[0]?.photo ?? null}
        price={apartment.smoobu.price.minimal}
        name={apartment.smoobu.name}
        link={`/rent/${apartment.id}`}
        currency={apartment.smoobu.currency}
        bathCount={apartment.smoobu.rooms.bathrooms}
        maxPeople={apartment.smoobu.rooms.maxOccupancy}
        location={apartment.address}
        roomSize={apartment.m2}
        bedCount={apartment.smoobu.rooms.bedrooms}
        nights={apartment.nights ?? 1}
    />));
}

export default function RentIndex() {
    return (
        <main>
            <div className="container">
                <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px]'}>
                    <PageNavigation />
                </div>
                <div className={'mt-[30px]'}>
                    <NoSSRFindApartamentForm />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] md:mt-[80px] mt-[40px]">
                    <CardsList/>
                </div>
                <AddApartmentForm/>
            </div>
        </main>
    );
}
