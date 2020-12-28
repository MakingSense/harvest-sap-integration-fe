import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';

import { InvoiceService } from '../../core/invoice/invoice.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationType } from '../../core/notification/notification.type';

@Component({
  selector: 'app-invoices-save',
  templateUrl: './invoices-save.component.html',
  styleUrls: ['./invoices-save.component.sass']
})
export class InvoicesSaveComponent implements OnInit {

  @Input() clientId: number;
  @Input() projectId: number;
  @Input() from: Moment;
  @Input() to: Moment;

  constructor(
    private invoiceService: InvoiceService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  save() {
    const params = {
      client_id: this.clientId,
      project_id: this.projectId,
      from: this.from ? this.from.format('YYYY-MM-DD') : undefined,
      to: this.to ? this.to.format('YYYY-MM-DD') : undefined
    };

    this.invoiceService.save(params)
      .subscribe(result => {
        console.log(result);
        this.notificationService.notify(NotificationType.SUCCESS, 'Invoices were saved on SAP');
      });
  }
}
