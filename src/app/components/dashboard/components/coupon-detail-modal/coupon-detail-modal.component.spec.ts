import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDetailModalComponent } from './coupon-detail-modal.component';

describe('DashboardHotelierComponent', () => {
  let component: CouponDetailModalComponent;
  let fixture: ComponentFixture<CouponDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
