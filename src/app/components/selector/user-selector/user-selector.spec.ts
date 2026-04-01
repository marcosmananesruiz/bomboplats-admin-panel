import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelector } from './user-selector';

describe('UserSelector', () => {
  let component: UserSelector;
  let fixture: ComponentFixture<UserSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
