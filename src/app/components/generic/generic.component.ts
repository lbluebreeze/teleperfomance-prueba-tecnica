import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'tp-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.sass']
})
export class GenericComponent {
  /**
   * Título de la página genérica
   */
  @Input()
  public title = '';

  /**
   * Crea una nueva instancia de @see GenericComponent
   */
  public constructor(private location: Location) { }

  /**
   * Método llamado por el botón regresar.
   * Se encarga de volver a la página anterior
   */
  public onBack(): void {
    this.location.back();
  }
}
