import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionEditor } from './direccion-editor';

describe('DireccionEditor', () => {
  let component: DireccionEditor;
  let fixture: ComponentFixture<DireccionEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
