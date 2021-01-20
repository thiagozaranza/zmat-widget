
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import KML from 'ol/format/KML.js';
import { defaults as defaultControls, Attribution } from 'ol/control.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style.js';
import { fromLonLat, transform } from 'ol/proj.js';
import { ZmatMapSchema, PointSchema } from '../zmat-map.schema';

@Component({
  selector: 'zmat-map',
  templateUrl: './zmat-map.component.html',
  styleUrls: ['./zmat-map.component.css']
})
export class ZmatMapComponent implements OnInit, OnDestroy {

  private booted: boolean = false;

  private markersVector;

  public points: PointSchema[] = [];

  private mapClickListener = new Subject<any>();
  public  mapClickListener$ = this.mapClickListener.asObservable();

  private mapDoubleClickListener = new Subject<any>();
  public  mapDoubleClickListener$ = this.mapDoubleClickListener.asObservable();

  private schema: ZmatMapSchema;
  private data: any[];

  public map: any;

  public popupOverlay: Overlay;

  private subscriptions = new Subscription();
  
  @ViewChild('popup', { static: true }) popup: ElementRef;

  constructor() { 
    console.log('ZmatMapComponent constructor()');
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getMap() {
    return this.map;
  }

  public boot(schema: ZmatMapSchema, data?: any[]) {

    this.schema = schema;

    console.log('ZmatMapComponent init()');

    if (this.booted) {
      this.plot(data);
      return;
    }

    this.parseOptions();

    const attribution = new Attribution({
      collapsible: false
    });

    this.map = new Map({
      target: '_map_',
      layers: [
        new TileLayer({
          source: this.schema.source
        }),
        new VectorLayer({
          source: new VectorSource({
            url: 'http://f3.funceme.br:9000/assets/kml/regioes_hidrograficas_20200413.kml',
            format: new KML()
          })
        })
      ],
      loadTilesWhileAnimating: true,
      //overlays: [this.overlay],
      view: new View({
        center: fromLonLat(this.schema.center),
        zoom: this.schema.zoom,
        minZoom: this.schema.minZoom,
        maxZoom: 19
      }),
      controls: defaultControls({
        attribution: false
      }).extend([attribution])
    });

    this.popupOverlay = new Overlay({
      element: this.popup.nativeElement,
      offset: [9, 9]
    });

    this.map.getTargetElement().hidden = false;

    this.map.addOverlay(this.popupOverlay);

    this.booted = true;

    if (data)
      this.plot(data);

    return this;
  }

  public changeZoomInit() {
    this.map.getView().setCenter([-39, -5]);
  }

  private parseOptions() {
    this.schema.center  = (this.schema.center)  ? this.schema.center  : [0, 0];
    this.schema.source  = (this.schema.source)  ? this.schema.source  : this.getDefautSourceMap();
    this.schema.zoom    = (this.schema.zoom)    ? this.schema.zoom    : this.getInitialMaxZoom('_map_');
    this.schema.minZoom = (this.schema.minZoom) ? this.schema.minZoom : this.getMinZoom('_map_');
    this.schema.marker  = (this.schema.marker)  ? this.schema.marker  : 'assets/img/reservatorio.png';
  }

  private getDefautSourceMap() {
    // return new XYZ({
    //    url: 'http://tiles.funceme.br/styles/klokantech-basic/{z}/{x}/{y}.png',
    //    maxZoom: 18
    // });
    return new OSM();
  }

  private getSatteliteSourceMap() {
    return new XYZ({
      attributions: ['Powered by Esri',
        'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
      attributionsCollapsible: false,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 18
    });
  }

  public setMapSource() {
    this.map.getLayers().getArray()[0].setSource(this.getDefautSourceMap());
  }

  public setSatelliteSource() {
    this.map.getLayers().getArray()[0].setSource(this.getSatteliteSourceMap());
  }

  private getMinZoom(targetId) {
    const viewport: any = document.getElementById(targetId);
    const width = viewport.clientWidth;
    return Math.ceil(Math.LOG2E * Math.log(width / 80));
  }

  private getInitialMaxZoom(targetId) {
    const viewport: any = document.getElementById(targetId);

    if (!viewport)
      return;

    const width = viewport.clientWidth;

    return Math.ceil(Math.LOG2E * Math.log(width / 30));
  }

  public createImageMarker(data: any, asset: string, coord, color: string) {
    var imageMarker = new Feature({
      geometry: new Point(fromLonLat(coord)),
      data: data
    });

    imageMarker.setStyle(new Style({
      image: new Icon(({
        color: color,
        crossOrigin: 'anonymous',
        src: asset
      }))
    }));

    return imageMarker;
  }

  public createPopupOverlay(container, options) {
    return new Overlay({
      element: container,
      autoPan: options.hasOwnProperty("autoPan") ? options.autoPan : true,
      autoPanAnimation: {
        duration: options.hasOwnProperty("duration") ? options.duration : 250,
      }
    });
  }

  public createVectorLayer(features) {
    return new VectorLayer({
      source: new VectorSource({
        features: features
      })
    });
  }

  public removeVectorLayer(vectorLayer) {
    this.map.removeLayer(vectorLayer);
    return this;
  }

  public addDivOverlay(div) {
    this.map.addOverlay(div);
  }

  private clearMarkers()
  {
    if (this.markersVector)
        this.removeVectorLayer(this.markersVector);
  }

  public plot(data: any[]) {

    this.clearMarkers();

    this.points = this.schema.parsePointData(data);

    var markers = [];

    this.points.forEach(point => {

      var coord = [+point.lon, +point.lat];

      let color = this.schema.parseColor(point.data);

      markers.push(this.createImageMarker(point, this.schema.marker, coord, color));
    });

    this.markersVector = this.createVectorLayer(markers);

    this.addVectorLayer(this.markersVector, {
      on: {
        click: (point, coordinate) => {
          if (this.schema.onClick)
            this.schema.onClick(point);
        },
        dblclick: (point, coordinate) => {
          this.mapDoubleClickListener.next({
            coordinate: coordinate,
            data: point
          });
        },
        pointermove: () => { }
      }
    });
  }

  public addVectorLayer(vectorLayer, events) {
    this.map.addLayer(vectorLayer);

    var _map = this.map;
    var _popup = this.popup;
    var _popupOverlay = this.popupOverlay;

    if (events
      && events.hasOwnProperty('on')
      && events.on.hasOwnProperty('click')
      && typeof events.on.click == 'function'
    ) {
      this.map.on("singleclick", function (e) {
        var clicado = false;
        _map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
          if (!clicado && layer === vectorLayer) {
            var coordinate = e.coordinate;

            var hdms = transform(
              coordinate, 'EPSG:3857', 'EPSG:4326');

            events.on.click(feature.get('data'), coordinate);
          }

          clicado = true;
        });
      });
    }

    if (events
      && events.hasOwnProperty('on')
      && events.on.hasOwnProperty('dblclick')
      && typeof events.on.dblclick == 'function'
    ) {
      this.map.on("dblclick", function (e) {
        var clicado = false;
        _map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
          if (!clicado && layer === vectorLayer) {
            var coordinate = e.coordinate;

            var hdms = transform(
              coordinate, 'EPSG:3857', 'EPSG:4326');

            events.on.dblclick(feature.get('data'), coordinate);
          }

          clicado = true;
        });
      });
    }

    this.map.on("pointermove", function (e) {
      const element = _popup.nativeElement;

      let features = _map.getFeaturesAtPixel(e.pixel);

      if (features
        && features[0]
        && features[0].values_
        && features[0].values_.data
        && features[0].values_.data.name
      ) {
        element.innerHTML = features[0].values_.data.name;
        element.hidden = false;
        _popupOverlay.setPosition(e.coordinate);
      } else {
        element.innerHTML = '';
        element.hidden = true;
      }
    });
  }

}
