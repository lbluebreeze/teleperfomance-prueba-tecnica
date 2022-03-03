import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AppFacade } from './core/app.facade';

@Component({
  selector: 'tp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Clase que administra la comunicación entre los servicios y el estado
   */
  private readonly facade: AppFacade;
  /**
   * Bandera para la desuscripción de observables
   */
  private readonly destroy$ = new Subject<boolean>();

  /**
   * Crea una nueva instancia de @see AppComponent
   */
  public constructor(facade: AppFacade) {
    this.facade = facade;
  }

  /**
   * A lifecycle hook that is called after Angular has initialized
   * all data-bound properties of a directive.
   */
  public ngOnInit(): void {
    this.facade.error$()
      .pipe(
        filter((response) => response.message != undefined),
        tap((response) => {
          alert(response.message);
        }),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  /**
   * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Use for any custom cleanup that needs to occur when the
   * instance is destroyed.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
