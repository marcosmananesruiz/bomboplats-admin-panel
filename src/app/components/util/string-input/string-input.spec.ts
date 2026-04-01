import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringInput } from './string-input';

describe('StringInput', () => {
  let component: StringInput;
  let fixture: ComponentFixture<StringInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringInput],
    }).compileComponents();

    fixture = TestBed.createComponent(StringInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
