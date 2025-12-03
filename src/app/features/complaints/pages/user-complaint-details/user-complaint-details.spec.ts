import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComplaintDetails } from './user-complaint-details';

describe('UserComplaintDetails', () => {
  let component: UserComplaintDetails;
  let fixture: ComponentFixture<UserComplaintDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComplaintDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComplaintDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
