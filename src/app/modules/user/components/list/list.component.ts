import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDto } from 'src/app/models/user.dto';
import { UserFacade } from '../../facade/user.facade';

/**
 * Componente encargado de listar los usuarios registrados
 */
@Component({
  selector: 'tp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {
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
   * Columnas a mostrar en la tabla de registros
   */
  public readonly columnsToDisplay = ['id', 'username', 'fullname', 'phone', 'creationDate', 'idCreatorUser'];
  /**
   * Observable con una lista de usuarios
   */
  public users: UserDto[] = [];

  /**
   * Crea una nueva instancia de @see ListComponent
   */
  public constructor(router: Router, activatedRoute: ActivatedRoute, facade: UserFacade) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.facade = facade;

    facade.users$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => this.users = response);
  }

  /**
   * A lifecycle hook that is called after Angular has initialized
   */
  public ngOnInit(): void {
    this.facade.all();
  }

  /**
   * A lifecycle hook that is called when a directive, pipe, or service is destroyed
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método llamado por el botón editar de la tabla.
   * Asigna el usuario en el estado y redirecciona al componente de edición
   * @param data Información del usuario
   */
  public onEdit(data: UserDto): void {
    this.facade.setUser(data);
    this.router.navigate(['/edit'], { relativeTo: this.activatedRoute });
  }

  /**
   * Método llamado por el botón eliminar de la tabla.
   * Elimina el registro y actualiza el estado
   * @param data Información del usuario
   */
  public onDelete(data: UserDto): void {
    this.facade.delete(data);
  }
}
