import ApartmentCard from "@/components/ApartmentCard";
import FindApartment from "@/components/FindApartamentForm";
import AddApartmentForm from "@/src/blocks/addApartmentForm";
import PageNavigation from "@/components/PageNavigation";


export default function RentIndex() {
    return (
        <main>
            <div className="container">
                <div className={'mt-[70px]'}>
                    <PageNavigation/>
                </div>
                <div className={'mt-[30px]'}>
                    <FindApartment/>
                </div>
                <div className="grid grid-cols-3 gap-[20px] mt-[80px]">
                    {
                        Array.from({length: 6}).map((_, i) => (<ApartmentCard
                            key={i}
                            image={'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp'}
                            price={300} name={'1 ком. апартаменты в Marina gate'}
                            location={'Dubai/Elite 6 Sports Residence'} link={''}
                            currency={'USD'} bathCount={3} bedCount={3}
                            maxPeople={4} nights={2} roomSize={50}
                        />))
                    }
                </div>
                <AddApartmentForm/>
            </div>
        </main>
    );
}
