import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ZmatChartSerieSchema } from '../zmap-chart.schema';

@Injectable()
export class ZmatChartTimeseriesService {
    
    seriesToArray(series: ZmatChartSerieSchema[]): any[] {

        let dataX = series[0].serie.map(value => moment(value.x).format('DD/MM/YYYY HH:mm'));
        let dataY = [];

        dataX.forEach(value => dataY[value] = [value]);

        series.forEach(item => {
            item.serie.forEach(value => {       
            dataY[moment(value.x).format('DD/MM/YYYY HH:mm')].push(value.y);
            })
        });

        let data = [];

        Object.values(dataY).map(value => {

            let obj = {};

            for (let index = 0; index < value.length; index++) {
                obj['value_' + index] = value[index];        
            }        
            data.push(obj);
        });

        return data;
    }
}