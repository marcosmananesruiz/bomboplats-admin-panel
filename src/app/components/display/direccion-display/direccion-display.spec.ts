import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionDisplay } from './direccion-display';

describe('DireccionDisplay', () => {
  let component: DireccionDisplay;
  let fixture: ComponentFixture<DireccionDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
