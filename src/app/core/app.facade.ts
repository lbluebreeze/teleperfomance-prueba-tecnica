import { Injectable } from '@angular/core';

import { ErrorModel } from '../models/error.model';
import { UserModel } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { AppState } from './app.state';
import { first } from 'rxjs/operators';
import { UserApiService } from '../services/user/user.api.service';
import { UserDto } from '../models/user.dto';

/**
 * Clase que administra la comunicación entre los servicios y el estado
 */
@Injectable()
export class AppFacade {
  /**
   * Clase que persiste información durante la sesión de la aplicación
   */
  private readonly state: AppState;
  /**
   * Servicio encargado de la validación y autenticación de usuarios
   */
  private readonly loginService: LoginService;
  /**
   * Servicio encargado interactuar con la api de usuarios del microservicio
   */
  private readonly userService: UserApiService;
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = () => this.state.user$;
  /**
   * Observable con la información de un error
   */
  public readonly error$ = () => this.state.error$;

  /**
   * Crea una nueva instancia de @see AppFacade
   */
  public constructor(state: AppState, loginService: LoginService, userService: UserApiService) {
    this.state = state;
    this.loginService = loginService;
    this.userService = userService;
  }

  /**
   * Método encargado de realizar el login de un usuario a partir de sus credenciales
   * @param username Login del usuario
   * @param password Contraseña del usuario
   * @param fn Función a ejecutar luego de un logueo exitoso
   */
  public login(username: string, password: string, fn: () => void): void {
    this.userService.login(username, password).pipe(
      first(),
    ).subscribe(
      (response) => {
        if ((response?.id || 0) > 0) {
          response.valid = true;
          this.setUser(response);
          fn();
        } else {
          this.sendError('No se encontró un usuario con las credenciales especificadas');
        }
      },
      () => this.sendError('Hubo un problema al autenticar el usuario')
    );
  }

  /**
   * Método encargado de almacenar un usuario en el estado
   * @param data Información del usuario
   */
  public setUser(data: UserDto): void {
    this.state.setUser(data);
  }

  /**
   * Método encargado de almacenar un error en el estado
   * @param data Información del error
   */
  public sendError(message: string): void {
    const error: ErrorModel = {
      message
    };
    this.state.setError(error);
  }
}

