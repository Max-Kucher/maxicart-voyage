import React, {FC} from 'react';
import Image from "next/image";

interface ServiceCardProps {
    image: string
    title: string
    description: string
}
const ServiceCard: FC<ServiceCardProps> = ({image, description, title}) => {

    return (
        <div className={'group w-full py-[30px] px-[21px] rounded-xl bg-background hover:bg-primary transition'}>
            <div className="flex flex-col md:gap-[20px] gap-[10px] text-center">
                <div className={'mx-auto'}>
                    <Image src={image} alt={title} width={80} height={80}/>
                </div>
                <h3 className={'font-semibold md:text-xl text-base group-hover:text-white transition'}>{title}</h3>
                <span className={'w-[70px] h-[4px] bg-primary rounded-[5px] mx-auto group-hover:bg-white transition'}/>
                <p className={'md:text-lg font-medium text-sm group-hover:text-white transition'}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
