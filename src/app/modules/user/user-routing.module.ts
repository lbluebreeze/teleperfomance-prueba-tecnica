import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
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
        canActivate: [AuthGuard],
        component: ListComponent,
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: AddComponent,
      },
      {
        path: 'edit',
        canActivate: [AuthGuard],
        component: EditComponent,
      },
    ],
  },
];

/**
 * Módulo encargado del enrutamiento dentro del módulo de usuarios
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
