import FindApartment from "@/components/FindApartamentForm";
import ServiceCard from "@/components/ServiceCard";
import {services} from "@/config/service";
import {useTranslations} from "next-intl";
import WorkStepsCard from "@/components/WorkStepsCard";
import {Button} from "@/components/ui/button";
import {workStages} from "@/config/workStages";
import ApartmentCard from "@/components/ApartmentCard";
import AddApartmentForm from "@/components/AddApartmentForm";


export default function Home() {
    const t = useTranslations();

    return (
        <main className="bg-white">
            <div className="container ">
                <FindApartment/>
                <div
                    className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] 2xl:w-[1075px] md:w-full md:max-w-[705px] 2xl:max-w-full w-[320px] mt-[100px] mx-auto'}>
                    <div className={'relative w-full md:h-auto'}>
                        <h2 dangerouslySetInnerHTML={{__html: t('service.title')}}
                            className={'md:w-6/12 md:text-[40px] md:font-extrabold text-center md:text-left font-semibold w-full text-[20px] uppercase absolute top-[50%] translate-y-[-50%]'}/>
                    </div>
                    {
                        services.map(({textKey}, i) => (
                            <ServiceCard
                                title={t(`service.${textKey}.title`)}
                                image={`/images/services/${textKey}.svg`}
                                description={t(`service.${textKey}.description`)}
                                key={i}
                            />
                        ))
                    }
                </div>
                <div className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mt-[100px] mx-auto'}>
                    <div className={'relative'}>
                        <h2 dangerouslySetInnerHTML={{__html: t('workStages.title')}}
                            className={'absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-8/12 lg:w-6/12 md:text-[40px] md:font-extrabold text-left font-semibold text-[20px] uppercase'}/>
                    </div>
                    {
                        workStages.map(({estimationTime, id}, i) => <WorkStepsCard
                            description={t(`workStages.${id}.description`)} title={t(`workStages.${id}.title`)}
                            estimatedTime={estimationTime} index={`0${i + 1}`} key={i}/>)
                    }
                </div>
                <div className="flex justify-end mt-[60px]">
                    <Button>
                        {t('workStages.submit')}
                    </Button>
                </div>
            </div>
            <div className="container">
                <AddApartmentForm/>
            </div>
        </main>
    )
}
