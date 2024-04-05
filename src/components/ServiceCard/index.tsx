import React, {FC} from 'react';
import Image from "next/image";

interface ServiceCardProps {
    image: string
    title: string
    description: string
}
const ServiceCard: FC<ServiceCardProps> = ({image, description, title}) => {

    return (
        <div className={'w-full py-[30px] px-[21px] rounded-xl bg-background'}>
            <div className="flex flex-col gap-[20px] text-center">
                <div className={'mx-auto'}>
                    <Image src={image} alt={title} width={80} height={80}/>
                </div>
                <h3 className={'font-semibold text-xl'}>{title}</h3>
                <span className={'w-[70px] h-[4px] bg-primary rounded-[5px] mx-auto'}/>
                <p className={'text-lg font-medium'}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
