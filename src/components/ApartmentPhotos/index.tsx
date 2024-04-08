'use client'
import React, {FC} from 'react';
import {cn} from '@/src/lib/utils';
import "yet-another-react-lightbox/styles.css";
interface ApartmentPhotosProps {
    images: string[]
}

import Image from "next/image";
import {
    isImageFitCover,
    isImageSlide, Lightbox,
    useLightboxProps,
    useLightboxState,
} from "yet-another-react-lightbox";

function isNextJsImage(slide: any) {
    return (
        isImageSlide(slide) &&
        typeof slide.width === "number" &&
        typeof slide.height === "number"
    );
}

function NextJsImage({slide, offset, rect}: any) {
    const {
        on: {click},
        carousel: {imageFit},
    } = useLightboxProps();

    const {currentIndex} = useLightboxState();

    const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

    if (!isNextJsImage(slide)) return undefined;

    const width = !cover
        ? Math.round(
            Math.min(rect.width, (rect.height / slide.height) * slide.width),
        )
        : rect.width;

    const height = !cover
        ? Math.round(
            Math.min(rect.height, (rect.width / slide.width) * slide.height),
        )
        : rect.height;

    return (
        <div style={{position: "relative", width, height}}>
            <Image
                fill
                alt=""
                src={slide}
                loading="eager"
                draggable={false}
                placeholder={slide.blurDataURL ? "blur" : undefined}
                style={{
                    objectFit: cover ? "cover" : "contain",
                    cursor: click ? "pointer" : undefined,
                }}
                sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
                onClick={
                    offset === 0 ? () => click?.({index: currentIndex}) : undefined
                }
            />
        </div>
    );
}

const ApartmentPhotos: FC<ApartmentPhotosProps> = ({images}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div
                className={cn('grid grid-cols-3 gap-[20px] [&>div:first-child]:!col-span-3 [&>div:first-child]:!row-span-2 [&>div]:col-span-1 [&>div]:cursor-pointer', images.length > 4 && '[&>div:last-child>div.watch-more]:!inline-block')}>
                {images.slice(0, 4).map((image, i) => {
                    return (
                        <div key={i} className={cn('rounded-lg', images.length > 4 && 'relative')}>
                            <div onClick={() => setOpen(true)}
                                className={'absolute top-0 left-0 w-full h-full bg-black opacity-60 hover:opacity-50 watch-more hidden rounded-lg active:!opacity-30 transition-opacity'}/>
                            <div
                                className={'pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-4xl font-extrabold watch-more hidden'}>{images.slice(4, images.length).length}+
                            </div>
                            <Image width={800} height={200} className={'rounded-lg w-full'} alt={'sadasdasdasd'} src={image}/>
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
                render={{slide: NextJsImage}}
            />
        </>
    );
};

export default ApartmentPhotos;
