import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookBookComponent } from './look-book.component';

describe('LookBookComponent', () => {
  let component: LookBookComponent;
  let fixture: ComponentFixture<LookBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LookBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
