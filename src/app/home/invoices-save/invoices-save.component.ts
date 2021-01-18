import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { InvoiceService } from '../../core/invoice/invoice.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationType } from '../../core/notification/notification.type';
import { ImportReviewComponent } from '../import-review/import-review.component';

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

  saving = new BehaviorSubject(false);

  constructor(
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private dialog: MatDialog
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

    this.saving.next(true);

    this.invoiceService.save(params)
      .pipe(
        finalize(() => this.saving.next(false))
      )
      .subscribe(results => {
        const counts = results.reduce((totals, result) => {
          totals[result.status] += 1;
          return totals;
        }, { success: 0, error: 0 });

        const countsMessage = `${counts.success} saved successfully, ${counts.error} errored`;

        this.notificationService.notify(NotificationType.SUCCESS, `Invoices were saved on SAP. ${countsMessage}`);

        this.dialog.open(ImportReviewComponent, {
          data: results,
          width: '100%',
          height : 'auto'
        });
      });
  }
}
