import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionAdder } from './direccion-adder';

describe('DireccionAdder', () => {
  let component: DireccionAdder;
  let fixture: ComponentFixture<DireccionAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionAdder],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionAdder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
