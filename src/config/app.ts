
export const isProd: boolean = process.env.NODE_ENV === 'production';
export const BackendBaseUrl: string = process.env?.BACKEND_BASE_URL?.length ? process.env.BACKEND_BASE_URL : 'https://evavoyage.com';

const appConfig = {
    supportedLanguages: {
        ru: {},
        en: {},
    },
    contacts: {
        email: {
            display: 'info@evavoyage.com',
        },
        phone: {
            display: "+(971)-52-426-0462",
            href: "+971524260462",
        },
        location: {
            display: "location.displayTitle",
        },
        whatsapp: {
            href: "https://wa.me/971524260462",
        },
        instagram: {
            ru: {
                href: "https://www.instagram.com/evaholidayhomes?utm_source=voyage_website",
            },
            en: {
                href: "https://www.instagram.com/eva.holidayhomes?utm_source=voyage_website",
            },
        },
    },
    backendBase: BackendBaseUrl,
    cookieKeys: {
        apartmentFormSearch: 'apartmentFormSearch',
        checkoutData: 'apartmentCheckoutData',
    },
    defaultPhoneNumberCountry: 'ae',
    stripe: {
        publishableKey: 'pk_live_51NsL5sLL0iUcKfOZ5LnIRGO5tsljuH2aO2xNAMDFpp29vmH63x9Vr765JRDY88vKpu7pmAsg5hGDcobn3pLvGvVi00psy7pjLm',
        appearance: {
            theme: 'flat'
        },
    },
    defaultCurrency: 'USD',
};

export default appConfig;
