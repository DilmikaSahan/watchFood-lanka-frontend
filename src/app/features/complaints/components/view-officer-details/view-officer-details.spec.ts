import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficerDetails } from './view-officer-details';

describe('ViewOfficerDetails', () => {
  let component: ViewOfficerDetails;
  let fixture: ComponentFixture<ViewOfficerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOfficerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
