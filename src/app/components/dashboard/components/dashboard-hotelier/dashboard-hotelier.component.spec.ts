import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotelierComponent } from './dashboard-hotelier.component';

describe('DashboardHotelierComponent', () => {
  let component: DashboardHotelierComponent;
  let fixture: ComponentFixture<DashboardHotelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHotelierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHotelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
