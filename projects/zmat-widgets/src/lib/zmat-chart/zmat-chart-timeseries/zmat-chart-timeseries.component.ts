import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import {  ZmatChartSerieSchema, ZmatChartSchema } from '../zmap-chart.schema';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'zmat-chart-timeseries',
  templateUrl: './zmat-chart-timeseries.component.html',
  styleUrls: ['./zmat-chart-timeseries.component.css']
})
export class ZmatChartTimeseriesComponent implements OnInit, OnDestroy{

  chart = [];

  @Input() schema: ZmatChartSchema;

  private subscriptions = new Subscription();

  private _data = new BehaviorSubject<ZmatChartSerieSchema[]>([]);

  @Input()
  set data(value) {    
    this._data.next(value);
  };

  get data() {
    return this._data.getValue();
  }

  private _visible = new BehaviorSubject<boolean>(true);

  @Input()
  set visible(value) {    
    this._visible.next(value);
  };

  get visible() {
    return this._visible.getValue();
  }

  public targetDiv: string;

  constructor(
    private elementRef:ElementRef) 
  { 
    this.subscriptions.add(
      this._data.subscribe(values => {
        if (!this.schema || !this.data) return;
        
        this.targetDiv = 'div-' + this.schema.target;
        
        if (this.visible)
          this.createCanvas();
      })
    ).add(
      this._visible.subscribe(value => {
        if (value)
          this.createCanvas();
        else
          this.clearCanvas();  
      })
    );
  }

  public reload()
  {
    this.clearCanvas();
  }

  private clearCanvas()
  {
    let _canvas = this.elementRef.nativeElement.querySelector('canvas');
    while (_canvas = this.elementRef.nativeElement.querySelector('canvas')) {
      _canvas.remove();
      _canvas = this.elementRef.nativeElement.querySelector('canvas');
    }
  }

  ngOnInit() {
    this.clearCanvas();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getResults(results, colors, combo_chart = false) {

    const result = [];
    results.forEach((item, index) => {
      result.push(
        {
          data: item.data,
          borderColor: colors[index],
          fill: false,
          label: item.label,
          backgroundColor: colors[index],
        }
      );
    });
    return result;
  }

  private getDatasets()
  {
    let datasets = [];

    if (!this.data)
      return;

    this.data.forEach((_serie, index) => {

      datasets.push({
        data: _serie.serie.map(item => {
          return {
            x: moment(item.x, moment.ISO_8601).toDate(),
            y: item.y
          };
        }),
        borderColor: this.schema.datasets[index].color,
        fill: false,
        label: this.schema.datasets[index].label,
        type: this.schema.type,
        backgroundColor: this.schema.datasets[index].color,
      })
    });

    return datasets;
  }

  private createCanvas()
  {
    this.clearCanvas();

    let interval = window.setInterval(() => {
      try {
        if (!this.schema || !this.schema.target)
          return;
          
        let _canvas = this.elementRef.nativeElement.querySelector('#' + this.schema.target);
        if (_canvas)
          _canvas.remove();

        let _div = this.elementRef.nativeElement.querySelector('#' + this.targetDiv);
        _div.insertAdjacentHTML('afterbegin', '<canvas id="'+this.schema.target+'" width="100%"></canvas>');

        this.draw();

        clearInterval(interval);
      } catch (error) {
        console.log('error');
      }
    }, 300);
  }

  private draw() 
  {
    this.chart = new Chart(this.schema.target, {
      type: this.schema.type,
      data: {
        labels: (this.data && this.data.length)? this.data[0].serie.map(dado => dado.x) : [],
        datasets: this.getDatasets()
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
            distribution: 'series',
            ticks: {
              beginAtZero: false
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: false
            }
          }],
        },
        spanGaps: false,
        tooltips: {
          callbacks: {
            title: () => {
              return this.schema.title;
            },
            // beforeLabel: (tooltipItem, data) => {
            //   const dt = new Date(tooltipItem.xLabel);
            //   return ('00' + dt.getDate().toString()).slice(-2) + '/' + ('00' + (dt.getMonth() + 1).toString()).slice(-2) +
            //     '/' + dt.getFullYear() + ' ' + ('00' + dt.getHours().toString()).slice(-2) + ':' +
            //     ('00' + dt.getMinutes().toString()).slice(-2);
            // }
          }
        },
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Enable drag-to-zoom behavior
          drag: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'xy',
          rangeMin: {
            // Format of min zoom range depends on scale type
            x: null,
            y: null
          },
          rangeMax: {
            // Format of max zoom range depends on scale type
            x: null,
            y: null
          }
        }
      }
    });
  }
}
