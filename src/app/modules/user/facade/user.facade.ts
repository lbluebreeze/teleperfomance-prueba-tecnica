import { Injectable, OnDestroy } from '@angular/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { UserDto } from 'src/app/models/user.dto';
import { UserApiService } from 'src/app/services/user/user.api.service';
import { UserState } from '../state/user.state';
import { AppFacade } from 'src/app/core/app.facade';

/**
 * Clase que administra la comunicación entre los servicios y el estado
 */
@Injectable()
export class UserFacade implements OnDestroy {
  /**
   * Clase que persiste información durante la ejecución del módulo de usuarios
   */
  private readonly state: UserState;
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  private readonly appFacade: AppFacade;
  /**
   * Servicio encargado interactuar con la api de usuarios del microservicio
   */
  private readonly service: UserApiService;
  /**
   * Observable con una lista de usuarios
   */
  public readonly users$ = () => this.state.users$;
  /**
   * Observable con la información de un usuario
   */
  public readonly user$ = () => this.state.user$;

  /**
   * Crea una nueva instancia de @see UserFacade
   */
  public constructor(state: UserState, appFacade: AppFacade, service: UserApiService) {
    this.state = state;
    this.appFacade = appFacade;
    this.service = service;
  }

  /**
   * A lifecycle hook that is called when a directive, pipe, or service is destroyed
   */
  public ngOnDestroy(): void {
    this.setUsers([]);
  }

  /**
   * Método encargado de obtener todos los usuarios
   */
  public all(): void {
    this.service.all()
      .pipe(first())
      .subscribe(
        (response) => {
          this.setUsers(response);
        },
        () => this.appFacade.sendError('Hubo un problema al consultar los usuarios'),
      );
  }

  /**
   * Método encargado de eliminar un usuario
   * @param data Información del usuario
   */
  public delete(data: UserDto): void {
    if (!data.id) {
      return;
    }
    this.service.delete(data.id)
      .pipe(
        first(),
        filter((response) => response),
        switchMap(() => this.users$()),
        map((users) => users.filter((x) => x.id !== data.id)),
      )
      .subscribe(
        (users) => this.state.setUsers(users),
        () => this.appFacade.sendError('Hubo un problema al eliminar el usuario'),
      );
  }

  /**
   * Método encargado de almacenar una lista de usuarios en el estado
   * @param data Lista de usuarios
   */
  public setUsers(data: UserDto[]): void {
    this.state.setUsers(data);
  }

  /**
   * Método encargado de almacenar un usuario en el estado
   * @param data Información del usuario
   */
  public setUser(data: UserDto): void {
    this.state.setUser(data);
  }
}
