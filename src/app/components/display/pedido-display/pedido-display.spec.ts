import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDisplay } from './pedido-display';

describe('PedidoDisplay', () => {
  let component: PedidoDisplay;
  let fixture: ComponentFixture<PedidoDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
