import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionSelector } from './direccion-selector';

describe('DireccionSelector', () => {
  let component: DireccionSelector;
  let fixture: ComponentFixture<DireccionSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
