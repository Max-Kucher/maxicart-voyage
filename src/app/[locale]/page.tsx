import FindApartment from "@/components/FindApartamentForm";
import ServiceCard from "@/components/ServiceCard";


export default function Home() {
    return (
        <main className="bg-white">
            <h1>Index</h1>
           <div className="container ">
               <FindApartment/>
              <div className={'grid grid-cols-3 gap-[20px] w-[1075px] mt-[100px] mx-auto'}>
                  <div className={'relative'}>
                      <h2 className={'text-[40px] font-extrabold uppercase absolute top-[50%] translate-y-[-50%]'}>
                          наши <br/> услуги
                      </h2>
                  </div>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
              </div>
           </div>
        </main>
    )
}
