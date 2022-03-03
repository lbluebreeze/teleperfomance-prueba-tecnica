import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';

/**
 * Servicio encargado de la validación y autenticación de usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * Login del usuario válido para autenticar
   */
  private readonly username = 'teleperformance';
  /**
   * Contraseña del usuario válido para autenticar
   */
  private readonly password = 'qwerty987654*';

  /**
   * Método encargado de autenticar un usuario
   */
  public login(username: string, password: string): Observable<UserModel> {
    let user: UserModel = {valid: false};

    if (username === this.username && password === this.password) {
      user.username = username;
      user.fullname = 'Usuario teleperformance';
      user.valid = true;
    }

    return of(user);
  }
}
