import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountElementComponent } from './discount-element.component';

describe('DiscountElementComponent', () => {
  let component: DiscountElementComponent;
  let fixture: ComponentFixture<DiscountElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
