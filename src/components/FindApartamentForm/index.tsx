'use client'

import React, {FC, useMemo, useEffect, useState} from 'react';
import Datepicker from "@/components/ui/datepicker";
import {Button} from "@/components/ui/button";
import CountPiker from "@/components/ui/countpiker";
import {Input} from "@/components/ui/input";
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {add} from 'date-fns';
import {useTranslations} from "next-intl";
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import { useRouter } from "@/navigation";
import useApartments from "@/composables/useApartments";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";
import {convertDateToSearch} from "@/lib/utils";
// import { ApartmentsFormContext } from "@/context/FindApartmentProvider";

interface FindApartmentProps {
    behavior?: string; // Defines the behavior for the component. Supports "default"|redirect" options
}

const savedSearchKey = 'apartmentFormSearch';

const FindApartment: FC<FindApartmentProps> = ({ behavior }) => {
    const router = useRouter();
    const { searchApartments } = useApartments();

    const t = useTranslations('filterForm');

    const defaultValues: SearchApartmentsFormData = useMemo(() => ({
        date: {
            from: add(new Date(), { days: 1 }),
            to: add(new Date(), { days: 2 }),
        },
        general: {
            room: 1,
            adult: 1,
            child: 0,
        },
        price: {
            from: 0,
            to: 0,
        },
    }), []);

    const {control, handleSubmit, setValue} = useForm({
        defaultValues,
    });

    useEffect(() => {
        let savedSearch: any = localStorage.getItem(savedSearchKey);

        if (savedSearch === null) {
            return;
        }

        savedSearch = JSON.parse(savedSearch);

        if (typeof savedSearch !== 'object' || savedSearch === null) {
            return;
        }

        if (savedSearch.date !== undefined) {
            setValue('date.from', new Date(savedSearch.date.from))
            setValue('date.to', new Date(savedSearch.date.to))
        }

        if (savedSearch.general !== undefined) {
            setValue('general', savedSearch.general);
        }

        if (savedSearch.price !== undefined) {
            setValue('price', savedSearch.price);
        }
    });

    const [formLoading, setFormLoading] = useState(false);

    const onSubmit: SubmitHandler<SearchApartmentsFormData> = async (data: SearchApartmentsFormData) => {
        localStorage.setItem(savedSearchKey, JSON.stringify(data));

        if (behavior === 'redirect') {
            router.push('/rent');
        } else {
            setFormLoading(true);
            const searchParams: ApartmentsSearchParams = {
                items_per_page: 15,
            };

            if (data.date.from) {
                searchParams.arrival_date = convertDateToSearch(data.date.from);
            }

            if (data.date.to) {
                searchParams.departure_date = convertDateToSearch(data.date.to);
            }

            if (data.price.from) {
                searchParams.min_price = data.price.from;
            }

            if (data.price.to) {
                searchParams.max_price = data.price.to;
            }

            // if (data.general.room) {
            //     searchParams.rooms = data.general.room;
            // }

            if (data.general.adult || data.general.child) {
                searchParams.guests = data.general.adult + data.general.child;
            }

            const searchResults = await searchApartments(searchParams);

            setFormLoading(false);
            console.log(searchResults);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'2xl:w-[1350px] md:w-[600px] mx-auto'}>
            <div
                className={'bg-white md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg gap-[20px]'}>
                <div>
                       <span className={'mb-[10px] text-lg'}>
                           {t('date')}
                       </span>
                    <Controller
                        name={'date'}
                        control={control}
                        render={({field: {onChange, value, ...field}}) => (
                            <Datepicker
                                placeholder={t('dateRange')}
                                date={value}
                                setDate={(data) => onChange(data)}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div>
                       <span className={'mb-[10px] text-lg'}>
                           {t('peopleCount')}
                       </span>
                    <Controller
                        name={'general'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <CountPiker
                                onSetValue={(id, num) => onChange({...value, [id]: num})}
                                list={[
                                    {
                                        label: t('adult', { count: value.adult }),
                                        id: 'adult'
                                    },
                                    {
                                        label: t('child', { count: value.child }),
                                        id: 'child',
                                    },
                                    {
                                        label: t('room', { count: value.room }),
                                        id: 'room'
                                    }
                                ]}
                                values={value}
                                text={`${value.adult} ${t('human')} - ${value.child} ${t('child', { count: value.child })} - ${value.room} ${t('room', { count: value.room })}`}
                            />
                        )}/>
                </div>
                <div className={'flex items-center gap-[10px]'}>
                    <div>
                           <span className={'mb-[10px] text-lg'}>
                               {t('priceFrom')}
                           </span>
                        <Controller
                            render={({field: {value, onChange, ...field}}) =>
                                <Input type={"number"} value={value} onChange={(event) => onChange(parseFloat(event.target.value.replace(/[^0-9\b]/g, '')))} className={"[appearance:textfield]"} rightText={'USD'} {...field} />
                            }
                            name={'price.from'}
                            control={control}
                        />
                    </div>
                    <div className={'w-[20px] h-[4px] bg-primary rounded-[5px] mt-[6%]'}/>
                    <div>
                            <span className={'mb-[10px] text-lg'}>
                                {t('priceTo')}
                            </span>
                      <Controller
                        render={({field: {value, onChange, ...field}}) =>
                          <Input type={"number"} value={value} onChange={(event) => onChange(parseFloat(event.target.value.replace(/[^0-9\b]/g, '')))} className={"[appearance:textfield]"} rightText={'USD'} {...field} />
                        }
                        name={'price.to'}
                        control={control}
                      />
                    </div>
                </div>
                <div className={'flex items-center justify-center 2xl:hidden'}>
                    <Button className={'inline-block'}>
                        {t('find')}
                    </Button>
                </div>
            </div>
            <div className={'2xl:flex hidden flex-col mt-[30px] items-end'}>
                <Button className={'inline-block'}>
                    {t('find')}
                </Button>
            </div>
        </form>
    );
};

export default FindApartment;
