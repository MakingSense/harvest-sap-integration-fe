import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesSaveComponent } from './invoices-save.component';

describe('InvoicesSaveComponent', () => {
  let component: InvoicesSaveComponent;
  let fixture: ComponentFixture<InvoicesSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
