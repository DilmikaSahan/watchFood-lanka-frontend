import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerAssignedComplaintView } from './officer-assigned-complaint-view';

describe('OfficerAssignedComplaintView', () => {
  let component: OfficerAssignedComplaintView;
  let fixture: ComponentFixture<OfficerAssignedComplaintView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerAssignedComplaintView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerAssignedComplaintView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
