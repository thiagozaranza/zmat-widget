export interface ParseMarkerColorFunc {
    (param: any): string;
}

export interface ParsePointDataFunc {
    (param: any[]): PointSchema[];
}

export interface ZmatMapEventFunc {
    (param: any): void;
}

export interface ZmatMapSchema {
    center?: number[];
    zoom?: number;
    maxZoom?: number;
    minZoom?: number;
    source?: any;   
    marker?: any;
    parseColor?: ParseMarkerColorFunc;
    parsePointData?: ParsePointDataFunc;
    onClick?: ZmatMapEventFunc;
    onDoubleClick?: ZmatMapEventFunc;
}

export interface PointSchema {
    lon: number;
    lat: number;
    name: string;
    data: any;    
}


