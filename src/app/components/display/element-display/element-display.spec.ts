import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDisplay } from './element-display';

describe('ElementDisplay', () => {
  let component: ElementDisplay;
  let fixture: ComponentFixture<ElementDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ElementDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
