import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserHobbyDto } from 'src/app/models/user-hobby.dto';
import { environment } from 'src/environments/environment';
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
    super(httpClient, environment.userApi, 'UserHobby');
  }
}
