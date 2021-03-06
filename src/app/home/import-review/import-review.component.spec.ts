import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportReviewComponent } from './import-review.component';

describe('ImportReviewComponent', () => {
  let component: ImportReviewComponent;
  let fixture: ComponentFixture<ImportReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
