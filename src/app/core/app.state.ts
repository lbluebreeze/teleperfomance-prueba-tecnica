import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ErrorModel } from '../models/error.model';
import { UserDto } from '../models/user.dto';

/**
 * Clase que persiste información durante la sesión de la aplicación
 */
@Injectable()
export class AppState {
  /**
   * Behavior Subject de Loading
   */
  private readonly bsLoading = new BehaviorSubject<boolean>(false);
  /**
   * Observable con una bandera que indica si se está esperando una respuesta de un servicio
   */
  public readonly loading$ = this.bsLoading.asObservable();
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
  private readonly bsUser = new BehaviorSubject<UserDto>({});
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = this.bsUser.asObservable();

  /**
   * Método encargado configurar la bandera isLoading
   * @param state Estado de la bandera
   */
  public setLoading(state: boolean): void {
    this.bsLoading.next(state);
  }

  /**
   * Método encargado de obtener el usuario almacenado en el estado
   */
  public get user(): UserDto {
    return this.bsUser.value;
  }

  /**
   * Método encargado de almacenar un usuario en el estado
   * @param data Información del usuario
   */
  public setUser(data: UserDto): void {
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
