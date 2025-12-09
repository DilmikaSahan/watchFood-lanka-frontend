import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardMain } from './admin-dashboard-main';

describe('AdminDashboardMain', () => {
  let component: AdminDashboardMain;
  let fixture: ComponentFixture<AdminDashboardMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
