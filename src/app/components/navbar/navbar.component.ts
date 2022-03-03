import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  /**
   * Bandera que indica si se debe ocultar el control de menú lateral
   */
  public hideMenuControl = true;

  /**
   * Método encargado de alternar la bandera de control de menú @see hideMenuControl
   */
  toggleMenuControl(): void {
    this.hideMenuControl = !this.hideMenuControl
  }

  /**
   * Método que se dispara al cambiar el tamaño de la ventana.
   * Se encarga de ocultar el control de menú lateral
   */
  onResize(): void {
    this.hideMenuControl = true;
  }
}
