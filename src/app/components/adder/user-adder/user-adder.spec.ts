import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdder } from './user-adder';

describe('UserAdder', () => {
  let component: UserAdder;
  let fixture: ComponentFixture<UserAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdder],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
