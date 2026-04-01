import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteEditor } from './restaurante-editor';

describe('RestauranteEditor', () => {
  let component: RestauranteEditor;
  let fixture: ComponentFixture<RestauranteEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(RestauranteEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
