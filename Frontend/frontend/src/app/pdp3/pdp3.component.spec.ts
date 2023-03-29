import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDP3Component } from './pdp3.component';

describe('PDP3Component', () => {
  let component: PDP3Component;
  let fixture: ComponentFixture<PDP3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDP3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
