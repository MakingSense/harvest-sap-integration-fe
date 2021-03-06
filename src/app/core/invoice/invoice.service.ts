import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import {
  InvoicePagedResponse,
  InvoiceParams,
  InvoiceSearchParams,
  SAPInvoice
} from './invoice.type';
import { ResponseItem } from '../http/http.type';

const INVOICES_URL = `${environment.apiBaseUrl}/invoices`;
const INVOICES_IMPORT_URL = `${environment.apiBaseUrl}/invoices/import`;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpService: HttpService
  ) { }

  search(params: InvoiceSearchParams) {
    const queryParams = this.httpService.getQueryParams(params);
    return this.httpService.get<InvoicePagedResponse>(INVOICES_URL, { params: queryParams });
  }

  save(params: InvoiceParams) {
    return this.httpService.post<ResponseItem<SAPInvoice>[]>(INVOICES_IMPORT_URL, params, {});
  }
}
