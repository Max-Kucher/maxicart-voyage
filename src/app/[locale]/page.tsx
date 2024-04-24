import AddApartmentForm from "../../blocks/addApartmentForm";
import Main from "@/blocks/main";
import WorkStages from "@/blocks/workStages";
import OurWork from "@/blocks/ourServices";


export default function Home() {

    return (
        <main className="bg-white">
            <Main />
            <OurWork id={`homegage-our-services`} />
            <AddApartmentForm imageBg={true} isTextCentered={true} />
            <WorkStages id={"homegage-work-stages"} />
        </main>
    )
}
