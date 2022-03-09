/**
 * Interfaz con las propiedades base para los objetos de transferencia de datos (DTO)
 */
export interface IDtoBase {
  /**
   * Identificador del registro
   */
  id?: number;
  /**
   * Identificador del creador del registro
   */
  idCreatorUser?: number;
  /**
   * Estado del registro
   */
  state?: number;
  /**
   * Fecha de creación del registro
   */
  createdDate?: Date;
}
