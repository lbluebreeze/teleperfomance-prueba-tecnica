import { Injectable, OnDestroy } from '@angular/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { UserDto } from 'src/app/models/user.dto';
import { UserApiService } from 'src/app/services/user/user.api.service';
import { UserState } from '../state/user.state';
import { AppFacade } from 'src/app/core/app.facade';
import { HobbyApiService } from 'src/app/services/hobby/hobby.api.service';

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
   * Servicio encargado interactuar con la api de usuarios del microservicio
   */
  private readonly hobbyService: HobbyApiService;
  /**
   * Observable con una bandera que indica si se está esperando una respuesta de un servicio
   */
  public readonly loading$ = () => this.appFacade.loading$();
  /**
   * Observable con una lista de usuarios
   */
  public readonly users$ = () => this.state.users$;
  /**
   * Observable con la información de un usuario
   */
  public readonly user$ = () => this.state.user$;
  /**
   * Observable con una lista de hobbies
   */
  public readonly hobbies$ = () => this.state.hobbies$;

  /**
   * Crea una nueva instancia de @see UserFacade
   */
  public constructor(state: UserState, appFacade: AppFacade, service: UserApiService, hobbyService: HobbyApiService) {
    this.state = state;
    this.appFacade = appFacade;
    this.service = service;
    this.hobbyService = hobbyService;
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
    this.appFacade.setLoading(true);
    this.service.all()
      .pipe(first())
      .subscribe(
        (response) => {
          this.setUsers(response);
        },
        () => {
          this.appFacade.setLoading(false);
          this.appFacade.sendError('Hubo un problema al consultar los usuarios');
        },
        () => this.appFacade.setLoading(false)
      );
  }

  /**
   * Método encargado de crear un usuario
   * @param data Información del usuario a crear
   */
  public create(data: UserDto, fn: () => void): void {
    data.idCreatorUser = this.appFacade.user().id;
    data.createdDate = new Date();
    data.state = true;

    data.userHobbies = data.userHobbies?.map((userHobby) => {
      if ((userHobby.idHobby || 0) > 0) {
        userHobby.hobby = undefined;
      } else {
        userHobby.hobby = {
          ...userHobby.hobby,
          idCreatorUser: data.idCreatorUser,
          createdDate: new Date(),
          state: true,
        };
      }

      userHobby = {
        ...userHobby,
        idCreatorUser: userHobby.idCreatorUser ?? data.idCreatorUser,
        createdDate: userHobby.createdDate ?? new Date(),
        state: true
      };

      return userHobby;
    });

    this.appFacade.setLoading(true);
    this.service.post(data)
      .pipe(first())
      .subscribe(
        (response) => {
          if (response > 0) {
            fn();
          } else {
            this.appFacade.setLoading(false);
            this.appFacade.sendError('Hubo un problema al crear el usuario');
          }
        },
        () => {
          this.appFacade.setLoading(false);
          this.appFacade.sendError('Hubo un problema al crear el usuario');
        },
        () => this.appFacade.setLoading(false)
      );
  }

  /**
   * Método encargado de actualizar un usuario
   * @param data Información del usuario a actualizar
   */
  public update(data: UserDto, fn: () => void): void {
    this.appFacade.setLoading(true);
    this.service.put(data)
      .pipe(first())
      .subscribe(
        (response) => {
          if (response) {
            if (data.id === this.appFacade.user().id) {
              data.valid = true;
              this.appFacade.setUser(data);
            }
            fn();
          } else {
            this.appFacade.setLoading(false);
            this.appFacade.sendError('Hubo un problema al actualizar el usuario');
          }
        },
        () => {
          this.appFacade.setLoading(false);
          this.appFacade.sendError('Hubo un problema al actualizar el usuario');
        },
        () => this.appFacade.setLoading(false)
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
   * Método encargado de obtener los hobbies
   */
  public allHobbies(): void {
    this.appFacade.setLoading(true);
    this.hobbyService.all()
      .pipe(first())
      .subscribe(
        (response) => this.state.setHobbies(response),
        () => {
          this.appFacade.setLoading(false);
          this.appFacade.sendError('Hubo un problema al obtener los hobbies');
        },
        () => this.appFacade.setLoading(false),
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
