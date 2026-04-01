import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAdder } from './pedido-adder';

describe('PedidoAdder', () => {
  let component: PedidoAdder;
  let fixture: ComponentFixture<PedidoAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoAdder],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoAdder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
