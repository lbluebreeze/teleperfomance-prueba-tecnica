import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ErrorModel } from '../models/error.model';
import { UserModel } from '../models/user.model';

/**
 * Clase que persiste información durante la sesión de la aplicación
 */
@Injectable()
export class AppState {
  /**
   * Behavior Subject de Error
   */
  private readonly bsError = new BehaviorSubject<ErrorModel>({});
  /**
   * Observable con la información de un error
   */
  public readonly error$ = this.bsError.asObservable();
  /**
   * Behavior Subject de User
   */
  private readonly bsUser = new BehaviorSubject<UserModel>({valid: false});
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = this.bsUser.asObservable();

  /**
   * Método encargado de almacenar un usuario en el estado
   * @param data Información del usuario
   */
  public setUser(data: UserModel): void {
    this.bsUser.next(data);
  }

  /**
   * Método encargado de almacenar un error en el estado
   * @param data Información del error
   */
  public setError(data: ErrorModel): void {
    this.bsError.next(data);
  }
}
