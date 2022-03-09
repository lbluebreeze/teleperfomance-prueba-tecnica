import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { AppFacade } from 'src/app/core/app.facade';
import { UserDto } from 'src/app/models/user.dto';

/**
 * Guard encargado de validar si el usuario está logueado
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  private readonly facade: AppFacade;
  /**
   * A service that provides navigation and URL manipulation capabilities.
   */
  private readonly router: Router;
  /**
   * Información del usuario logueado
   */
  private readonly user: UserDto;

  /**
   * Crea una nueva instancia de @see AuthGuard
   */
  public constructor(facade: AppFacade, router: Router) {
    this.facade = facade;
    this.router = router;
    this.user = facade.user();
  }

  /**
   * Método que determina si el usuario está logueado y se le permite cargar el componente
   * @returns Verdadero si el usuario tiene el permiso sobre el componente, de lo contrario redirecciona
   * a la pantalla de bienvenida
   */
  public async canActivate(): Promise<boolean> {
    return this.facade.user$()
      .pipe(
        first(),
        map((response) => response.valid || false),
        tap((isValid) => {
          if (!isValid) {
            this.router.navigate(['']);
          }
        }),
      )
      .toPromise();
  }
}
