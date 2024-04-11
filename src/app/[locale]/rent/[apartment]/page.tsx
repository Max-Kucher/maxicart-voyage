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
    console.log(apartmentData.document)
    return (
        <div className={'container'}>
            <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px] md:mb-[30px] mb-[20px]'}>
                <PageNavigation nameSpace={apartmentData.title ?? apartmentData.smoobu.name}/>
            </div>

            <div className={'flex gap-[20px] xl:flex-row flex-col'}>
                <div className={'xl:w-1/2'}>
                    <ApartmentPhotos images={apartmentData.photos.map(photo => photo.photo)}/>
                </div>
                <div className={'xl:w-1/2'}>
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
                        document={apartmentData.document ?? ''}
                    />
                </div>
            </div>
            <NoSSRApartmentBookBlock
                apartmentId={apartmentData.id} key={`apartment-details-card-${params.apartment}`}/>
        </div>
    );
};
