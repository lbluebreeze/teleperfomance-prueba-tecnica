import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HobbyDto } from 'src/app/models/hobby.dto';
import { BaseApiService } from '../base/base.api.service';

/**
 * Servicio encargado interactuar con la api de usuarios del microservicio
 */
@Injectable()
export class HobbyApiService extends BaseApiService<HobbyDto> {

  /**
   * Crea una nueva instancia de @see HobbyApiService
   */
  public constructor(httpClient: HttpClient) {
    super(httpClient, `http://localhost:18316/api`, 'Hobby');
  }
}
