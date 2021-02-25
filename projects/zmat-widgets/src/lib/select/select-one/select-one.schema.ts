export interface SelectOneSchema {
    label: string;
    placeholder: string;
    getId: (item: any) => number;
    getName: (item: any) => string;
};
