import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoEditor } from './plato-editor';

describe('PlatoEditor', () => {
  let component: PlatoEditor;
  let fixture: ComponentFixture<PlatoEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
