import { IDtoBase } from './abstractions/idto-base';
import { HobbyDto } from './hobby.dto';

/**
 * Objeto de transferencia de datos con la información de la relación entre un usuario y un hobby
 */
export interface UserHobbyDto extends IDtoBase {
  /**
   * Identificador del usuario
   */
  idUser?: number;
  /**
   * Identificador del hobby
   */
  idHobby?: number;

  /**
   * Información del hobby asociado
   */
  hobby?: HobbyDto;
}
