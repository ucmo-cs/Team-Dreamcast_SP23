import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDP1Component } from './pdp1.component';

describe('PDP1Component', () => {
  let component: PDP1Component;
  let fixture: ComponentFixture<PDP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDP1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
