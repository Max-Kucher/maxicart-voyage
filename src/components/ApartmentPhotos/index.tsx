'use client'
import React, {FC} from 'react';
import {cn} from '@/src/lib/utils';
import Image from "next/image";
import {
   Lightbox,
} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ApartmentPhotosProps {
    images: string[]
}



const ApartmentPhotos: FC<ApartmentPhotosProps> = ({images}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div
                className={cn('grid grid-cols-3 gap-[20px] [&>div:first-child]:!col-span-3 [&>div:first-child]:!row-span-2 [&>div]:col-span-1 [&>div]:cursor-pointer', images.length > 4 && '[&>div:last-child>div.watch-more]:!inline-block')}>
                {images.slice(0, 4).map((image, i) => {
                    return (
                        <div onClick={() => setOpen(true)} key={i} className={cn('rounded-lg', images.length > 4 && 'relative')}>
                            <div
                                className={'absolute top-0 left-0 w-full h-full bg-black opacity-60 hover:opacity-50 watch-more hidden rounded-lg active:!opacity-30 transition-opacity'}/>
                            <div
                                className={'pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-4xl font-extrabold watch-more hidden'}>{images.slice(4, images.length).length}+
                            </div>
                            <Image width={800} height={2100} className={'rounded-lg w-full object-cover'} alt={''} src={image}/>
                        </div>
                    )
                })}
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={images.map((image, i) => {
                    return {src: image, key: i};
                })}
            />
        </>
    );
};

export default ApartmentPhotos;
