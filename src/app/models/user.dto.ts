import { IDtoBase } from './abstractions/idto-base';
import { UserHobbyDto } from './user-hobby.dto';

/**
 * Objeto de transferencia de datos con la información del usuario
 */
export interface UserDto extends IDtoBase {
  /**
   * Nombre del usuario para el login
   */
  username?: string;
  /**
   * Contraseña de acceso para el usuario
   */
  password?: string;
  /**
   * Nombre completo del usuario
   */
  fullname?: string;
  /**
   * Bandera que indica si el usuario es válido
   */
  valid?: boolean;

  /**
   * Lista de hobbies asociadas al usuario
   */
  userHobbies?: UserHobbyDto[];
}
