import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListComponent } from './components/list/list.component';
import { BaseModule } from 'src/app/components/base/base.module';
import { UserFacade } from './facade/user.facade';
import { UserState } from './state/user.state';
import { AppState } from 'src/app/core/app.state';

/**
 * Módulo encargado de la administración de usuarios
 */
@NgModule({
  declarations: [UserComponent, ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BaseModule,
  ],
  providers: [
    UserFacade,
    UserState,
    AppState,
  ],
})
export class UserModule { }
