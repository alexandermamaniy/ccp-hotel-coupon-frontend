import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotelierReportComponent } from './dashboard-hotelier-report.component';

describe('DashboardHotelierReportComponent', () => {
  let component: DashboardHotelierReportComponent;
  let fixture: ComponentFixture<DashboardHotelierReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHotelierReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHotelierReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
