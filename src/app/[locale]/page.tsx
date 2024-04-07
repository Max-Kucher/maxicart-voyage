import FindApartment from "@/components/FindApartamentForm";
import ServiceCard from "@/components/ServiceCard";
import {services} from "@/config/service";
import {useTranslations} from "next-intl";
import WorkStepsCard from "@/components/WorkStepsCard";
import {Button} from "@/components/ui/button";
import {workStages} from "@/config/workStages";
import ApartmentCard from "@/components/ApartmentCard";
import AddApartmentForm from "../../blocks/addApartmentForm";
import Main from "@/blocks/main";
import WorkStages from "@/blocks/workStages";
import OurWork from "@/blocks/ourServices";


export default function Home() {

    return (
        <main className="bg-white">
            <Main/>
            <OurWork/>
            <AddApartmentForm/>
            <WorkStages/>
        </main>
    )
}
