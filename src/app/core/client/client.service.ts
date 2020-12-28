import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { ClientPagedResponse } from './client.type';

const CLIENTS_URL = `${environment.apiBaseUrl}/clients`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private httpService: HttpService
  ) { }

  search() {
    return this.httpService.get<ClientPagedResponse>(CLIENTS_URL, { });
  }
}
