import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppFacade } from 'src/app/core/app.facade';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'tp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  private readonly facade: AppFacade;
  /**
   * A service that provides navigation among views and URL manipulation capabilities.
   */
  private readonly router: Router;
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = new Observable<UserModel>();
  /**
   * Bandera que indica si se debe ocultar el control de menú lateral
   */
  public hideMenuControl = true;

  /**
   * Crea una nueva instancia de @see NavbarComponent
   */
  public constructor(facade: AppFacade, router: Router) {
    this.facade = facade;
    this.router = router;

    this.user$ = this.facade.user$();
  }

  /**
   * Método encargado de alternar la bandera de control de menú @see hideMenuControl
   */
  public toggleMenuControl(): void {
    this.hideMenuControl = !this.hideMenuControl
  }

  /**
   * Método que se dispara al cambiar el tamaño de la ventana.
   * Se encarga de ocultar el control de menú lateral
   */
  public onResize(): void {
    this.hideMenuControl = true;
  }

  /**
   * Método que se dispara al pulsar la opción "Login"
   */
  public onNavigate(path: string): void {
    this.hideMenuControl = true;
    this.router.navigate([path]);
  }
}
