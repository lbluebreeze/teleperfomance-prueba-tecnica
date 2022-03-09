import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { HobbyDto } from 'src/app/models/hobby.dto';
import { UserHobbyDto } from 'src/app/models/user-hobby.dto';
import { UserFacade } from '../../facade/user.facade';

/**
 * Componente principal para la gestión de hobbies
 */
@Component({
  selector: 'tp-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.sass']
})
export class HobbyComponent implements OnInit {
  /**
   * Bandera para la desuscripción de observables
   */
  private readonly destroy$ = new Subject<boolean>();
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  public readonly facade: UserFacade;
  /**
   * Tracks the value and validity state of a group of `FormControl` instances
   */
  public readonly formGroup: FormGroup;
  /**
   * Evento que emite los hobbies seleccionados
   */
  @Output()
  public readonly hobbySelection = new EventEmitter<UserHobbyDto[]>();
  /**
   * Observable con una lista de hobbies
   */
  public readonly hobbies$: Observable<HobbyDto[]>;
  /**
   * Lista de hobbies seleccionados
   */
  @Input()
  public selectedHobbies: UserHobbyDto[] = [];
  /**
   * Lista de hobbies
   */
  public userHobbies: UserHobbyDto[] = [];

  /**
   * Crea una nueva instancia de @see HobbyComponent
   */
  constructor(facade: UserFacade, formBuilder: FormBuilder) {
    this.facade = facade;

    this.formGroup = formBuilder.group({
      hobby: ['', [Validators.required, Validators.maxLength(256)]],
    });

    this.hobbies$ = facade.hobbies$();
  }

  /**
   * A lifecycle hook that is called after Angular has initialized
   */
  public ngOnInit(): void {
    this.facade.allHobbies();

    this.hobbies$
      .pipe(
        tap((response) => this.userHobbies = response.map((x) => {
          const userHobby: UserHobbyDto = this.selectedHobbies.find((o) => o.idHobby === x.id) || {};

          userHobby.idHobby = x.id;
          userHobby.hobby = {...x};

          if ((userHobby.id || 0) > 0) {
            userHobby.hobby.selected = true;
          }

          return userHobby;
        })),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.emitHobbies());
  }

  /**
   * Método encargado de añadir un hobby
   */
  public addHobby(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const userHobby: UserHobbyDto = {
      hobby: {
        name: this.formGroup.value.hobby,
        selected: true
      },
    };

    const exist = this.userHobbies.some(x => x.hobby?.name === userHobby.hobby?.name);

    if (exist) {
      this.formGroup.reset();
      return;
    }

    this.userHobbies = [...this.userHobbies, userHobby];

    this.emitHobbies();

    this.formGroup.reset();
  }

  /**
   * Método encargado de emitir los hobbies seleccionados
   */
  public emitHobbies(): void {
    this.hobbySelection.emit(this.userHobbies.filter(x => x.hobby?.selected));
  }

  /**
   * Método encargado de alternar el estado de selección de un hobby
   * @param userHobby Información del hobby seleccionado
   */
  public toggleHobby(userHobby: UserHobbyDto): void {
    this.userHobbies = this.userHobbies.map((x) => {
      if (x.hobby && x.hobby?.name === userHobby.hobby?.name) {
        x.hobby.selected = !x.hobby?.selected;

        return x;
      }

      return x;
    });

    this.emitHobbies();
  }
}
