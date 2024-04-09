import React, {Suspense} from 'react';
import FindApartment from "@/components/FindApartamentForm";
import ApartmentCard from "@/components/ApartmentCard";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import useApartments from "@/composables/useApartments";
import Apartment from "@/types/Apartment";
import {Link} from "@/navigation";

async function CardsList() {
    const { searchApartments } = useApartments();
    const apartments = await searchApartments({
        items_per_page: 3,
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
        />))
    ;
}

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
                    <Button asChild={true}>
                        <Link href={`/rent`}>
                            {t('rent')}
                        </Link>
                    </Button>
                </div>
                <FindApartment/>
                <h2 className={'text-[30px] uppercase font-extrabold text-white mt-[48px] text-center'}>{t('bestDeals')}</h2>
                <div className="grid grid-cols-3 gap-[20px] mt-[60px]">
                    <Suspense fallback={<>Currently loading</>}>
                        <CardsList />
                    </Suspense>
                </div>
            </div>
    </div>);
};

export default Main;
