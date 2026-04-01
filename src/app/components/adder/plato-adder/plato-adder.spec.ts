import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoAdder } from './plato-adder';

describe('PlatoAdder', () => {
  let component: PlatoAdder;
  let fixture: ComponentFixture<PlatoAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoAdder],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoAdder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
