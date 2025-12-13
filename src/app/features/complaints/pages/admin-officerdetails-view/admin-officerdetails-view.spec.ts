import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfficerdetailsView } from './admin-officerdetails-view';

describe('AdminOfficerdetailsView', () => {
  let component: AdminOfficerdetailsView;
  let fixture: ComponentFixture<AdminOfficerdetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOfficerdetailsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOfficerdetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
