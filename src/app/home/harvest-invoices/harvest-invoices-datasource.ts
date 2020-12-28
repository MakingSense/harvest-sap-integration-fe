import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap, map, switchMap, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { InvoiceService } from '../../core/invoice/invoice.service';
import { Invoice } from '../../core/invoice/invoice.type';

interface SearchParams {
  client_id?: number;
  project_id?: number;
  from?: string;
  to?: string;
}

/**
 * Data source for the HarvestInvoices view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HarvestInvoicesDataSource extends DataSource<Invoice> {
  paginator: MatPaginator;
  sort: MatSort;
  totalPages: number;
  searchParams = new BehaviorSubject<SearchParams>({});
  loading = new BehaviorSubject(true);

  constructor(
    private invoiceService: InvoiceService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Invoice[]> {
    const dataMutations = [
      this.searchParams,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      switchMap(() => this.getData())
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  private getData() {
    const params = {
      ...this.searchParams.value,
      page: this.paginator.pageIndex + 1,
      per_page: this.paginator.pageSize
    };

    this.loading.next(true);

    return this.invoiceService.search(params).pipe(
      tap(result => {
        this.totalPages = result.total_entries;
      }),
      map(result => result.invoices),
      finalize(() => this.loading.next(false))
    );
  }

}
