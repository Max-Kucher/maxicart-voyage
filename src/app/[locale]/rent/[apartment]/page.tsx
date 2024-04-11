import React from 'react';
import ApartmentPhotos from "@/components/ApartmentPhotos";
import useApartments from "@/composables/useApartments";
import { NoSSRApartmentBookBlock } from "@/components/ApartmentBookBlock/NoSSRApartmentBookBlock";
import ApartmentDetails from "@/components/ApartmentDetails";
import PageNavigation from "@/components/PageNavigation";

export default async function Page({params} : {
    params: { locale: string; apartment: string };
}) {
    const { searchApartmentById } = useApartments();

    const apartmentDataSearch = await searchApartmentById(parseInt(params.apartment));
    const apartmentData = apartmentDataSearch.body;

    return (
        <div className={'container'}>
            <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px]'}>
                <PageNavigation />
            </div>

            <div className={'flex gap-[20px]'}>
                <div className={'w-1/2'}>
                    <ApartmentPhotos images={apartmentData.photos.map(photo => photo.photo)}/>
                </div>
                <div className={'w-1/2'}>
                    <ApartmentDetails
                        nights={apartmentData.nights ?? 1}
                        roomSize={apartmentData.m2 ?? 0}
                        maxPeople={apartmentData.smoobu.rooms.maxOccupancy}
                        bedCount={apartmentData.smoobu.rooms.bedrooms}
                        bathCount={apartmentData.smoobu.rooms.bathrooms}
                        price={apartmentData.smoobu.price.minimal}
                        currency={apartmentData.smoobu.currency}
                        name={apartmentData.title ?? apartmentData.smoobu.name}
                        location={apartmentData.address}
                        description={apartmentData.description}
                    />
                </div>
            </div>
            <NoSSRApartmentBookBlock
                apartmentId={apartmentData.id} key={`apartment-details-card-${params.apartment}`}/>
        </div>
    );
};
