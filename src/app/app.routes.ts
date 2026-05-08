import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { DisplayContainer } from './components/display-container/display-container';
import { AdderContainer } from './components/adder-container/adder-container';
import { EditorContainer } from './components/editor-container/editor-container';
import { Login } from './components/login/login';
import { UserDisplay } from './components/display/user-display/user-display';
import { DireccionDisplay } from './components/display/direccion-display/direccion-display';
import { PedidoDisplay } from './components/display/pedido-display/pedido-display';
import { PlatoDisplay } from './components/display/plato-display/plato-display';
import { RestauranteDisplay } from './components/display/restaurante-display/restaurante-display';
import { UserAdder } from './components/adder/user-adder/user-adder';
import { DireccionAdder } from './components/adder/direccion-adder/direccion-adder';
import { PedidoAdder } from './components/adder/pedido-adder/pedido-adder';
import { PlatoAdder } from './components/adder/plato-adder/plato-adder';
import { RestauranteAdder } from './components/adder/restaurante-adder/restaurante-adder';
import { UserEditor } from './components/editor/user-editor/user-editor';
import { DireccionEditor } from './components/editor/direccion-editor/direccion-editor';
import { PedidoEditor } from './components/editor/pedido-editor/pedido-editor';
import { PlatoEditor } from './components/editor/plato-editor/plato-editor';
import { RestauranteEditor } from './components/editor/restaurante-editor/restaurante-editor';
import { Unauthorized } from './components/unauthorized/unauthorized';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'display', component: DisplayContainer },
  { path: 'adder', component: AdderContainer },
  { path: 'editor', component: EditorContainer },

  { path: 'login', component: Login},
  { path: 'unauthorized', component: Unauthorized},
];
