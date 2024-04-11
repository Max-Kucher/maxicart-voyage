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
import {convertDateToSearch, convertSearchApartmentsFormDataToApartmentsSearchParams} from "@/lib/utils";
import { getCookie, setCookie } from 'cookies-next';
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
        let savedSearch: any = getCookie(savedSearchKey);

        if (savedSearch === null || savedSearch === undefined) {
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
        const today = new Date();
        setCookie(savedSearchKey, JSON.stringify(data), {
            path: '/',
            expires: new Date(today.setDate(today.getDate() + 3)),
        });
        setCookie(savedSearchKey + '-backend', convertSearchApartmentsFormDataToApartmentsSearchParams(data), {
            path: '/',
            expires: new Date(today.setDate(today.getDate() + 3)),
        });

        if (behavior === 'redirect') {
            router.push('/rent');
        } else {
            setFormLoading(true);
            const searchParams = convertSearchApartmentsFormDataToApartmentsSearchParams(data);
            const searchResults = await searchApartments(searchParams);

            setFormLoading(false);
            router.refresh();
        }
    };

    const btnClass = `inline-block transition-opacity duration-150 hover:opacity-90 ${formLoading ? 'opacity-40 pointer-events-none' : ''}`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'2xl:w-[1350px] md:w-[600px] mx-auto'}>
            <div
                className={'bg-white p-[20px] md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg md:gap-[20px] gap-[15px]'}>
                <div>
                       <span className={'mb-[10px] md:text-lg text-xs'}>
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
                       <span className={'mb-[10px] md:text-lg text-xs'}>
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
                           <span className={'mb-[10px] md:text-lg text-xs'}>
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
                            <span className={'mb-[10px] md:text-lg text-xs'}>
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
                    <Button className={btnClass}>
                        {formLoading ? t('searching') : t('find')}
                    </Button>
                </div>
            </div>
            <div className={'2xl:flex hidden flex-col mt-[30px] items-end'}>
                <Button className={btnClass}>
                    {formLoading ? t('searching') : t('find')}
                </Button>
            </div>
        </form>
    );
};

export default FindApartment;
