import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDP2Component } from './pdp2.component';

describe('PDP2Component', () => {
  let component: PDP2Component;
  let fixture: ComponentFixture<PDP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDP2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
