import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDtoBase } from 'src/app/models/abstractions/idto-base';

/**
 * Servicio base para las operaciones hacia un microservicio genérico
 */
export abstract class BaseApiService<TDto extends IDtoBase> {
  /**
   * Performs HTTP requests
   */
  protected httpClient: HttpClient;

  /**
   * Crea una nueva instancia de @see BaseApiService
   */
  constructor(httpClient: HttpClient, public api: string, public service: string) {
    this.httpClient = httpClient;
  }

  /**
   * Método encargado de obtener todos los registros
   */
  public all(): Observable<TDto[]> {
    return this.httpClient.get<TDto[]>(`${this.api}/${this.service}/All`);
  }

  /**
   * Método encargado de obtener un registro por su llave primaria
   */
  public get(id: number): Observable<TDto> {
    return this.httpClient.get<TDto>(`${this.api}/${this.service}/Get/${id}`);
  }

  /**
   * Método encargado de crear un registro
   */
  public post(data: TDto): Observable<number> {
    return this.httpClient.post<number>(`${this.api}/${this.service}`, data);
  }

  /**
   * Método encargado de actualizar un registro
   */
  public put(data: TDto): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/${this.service}`, data);
  }

  /**
   * Método encargado de cambiar el estado de un registro
   */
  public changeState(id: number, state: boolean): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/${this.service}/ChangeState?id=${id}&state=${state}`, null);
  }

  /**
   * Método encargado de eliminar un registro
   */
  public delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/${this.service}/${id}`);
  }
}
