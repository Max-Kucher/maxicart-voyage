
export default interface SearchApartmentsFormData {
    date: {
        from?: Date;
        to?: Date;
    };
    general: {
        room?: number;
        adult?: number;
        child?: number;
    };
    price?: {
        from?: number;
        to?: number;
    };
    addons?: number[];
};
