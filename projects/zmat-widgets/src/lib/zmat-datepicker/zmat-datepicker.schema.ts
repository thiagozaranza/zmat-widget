export interface ZmatDatepickerEventFunc {
    (param: Date): void;
}

export interface ZmatDatepickerSchema {
    placeholder?: string;
    value?: Date;
    min?: Date,
    max?: Date
}

export function getDefaultZmatDatepickerSchema(): ZmatDatepickerSchema {
    return {
        placeholder: 'Selecione a data',
        value: new Date(),
        min: new Date('1900/1/1'),
        max: new Date('2099/12/31'),
    }
}