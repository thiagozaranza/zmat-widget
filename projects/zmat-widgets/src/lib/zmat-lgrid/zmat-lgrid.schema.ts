export interface GetPropertyFunc {
    (item: any): any;
}

export interface ZmatLGridSchema {
    columns: ZmatLGridColumnSchema[];
    actions: ZmatLGridActionSchema[];
}

export interface ZmatLGridColumnSchema {
    title: string,
    field: string,
    ordenable?: boolean,
    render: any,        
    getData: GetPropertyFunc
}

export interface ZmatLGridActionSchema {
    title: string,
    label: string,
    color: string,
    icon: string,    
    render: any,
    action:  GetPropertyFunc,          
    getData: GetPropertyFunc
}