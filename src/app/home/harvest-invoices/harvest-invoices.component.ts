import { AfterViewInit, Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Moment } from 'moment';

import { HarvestInvoicesDataSource } from './harvest-invoices-datasource';
import { InvoiceService } from '../../core/invoice/invoice.service';
import { Invoice } from '../../core/invoice/invoice.type';

@Component({
  selector: 'app-harvest-invoices',
  templateUrl: './harvest-invoices.component.html',
  styleUrls: ['./harvest-invoices.component.css']
})
export class HarvestInvoicesComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Invoice>;
  dataSource: HarvestInvoicesDataSource;
  @Input() clientId: number;
  @Input() projectId: number;
  @Input() from: Moment;
  @Input() to: Moment;

  displayedColumns = ['id', 'number', 'subject', 'client', 'creator'];

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.dataSource = new HarvestInvoicesDataSource(this.invoiceService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges) {
    const hasChanged = Object.keys(changes).some(key => changes[key].previousValue !== changes[key].currentValue);

    if (hasChanged) {
      this.dataSource.searchParams.next({
        client_id: this.clientId,
        project_id: this.projectId,
        from: this.from ? this.from.format('YYYY-MM-DD') : undefined,
        to: this.to ? this.to.format('YYYY-MM-DD') : undefined
      });
    }
  }
}
