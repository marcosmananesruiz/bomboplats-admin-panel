import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteAdder } from './restaurante-adder';

describe('RestauranteAdder', () => {
  let component: RestauranteAdder;
  let fixture: ComponentFixture<RestauranteAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteAdder],
    }).compileComponents();

    fixture = TestBed.createComponent(RestauranteAdder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
