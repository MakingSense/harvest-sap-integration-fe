import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SAPInvoice } from '../../core/invoice/invoice.type';
import { ResponseItem } from '../../core/http/http.type';

@Component({
  selector: 'app-import-review',
  templateUrl: './import-review.component.html',
  styleUrls: ['./import-review.component.sass']
})
export class ImportReviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResponseItem<SAPInvoice>[]
  ) { }

  displayedColumns = ['id', 'number', 'status', 'message'];

  ngOnInit(): void {
  }

}
