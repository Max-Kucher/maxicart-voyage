import ApartmentCard from "@/components/ApartmentCard";
import AddApartmentForm from "@/src/blocks/addApartmentForm";
import PageNavigation from "@/components/PageNavigation";
import useApartments from "@/composables/useApartments";
import Apartment from "@/types/Apartment";
import React from "react";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";
import {NoSSRFindApartamentForm} from "@/components/FindApartamentForm/NoSSRFindApartamentForm";
import { convertSearchApartmentsFormDataToApartmentsSearchParams } from "@/src/lib/utils";


async function CardsList({formData}: {formData: string}) {
    let data: ApartmentsSearchParams = {
        items_per_page: 15,
        sort_by: 'id',
        sort_order: 'asc',
    };

    if(formData) {
        data = convertSearchApartmentsFormDataToApartmentsSearchParams(JSON.parse(atob(formData)));
    }


    const { searchApartments } = useApartments();
    const apartments = await searchApartments(data);


    return apartments.data.map((apartment: Apartment) => (<ApartmentCard
        key={`index-apartment-${apartment.id}`}
        image={apartment.photos[0]?.photo ?? null}
        price={apartment?.smoobu_price?.price ?? apartment.smoobu.price.minimal}
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

export default function RentIndex({searchParams}: {searchParams: {formData: string}}) {
    return (
        <main>
            <div className="container">
                <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px]'}>
                    <PageNavigation  />
                </div>
                <div className={'mt-[30px]'}>
                    <NoSSRFindApartamentForm />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] md:mt-[80px] mt-[40px]">
                    <CardsList formData={searchParams.formData}/>
                </div>
                <AddApartmentForm/>
            </div>
        </main>
    );
}
