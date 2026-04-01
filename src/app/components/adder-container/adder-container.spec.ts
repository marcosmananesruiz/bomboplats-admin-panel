import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdderContainer } from './adder-container';

describe('AdderContainer', () => {
  let component: AdderContainer;
  let fixture: ComponentFixture<AdderContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdderContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(AdderContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
