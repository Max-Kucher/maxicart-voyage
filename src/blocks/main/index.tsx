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
        <div className="bg-main xl:pt-[100px] md:pt-[60px] pt-[40px] pb-[80px] bg-cover bg-no-repeat">
            <div className="container">
                <div className={'text-center'}>
                    <h2 className={'md:text-[30px] uppercase md:font-extrabold text-white text-lg font-medium'}>{t('subtitle')}</h2>
                    <h1 className={'md:text-[40px] uppercase md:font-extrabold text-white md:mt-[30px] mt-[20px] md:mb-[60px] mb-[20px] text-xl font-bold'}>{t('title')}</h1>
                </div>
                <div className={'flex justify-center md:gap-[50px] gap-[15px] 2xl:mb-[100px] xl:mb-[62px] md:mb-[32px] mb-[42px] flex-wrap'}>
                    <Button variant={'secondary'}>{t('toRent')}</Button>
                    <Button asChild={true}>
                        <Link href={`/rent`}>
                            {t('rent')}
                        </Link>
                    </Button>
                </div>
                <FindApartment behavior={`redirect`} />
                <h2 className={'text-[30px] uppercase font-extrabold text-white mt-[48px] text-center'}>{t('bestDeals')}</h2>
                <div className="grid md:grid-cols-3 gap-[20px] mt-[60px] grid-cols-1">
                    <Suspense fallback={<>Currently loading</>}>
                        <CardsList />
                    </Suspense>
                </div>
            </div>
    </div>);
};

export default Main;
