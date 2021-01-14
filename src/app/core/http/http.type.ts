import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

export interface HarvestPagedResponse {
    per_page: number;
    total_pages: number;
    total_entries: number;
    next_page: number | null;
    previous_page: number | null;
    page: number;
    links: {
        first: string;
        next: string | null;
        previous: string | null;
        last: string;
    };
}

interface ResponseSuccessItem<T> {
    status: 'success';
    value: T;
}

interface ResponseErrorItem {
    status: 'error';
    data: any;
    error: any;
}

export type ResponseItem<T> = ResponseSuccessItem<T> | ResponseErrorItem;
