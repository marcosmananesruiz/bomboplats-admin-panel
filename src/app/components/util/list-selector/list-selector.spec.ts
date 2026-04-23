import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSelector } from './list-selector';

describe('ListSelector', () => {
  let component: ListSelector;
  let fixture: ComponentFixture<ListSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
