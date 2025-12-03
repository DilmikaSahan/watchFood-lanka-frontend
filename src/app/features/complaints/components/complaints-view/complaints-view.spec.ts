import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplaintsView } from './complaints-view';

describe('ComplaintsView', () => {
  let component: ComplaintsView;
  let fixture: ComponentFixture<ComplaintsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
