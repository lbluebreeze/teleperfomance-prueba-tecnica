import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/**
 * Componente principal para la lista de entidades
 */
@Component({
  selector: 'tp-list-base',
  templateUrl: './list-base.component.html',
  styleUrls: ['./list-base.component.sass']
})
export class ListBaseComponent implements OnInit {

  /**
   * Título de la lista
   */
  @Input()
  public title = '';

  /**
   * Crea una nueva instancia de @see ListBaseComponent
   */
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  /**
   * Método llamado por el botón regresar.
   * Se encarga de volver a la página anterior
   */
  public onBack(): void {
    this.location.back();
  }
}
