'use client';
import React, {FC} from 'react';
import {Link, usePathname} from "@/navigation";
import {useTranslations} from 'next-intl';


interface PageNavigationProps {
    nameSpace?: string
}

const PageNavigation: FC<PageNavigationProps> = ({nameSpace}) => {
    const t = useTranslations('navigationNameSpace');
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    const lastPath = {
        home: t('home'),
        rent: t('rent'),
        book: t('book'),
    }
    return (
        <div>
            <Link href={'/'}>
                <span className={'capitalize text-sm md:text-lg text-foreground-secondary'}>{lastPath.home} / </span>
            </Link>
            {
                pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    const text = lastPath[link as keyof typeof lastPath] ?? nameSpace ?? link

                    return (
                        pathNames.length === index + 1 ?
                            <span key={`page-navigation-${index}`} className={'capitalize text-sm md:text-lg text-primary opacity-80'}>{text}{pathNames.length !== index + 1 && ' / '}</span> :
                            <Link href={href} key={`page-navigation-${index}`}>
                                <span className={'capitalize text-sm md:text-lg text-foreground-secondary'}>{text}{pathNames.length !== index + 1 && ' / '}</span>
                            </Link>
                    )
                })
            }
        </div>
    )
};

export default PageNavigation;
