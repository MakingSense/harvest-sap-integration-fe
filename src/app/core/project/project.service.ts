import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { ProjectPagedResponse, ProjectParams } from './project.type';

const PROJECTS_URL = `${environment.apiBaseUrl}/projects`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private httpService: HttpService
  ) { }

  search(params: ProjectParams) {
    const queryParams = this.httpService.getQueryParams(params);
    return this.httpService.get<ProjectPagedResponse>(PROJECTS_URL, { params: queryParams });
  }
}
