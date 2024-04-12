

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
            href: "",
        },
        instagram: {
            href: "",
        },
    },
    backendBase: 'http://80.89.230.106:8100',
    cookieKeys: {
        apartmentFormSearch: 'apartmentFormSearch',
        checkoutData: 'apartmentCheckoutData',
    },
    defaultPhoneNumberCountry: 'ae',
    stripe: {
        publishableKey: 'pk_test_51P3kGj093JOWy8mAZV1mRUcZQKDqjbRaZBL6Uutbm6ZNlkatf9nZDHitfgwbOw6JyxqOQq7JjgbrgrFojOF7RuYt001pxlIbwU',
        appearance: {
            theme: 'flat'
        },
    },
    defaultCurrency: 'USD',
};

export default appConfig;
