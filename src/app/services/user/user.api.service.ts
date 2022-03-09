import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/models/user.dto';
import { BaseApiService } from '../base/base.api.service';

/**
 * Servicio encargado interactuar con la api de usuarios del microservicio
 */
@Injectable()
export class UserApiService extends BaseApiService<UserDto> {

  /**
   * Crea una nueva instancia de @see UserApiService
   */
  public constructor(httpClient: HttpClient) {
    super(httpClient, `http://localhost:18316/api`, 'User');
  }

  /**
   * Método encargado de validar el login de un usuario
   * @param username Login del usuario
   * @param password Contraseña del usuario
   */
  public login(username: string, password: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.api}/${this.service}/Login/${username}/${password}`);
  }
}
