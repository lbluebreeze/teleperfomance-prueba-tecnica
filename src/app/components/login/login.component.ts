import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppFacade } from 'src/app/core/app.facade';
import { UserDto } from 'src/app/models/user.dto';

@Component({
  selector: 'tp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  /**
   * A service that provides navigation among views and URL manipulation capabilities.
   */
  private readonly router: Router;
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  public readonly facade: AppFacade;
  /**
   * Tracks the value and validity state of a group of `FormControl` instances.
   */
  public readonly formGroup: FormGroup;
  /**
   * Observable con la información del usuario
   */
  public readonly user$ = new Observable<UserDto>();

  /**
   * Crea una nueva instancia de @see AppComponent
   */
  public constructor(facade: AppFacade, router: Router, formBuilder: FormBuilder) {
    this.facade = facade;
    this.router = router;
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

    if (this.formGroup.invalid) {
      return;
    }

    const form = this.formGroup.value;

    this.facade.login(form.name, form.pass, () => {
      this.router.navigate(['']);
    });

    this.formGroup.reset();
  }
}
