import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLinkComponent } from './section-link.component';

describe('SectionLinkComponent', () => {
  let component: SectionLinkComponent;
  let fixture: ComponentFixture<SectionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
