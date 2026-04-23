import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { DisplayContainer } from './components/display-container/display-container';
import { AdderContainer } from './components/adder-container/adder-container';
import { EditorContainer } from './components/editor-container/editor-container';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'display', component: DisplayContainer },
  { path: 'adder', component: AdderContainer },
  { path: 'editor', component: EditorContainer },
];
