import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEditor } from './pedido-editor';

describe('PedidoEditor', () => {
  let component: PedidoEditor;
  let fixture: ComponentFixture<PedidoEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
