import { Injectable } from '@angular/core';
import { AppState } from 'src/app/core/app.state';
import { UserState } from '../state/user.state';

/**
 * Clase que administra la comunicación entre los servicios y el estado
 */
@Injectable()
export class UserFacade {
  /**
   * Clase que persiste información durante la ejecución del módulo de usuarios
   */
  private readonly state: UserState;
  /**
   * Clase que persiste información durante la sesión de la aplicación
   */
  private readonly appState: AppState;

  /**
   * Crea una nueva instancia de @see UserFacade
   */
  public constructor(state: UserState, appState: AppState) {
    this.state = state;
    this.appState = appState;
  }
}
