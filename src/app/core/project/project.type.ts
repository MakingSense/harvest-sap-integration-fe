import { HarvestPagedResponse } from '../http/http.type';

export interface Project {
    id: number;
    name: string;
    code: string;
}

export interface ProjectPagedResponse extends HarvestPagedResponse {
    projects: Project[];
}

export interface ProjectParams {
    client_id?: number;
}
