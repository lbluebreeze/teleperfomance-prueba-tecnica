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
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HobbyComponent } from './components/hobby/hobby.component';
import { MatListModule } from '@angular/material/list';
import { HobbyApiService } from 'src/app/services/hobby/hobby.api.service';

/**
 * Módulo encargado de la administración de usuarios
 */
@NgModule({
  declarations: [UserComponent, ListComponent, AddComponent, EditComponent, HobbyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BaseModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,
  ],
  providers: [
    UserFacade,
    UserState,
    HobbyApiService,
  ],
})
export class UserModule { }
