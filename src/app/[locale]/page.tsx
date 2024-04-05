import FindApartment from "@/components/FindApartamentForm";
import ServiceCard from "@/components/ServiceCard";
import {services} from "@/config/service";
import {useTranslations} from "next-intl";
import WorkStepsCard from "@/components/WorkStepsCard";
import {Button} from "@/components/ui/button";


export default function Home() {
    const t = useTranslations('service');

    return (
        <main className="bg-white">
            <div className="container ">
                <FindApartment/>
                <div className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] 2xl:w-[1075px] md:w-full md:max-w-[705px] 2xl:max-w-full w-[320px] mt-[100px] mx-auto'}>
                    <div className={'relative w-full md:h-auto'}>
                        <h2 dangerouslySetInnerHTML={{ __html: t('title') }} className={'md:w-6/12 md:text-[40px] md:font-extrabold text-center md:text-left font-semibold w-full text-[20px] uppercase absolute top-[50%] translate-y-[-50%]'}/>
                    </div>
                    {
                        services.map(({textKey, img}, i) => <ServiceCard title={t(`${textKey}.title`)} image={img} description={t(`${textKey}.description`)} key={i}/>)
                    }
                </div>
                <div className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mt-[100px] mx-auto'}>
                    <WorkStepsCard/>
                    <WorkStepsCard/>
                    <WorkStepsCard/>
                    <WorkStepsCard/>
                    <WorkStepsCard/>
                    <WorkStepsCard/>
                </div>
               <div className="flex justify-end mt-[60px]">
                   <Button>
                       Оставить заявку
                   </Button>
               </div>
            </div>
        </main>
    )
}
