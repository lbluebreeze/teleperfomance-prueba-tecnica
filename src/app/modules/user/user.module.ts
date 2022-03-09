import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListComponent } from './components/list/list.component';
import { BaseModule } from 'src/app/components/base/base.module';

/**
 * Módulo encargado de la administración de usuarios
 */
@NgModule({
  declarations: [UserComponent, ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BaseModule,
  ]
})
export class UserModule { }
