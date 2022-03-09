import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tp-user',
  template: `<tp-list-base [title]="title"></tp-list-base>`,
  styles: [
  ]
})
export class UserComponent implements OnInit {
  /**
   * Título de la lista
   */
  public readonly title = 'Usuarios';

  constructor() { }

  ngOnInit(): void {
  }

}
