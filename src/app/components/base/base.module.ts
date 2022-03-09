import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from './components/list-base/list-base.component';
import { RouterModule } from '@angular/router';

/**
 * Módulo principal para los componentes base
 */
@NgModule({
  declarations: [
    ListBaseComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ListBaseComponent,
  ]
})
export class BaseModule { }
