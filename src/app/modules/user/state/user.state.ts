import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HobbyDto } from 'src/app/models/hobby.dto';
import { UserDto } from 'src/app/models/user.dto';

/**
 * Clase que persiste información durante la ejecución del módulo de usuarios
 */
@Injectable()
export class UserState {
  /**
   * Behavior Subject de Users
   */
  private readonly bsUsers = new BehaviorSubject<UserDto[]>([]);
  /**
   * Observable con una lista de usuarios
   */
  public readonly users$ = this.bsUsers.asObservable();
  /**
   * Behavior Subject de User
   */
  private readonly bsUser = new BehaviorSubject<UserDto>({});
  /**
   * Observable con la información de un usuario
   */
  public readonly user$ = this.bsUser.asObservable();
  /**
   * Behavior Subject de Hobbies
   */
  private readonly bsHobbies = new BehaviorSubject<HobbyDto[]>([]);
  /**
   * Observable con una lista de hobbies
   */
  public readonly hobbies$ = this.bsHobbies.asObservable();

  /**
   * Método encargado de almacenar una lista de usuarios en el estado
   * @param data Lista de usuarios
   */
  public setUsers(data: UserDto[]): void {
    this.bsUsers.next(data);
  }

  /**
   * Método encargado de almacenar un usuario en el estado
   * @param data Información del usuario
   */
  public setUser(data: UserDto): void {
    this.bsUser.next(data);
  }

  /**
   * Método encargado de almacenar una lista de hobbies en el estado
   * @param data Lista de hobbies
   */
  public setHobbies(data: HobbyDto[]): void {
    this.bsHobbies.next(data);
  }
}
