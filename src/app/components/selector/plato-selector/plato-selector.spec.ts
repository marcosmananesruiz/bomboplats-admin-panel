import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoSelector } from './plato-selector';

describe('PlatoSelector', () => {
  let component: PlatoSelector;
  let fixture: ComponentFixture<PlatoSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
