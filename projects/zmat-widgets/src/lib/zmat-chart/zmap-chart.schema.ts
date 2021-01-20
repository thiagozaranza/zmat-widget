import { Moment } from 'moment';

export enum ZmatChartTypes {
    Line = 'line',
    Bar = 'bar'
}

export interface ZmatChartSchema {
    type: ZmatChartTypes;
    title: string;
    target: string;
    datasets: ZmatChartDatasetSchema[];    
}

export interface ZmatChartDatasetSchema {
    label: string;
    color: string;
}

export interface ZmatChartSerieSchema {
    name: any;
    serie: ZmatChartSerieItemSchema[];
}
export interface ZmatChartSerieItemSchema {
    x: Moment;
    y: number;
}