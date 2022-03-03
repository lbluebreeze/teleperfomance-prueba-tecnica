import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

/**
 * Rutas disponibles en la aplicacion
 */
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

/**
 * Módulo encargado del enrutamiento de componentes en la aplicación
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
