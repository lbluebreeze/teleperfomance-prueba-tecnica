import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { UserComponent } from './user.component';

/**
 * Rutas disponibles dentro de la aplicación
 */
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListComponent,
      },
    ]
  }
];

/**
 * Módulo encargado del enrutamiento dentro del módulo de usuarios
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
