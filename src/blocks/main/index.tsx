import React, {Suspense} from 'react';
import ApartmentCard from "@/components/ApartmentCard";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import useApartments from "@/composables/useApartments";
import Apartment from "@/types/Apartment";
import {Link} from "@/navigation";
import {NoSSRFindApartamentForm} from "@/components/FindApartamentForm/NoSSRFindApartamentForm";

async function CardsList() {
    const { searchApartments } = await useApartments();
    const apartments = await searchApartments({
        items_per_page: 3,
        sort_by: 'best_offer',
        best_offer: 'True',
    });

    return apartments.data.map((apartment: Apartment) => (<ApartmentCard
            key={`index-apartment-${apartment.id}`}
            image={apartment.photos[0]?.photo ?? null}
            price={apartment?.smoobu_price?.price ?? apartment.smoobu.price.minimal}
            name={apartment.title ?? apartment.smoobu.name}
            link={`/rent/${apartment.id}`}
            currency={apartment.smoobu.currency}
            bathCount={apartment.smoobu.rooms.bathrooms}
            maxPeople={apartment.smoobu.rooms.maxOccupancy}
            location={apartment.address}
            roomSize={apartment.m2}
            bedCount={apartment.smoobu.rooms.bedrooms}
            nights={apartment.nights ?? 1}
        />))
    ;
}

const Main = () => {
    const t = useTranslations('main');
    return (
        <div className="bg-main bg-[length:100%_870px] md:bg-[length:100%_950px] bg-top bg-fixed bg-no-repeat xl:pt-[80px] md:pt-[60px] pt-[40px] pb-[80px]">
            <div className="container">
                <div className={'text-center'}>
                    <h2 className={'md:text-[30px] uppercase md:font-extrabold text-white text-lg font-medium'}>{t('subtitle')}</h2>
                    <h1 className={'md:text-[40px] md:leading-[50px] uppercase md:font-extrabold text-white mt-[20px] md:mb-[45px] mb-[20px] text-xl font-bold'}>{t('title')}</h1>
                </div>
                <div className={'flex justify-center md:gap-[50px] gap-[15px] xl:mb-[62px] md:mb-[32px] mb-[42px] flex-wrap'}>
                    <Button asChild={true} variant={'secondary'}>
                        <Link href={`/?rentOut=true`}>
                            {t('toRent')}
                        </Link>
                    </Button>
                    <Button asChild={true}>
                        <Link href={`/rent`}>
                            {t('rent')}
                        </Link>
                    </Button>
                </div>
                <NoSSRFindApartamentForm behavior={`redirect`} />
                <h2 className={'xl:text-[30px] md:text-[25px] text-xl uppercase font-extrabold text-white mt-[48px] text-center'}>{t('bestDeals')}</h2>
                <div className="grid md:overflow-x-auto md:grid-cols-2 xl:grid-cols-3 gap-[20px] xl:mt-[60px] md:mt-[45px] mt-[30px] grid-cols-1">
                    <Suspense fallback={<>Currently loading</>}>
                        <CardsList />
                    </Suspense>
                </div>
            </div>
    </div>);
};

export default Main;
