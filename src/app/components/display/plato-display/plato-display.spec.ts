import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoDisplay } from './plato-display';

describe('PlatoDisplay', () => {
  let component: PlatoDisplay;
  let fixture: ComponentFixture<PlatoDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
