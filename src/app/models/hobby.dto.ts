import { IDtoBase } from './abstractions/idto-base';

/**
 * Objeto de transferencia de datos con la información de un hobby
 */
export interface HobbyDto extends IDtoBase {
  /**
   * Nombre del hobby
   */
  name?: string;
  /**
   * Descripción del hobby
   */
  description?: string;

  /**
   * Bandera que indica si el hobby debe estar seleccionado
   */
  selected?: boolean;
}
