import { Component } from '@angular/core';

/**
 * Componente de bienvenida
 */
@Component({
  selector: 'tp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  /**
   * Lista de entradas falsas
   */
  public readonly fakeEntries = new Array(5);
}
