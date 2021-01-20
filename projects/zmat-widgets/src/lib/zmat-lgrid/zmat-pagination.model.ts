export interface ZmatLgridPagination {
    paginator: ZmatLgridPaginator;
    filter_list: any;
    with_list: string[];
    fetch_list: string[];
}

export function getPaginationDefault(): ZmatLgridPagination {
    return {
        paginator: {
            limit: 10,
            order_by: 'nome',
            page: 1
        },    
        filter_list: {}, 
        with_list: [],    
        fetch_list: []
    }
};

export function paginationEquals(new_pagination: ZmatLgridPagination, last_pagination: ZmatLgridPagination): boolean 
{   
    if (!last_pagination)
        return false;        
    else if (new_pagination.paginator.page != last_pagination.paginator.page)
        return false;
    else if (new_pagination.paginator.order_by != last_pagination.paginator.order_by)
        return false; 
    else if (new_pagination.paginator.limit != last_pagination.paginator.limit)
        return false; 
    else if (new_pagination.fetch_list.toString() != last_pagination.fetch_list.toString())
        return false;     
    else if (new_pagination.with_list.toString()!= last_pagination.with_list.toString())        
        return false;   
    else {        
        if (Object.keys(new_pagination.filter_list).length != Object.keys(last_pagination.filter_list).length)
            return false;

        let equals = true;

        Object.keys(new_pagination.filter_list).forEach((key) => {            
            if (!new_pagination.filter_list.hasOwnProperty(key) || (new_pagination.filter_list[key] != last_pagination.filter_list[key])) {
                equals = false;
                return;
            }
        });

        return equals;   
    }
}

export interface ZmatLgridPaginator {
    limit: number,
    order_by: string,
    page: number
}

export interface ApiResponse<K> {
    meta: ApiMetaData;
    data: ApiPayload<K>;
}

export interface ApiPayload<K> {
    total_results: number;
    total_pages: number;
    list: K[];
}

export interface ApiMetaData {
    cache: ApiCacheMeta;
    request: ApiRequest;
}

export interface ApiCacheMeta {
    built_in: number;
    cached_at: Date;
    expires_at: number;
    from_cache: boolean;
    queue_in: number;
    queued_at: Date;
}

export interface ApiRequest {
    URN: string;
    action: string;
    cache_options: CacheOptions;
    model: string;
    oauth_info: OauthInfo;
    query_params: ZmatLgridPagination;
}

export interface CacheOptions {
    is_public: boolean;
    max_age: number;
    no_store: boolean;
    only_if_cached: boolean;
    use_cache: boolean;
}

export interface OauthInfo {
    client_id: number;
    user_id: number;
}

export function paginationToString(pagination: ZmatLgridPagination): string
{
    if (!pagination)
        return;

    let query = 'page=' + pagination.paginator.page;

    if (pagination.paginator.limit)
        query += '&limit=' + pagination.paginator.limit;

    if (pagination.paginator.order_by)
        query += '&orderBy=' + pagination.paginator.order_by;

    Object.keys(pagination.filter_list).forEach((key) => { 
        if (pagination.filter_list[key])
            query += '&' + key + '=' + pagination.filter_list[key];
    });

    if (pagination.with_list.length)
        query += '&with=' + pagination.with_list.join(',');
    
    if (pagination.fetch_list.length)
        query += '&fetch=' + pagination.fetch_list.join(',');

    return query;
}