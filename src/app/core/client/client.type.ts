import { HarvestPagedResponse } from '../http/http.type';

export interface Client {
    id: number;
    name: string;
}

export interface ClientPagedResponse extends HarvestPagedResponse {
    clients: Client[];
}
