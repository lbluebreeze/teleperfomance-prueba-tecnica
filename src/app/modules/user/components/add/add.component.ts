import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserHobbyDto } from 'src/app/models/user-hobby.dto';
import { UserDto } from 'src/app/models/user.dto';
import { confirmedPasswordValidator } from 'src/app/shared/validators/confirmed-password.validator';
import { UserFacade } from '../../facade/user.facade';

/**
 * Componente encargado de crear usuarios
 */
@Component({
  selector: 'tp-user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit, OnDestroy {
  /**
   * A service that provides navigation among views and URL manipulation capabilities
   */
  private readonly router: Router;
  /**
   * Provides access to information about a route associated with a component
   */
  private readonly activatedRoute: ActivatedRoute;
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
   * Lista de hobbies seleccionados
   */
  public selectedHobbies: UserHobbyDto[] = [];

  /**
   * Crea una nueva instancia de @see AddComponent
   */
  public constructor(router: Router, activatedRoute: ActivatedRoute, facade: UserFacade, formBuilder: FormBuilder) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.facade = facade;

    this.formGroup = formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
      fullname: ['', [Validators.required, Validators.maxLength(256)]],
      phone: ['', [Validators.maxLength(32), Validators.pattern(/\d/)]],
    }, { validators: confirmedPasswordValidator('password', 'confirmPassword') });
  }

  /**
   * A lifecycle hook that is called after Angular has initialized
   */
  public ngOnInit(): void {
    this.facade.all();

    combineLatest([this.formGroup.controls.username.valueChanges, this.facade.users$()])
      .pipe(
        filter((response) => response[0]),
        takeUntil(this.destroy$),
      )
      .subscribe((response) => {
        const username: string = response[0];
        const users = response[1];

        if (users.some(x => x.username?.toLowerCase() === username.toLowerCase())) {
          this.formGroup.controls.username.setErrors({ usernameAlreadyExists: true });
        }
      });
  }

  /**
   * A lifecycle hook that is called when a directive, pipe, or service is destroyed
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método llamado en el evento submit del formulario.
   * Se encarga de crear un usuario con la información especificada
   */
  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const form = this.formGroup.value;

    const user: UserDto = {
      username: form.username,
      password: form.password,
      fullname: form.fullname,
      phone: form.phone,
      userHobbies: this.selectedHobbies
    };

    this.facade.create(user, () => {
      this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    });
  }

  /**
   * Método llamado al seleccionar un hobby
   * @param $event Lista de hobbies seleccionados
   */
  public onSelectedHobbies($event: UserHobbyDto[]): void {
    this.selectedHobbies = $event;
  }
}
