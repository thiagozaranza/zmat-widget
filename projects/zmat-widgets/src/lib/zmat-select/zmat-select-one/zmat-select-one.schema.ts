export interface GetNumberPropertyFunc {
    (item: any): number;
}

export interface GetStringPropertyFunc {
    (item: any): string;
}

export interface ZmatSelectOneSchema {
    label: string;
    placeholder: string;        
    showIds?: any[];
    hideIds?: any[];
    getId: GetNumberPropertyFunc;
    getName: GetStringPropertyFunc;
}