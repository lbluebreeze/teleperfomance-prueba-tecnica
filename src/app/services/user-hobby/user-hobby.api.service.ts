import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserHobbyDto } from 'src/app/models/user-hobby.dto';
import { BaseApiService } from '../base/base.api.service';

/**
 * Servicio encargado interactuar con la api de usuarios del microservicio
 */
@Injectable()
export class UserHobbyApiService extends BaseApiService<UserHobbyDto> {

  /**
   * Crea una nueva instancia de @see UserHobbyApiService
   */
  public constructor(httpClient: HttpClient) {
    super(httpClient, `http://localhost:18316/api`, 'UserHobby');
  }
}
