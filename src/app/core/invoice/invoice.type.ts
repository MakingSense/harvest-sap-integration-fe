import { HarvestPagedResponse } from '../http/http.type';

export interface Invoice {
    id: number;
    number: string;
    subject: string;
    client: {
        name: string;
    };
    creator: {
        name: string;
    };
}

export interface InvoicePagedResponse extends HarvestPagedResponse {
    invoices: Invoice[];
}

export interface InvoiceParams {
    client_id?: number;
    project_id?: number;
    from?: string;
    to?: string;
}

export interface InvoiceSearchParams extends InvoiceParams {
    page?: number;
    per_page?: number;
}
