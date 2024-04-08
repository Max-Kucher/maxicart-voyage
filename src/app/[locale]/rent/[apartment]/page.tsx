'use client'
import React from 'react';
import ApartmentPhotos from "@/components/ApartmentPhotos";
import ApartmentDetails from '@/src/components/ApartmentDetails';
import ApartmentBookBlock from "@/components/ApartmentBookBlock";

const Page = () => {
    return (
        <div className={'container'}>
            <div className={'flex gap-[20px]'}>
                <div className={'w-1/2'}>
                    <ApartmentPhotos images={['', '', '', '']}/>
                </div>
                <div className={'w-1/2'}>
                    <ApartmentDetails
                        nights={2}
                        roomSize={233}
                        maxPeople={3}
                        bedCount={2}
                        bathCount={2}
                        currency={'USD'}
                        name={'Azizi Shaista JA studio 409'}
                        location={`Dubai Elite 6 Sports Residence`}
                        price={322}
                        description={`
                            Вы можете получить Genius-скидку в Expo Village Serviced Apartments! Чтобы сэкономить на этом жилье, просто <br/><br/>
                            Expo Village Serviced Apartments — это дом для отпуска в городе Дубай, расположенный на расстоянии 1,7 км и 13 км соответственно от таких достопримечательностей 
                        `}
                    />
                </div>
            </div>
            <ApartmentBookBlock/>
        </div>
    );
};

export default Page;
