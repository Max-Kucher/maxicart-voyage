'use client';
import React from 'react';
import {usePathname} from "@/navigation";

const PageNavigation = () => {
    const pathname = usePathname()
    const x = {
        rent: 'Снять',
    }
    return (
        <div>
            {pathname.split('/')?.map((p, i) => (
                <span key={i}>{p ? x?.[p as keyof typeof x] : 'Home' }/</span>
            ))}
        </div>
    );
};

export default PageNavigation;
