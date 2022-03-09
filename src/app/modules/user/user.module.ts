import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListComponent } from './components/list/list.component';
import { BaseModule } from 'src/app/components/base/base.module';
import { UserFacade } from './facade/user.facade';
import { UserState } from './state/user.state';
import { AppState } from 'src/app/core/app.state';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppFacade } from 'src/app/core/app.facade';

/**
 * Módulo encargado de la administración de usuarios
 */
@NgModule({
  declarations: [UserComponent, ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BaseModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [
    UserFacade,
    UserState,
    AppFacade,
    AppState,
  ],
})
export class UserModule { }
