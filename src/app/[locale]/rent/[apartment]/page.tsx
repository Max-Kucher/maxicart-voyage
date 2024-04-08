import React from 'react';
import ApartmentPhotos from "@/components/ApartmentPhotos";
import BedIcon from "@/components/icons/bed";
import BathIcon from "@/components/icons/bath";
import {DownloadIcon, MapPinIcon, Maximize2Icon, Share2Icon} from "lucide-react";
import UsersIcon from "@/components/icons/users";
import {Button} from "@/components/ui/button";

const Page = () => {
    return (
        <div className={'container'}>
           <div className={'flex gap-[20px]'}>
               <div className={'w-1/2'}>
                   <ApartmentPhotos images={['https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp', 'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp', 'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp', 'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp',  'https://www.apartments-mitte.de/wp-content/uploads/2023/10/alte-nationalgalerie-1.webp']}/>
               </div>
               <div className={'w-1/2 bg-white rounded-lg px-[30px] py-[60px]'}>
                    <div className={'flex justify-between'}>
                        <h1 className={'text-2xl text-black font-semibold'}>Azizi Shaista JA studio 409</h1>
                        <div className={'flex flex-col'}>
                            <b className={'text-2xl text-primary font-extrabold'}>От 300 USD</b>
                            <span className={'text-lg text-foreground-secondary'}>За 2 ночи</span>
                        </div>
                    </div>
                   <div className={'mt-[3px]'}>
                       <div className={'flex items-center gap-[15px]'}>
                           <UsersIcon className={'text-primary w-[27px] h-[27px]'}/>
                           <span className={'text-lg font-medium text-foreground'}>
                                До 4 людей
                            </span>
                       </div>
                   </div>
                   <div className={'flex items-center gap-[15px] mt-[10px] text-foreground-secondary'}>
                       <MapPinIcon className={'h-[26px] w-[21px]'}/>
                       <span className={'text-lg font-medium'}>Dubai\Elite 6 Sports Residence</span>
                   </div>
                   <div className={'flex justify-between'}>
                       <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>
                           <div className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                               <BedIcon className={'w-[39px] h-[26px]'}/>
                               <span className={'text-[30px] font-semibold'}>2</span>
                           </div>
                           <div className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                               <BathIcon className={'w-[39px] h-[26px]'}/>
                               <span className={'text-[30px] font-semibold'}>3</span>
                           </div>
                           <div className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                               <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                               <span className={'text-[30px] font-semibold'}>4 M2</span>
                           </div>
                       </div>
                       <div className={'flex gap-[5px]'}>
                           <Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>
                               <DownloadIcon className={'h-[38px] w-[38px] text-primary'}/>
                           </Button>
                           <Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>
                               <Share2Icon className={'h-[38px] w-[38px] text-primary'}/>
                           </Button>
                       </div>
                   </div>
                   <div className={'mt-[50px] text-black text-lg font-medium'}>
                       Вы можете получить Genius-скидку в Expo Village Serviced Apartments! Чтобы сэкономить на этом жилье, просто <br/><br/>
                       Expo Village Serviced Apartments — это дом для отпуска в городе Дубай, расположенный на расстоянии 1,7 км и 13 км соответственно от таких достопримечательностей.
                   </div>
               </div>
           </div>
        </div>
    );
};

export default Page;
