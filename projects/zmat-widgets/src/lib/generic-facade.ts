import { Observable } from 'rxjs';
import { ZmatLgridPagination, ApiMetaData } from './zmat-lgrid/zmat-pagination.model';

export abstract class GenericFacade
{
    all$: Observable<any[]>;
    selected_id$: Observable<any>;
    selected_ids$: Observable<any[]>;
    loading$: Observable<boolean>;
    picking_id$: Observable<number>;
    total$: Observable<number>;
    meta_data$: Observable<ApiMetaData>;
    last_pagination$: Observable<any>;
    loaded_at$: Observable<Date>;
    
    abstract select(id: any);

    abstract load(payload?: any, reset?: boolean);

    abstract pick(id: number);

    abstract destroy(id: number);

    abstract save(model: any);

    abstract index(): void;

    abstract edit(id: number): void;

    abstract show(id: number): void;

    abstract create(): void;

    abstract refresh(): void;

    abstract paginate(pagination: ZmatLgridPagination);

   // abstract download(pagination: Pagination);
}