import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppFacade } from 'src/app/core/app.facade';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'tp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  private readonly facade: AppFacade;
  /**
   * Tracks the value and validity state of a group of `FormControl` instances.
   */
  public readonly formGroup: FormGroup
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = new Observable<UserModel>();

  /**
   * Crea una nueva instancia de @see AppComponent
   */
  public constructor(facade: AppFacade, formBuilder: FormBuilder) {
    this.facade = facade;
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      pass: ['', Validators.required],
    });

    this.user$ = this.facade.user$();
  }

  /**
   * A lifecycle hook that is called after Angular has initialized
   * all data-bound properties of a directive.
   */
  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid)
      return;

    const form = this.formGroup.value;

    this.facade.login(form.name, form.pass);

    this.formGroup.reset();
  }
}
