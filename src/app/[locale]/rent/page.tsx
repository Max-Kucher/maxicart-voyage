import ApartmentCard from "@/components/ApartmentCard";
import FindApartment from "@/components/FindApartamentForm";
import AddApartmentForm from "@/src/blocks/addApartmentForm";
import PageNavigation from "@/components/PageNavigation";
import useApartments from "@/composables/useApartments";
import Apartment from "@/types/Apartment";
import React from "react";

async function CardsList() {
    const { searchApartments } = useApartments();
    const apartments = await searchApartments({
        items_per_page: 15,
        sort_by: 'id',
        sort_order: 'asc',
    });

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

        nights={2} // под вопросом как быть
    />));
}

export default function RentIndex() {
    return (
        <main>
            <div className="container">
                <div className={'mt-[70px]'}>
                    <PageNavigation/>
                </div>
                <div className={'mt-[30px]'}>
                    <FindApartment/>
                </div>
                <div className="grid grid-cols-3 gap-[20px] mt-[80px]">
                    <CardsList />
                </div>
                <AddApartmentForm/>
            </div>
        </main>
    );
}
