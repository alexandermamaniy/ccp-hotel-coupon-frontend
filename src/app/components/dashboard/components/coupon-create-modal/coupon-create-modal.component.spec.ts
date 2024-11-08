import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCreateModalComponent } from './coupon-create-modal.component';

describe('DashboardHotelierComponent', () => {
  let component: CouponCreateModalComponent;
  let fixture: ComponentFixture<CouponCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
