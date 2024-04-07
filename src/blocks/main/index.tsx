import React from 'react';
import FindApartment from "@/components/FindApartamentForm";
import ApartmentCard from "@/components/ApartmentCard";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

const Main = () => {
    const t = useTranslations('main');
    return (
        <div className="bg-main pt-[100px] pb-[80px] bg-cover bg-no-repeat">
            <div className="container">
                <div className={'text-center'}>
                    <h2 className={'text-[30px] uppercase font-extrabold text-white'}>{t('subtitle')}</h2>
                    <h1 className={'text-[40px] uppercase font-extrabold text-white mt-[30px] mb-[60px]'}>{t('title')}</h1>
                </div>
                <div className={'flex justify-center gap-[50px] mb-[100px]'}>
                    <Button variant={'secondary'} className={'min-w-[250px]'}>{t('toRent')}</Button>
                    <Button>{t('rent')}</Button>
                </div>
                <FindApartment/>
                <h2 className={'text-[30px] uppercase font-extrabold text-white mt-[48px] text-center'}>{t('bestDeals')}</h2>
                <div className="grid grid-cols-3 gap-[20px] mt-[60px]">
                    {
                        Array.from({length: 3}).map((_, i) => (<ApartmentCard
                            key={i}
                            image={'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp'}
                            price={300} name={'1 ком. апартаменты в Marina gate'}
                            location={'Dubai/Elite 6 Sports Residence'} link={''}
                            currency={'USD'} bathCount={3} bedCount={3}
                            maxPeople={4} nights={2} roomSize={50}
                        />))
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;
