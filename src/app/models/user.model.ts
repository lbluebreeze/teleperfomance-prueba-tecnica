/**
 * Representa la información de un usuario
 */
export interface UserModel {
  /**
   * Login del usuario
   */
  username?: string;
  /**
   * Nombre completo del usuario
   */
  fullname?: string;
  /**
   * Bandera que indica si el usuario es válido
   */
  valid: boolean
}
