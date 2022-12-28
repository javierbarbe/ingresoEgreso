import { IngresoEgreso } from './ingreso-egreso';
export interface Usuario {
  nombre?:    string,
  correo?:    string,
  password?:  string,
  idUsuario?: string,
  ingresos?:  IngresoEgreso[],
  egresos?:   IngresoEgreso[]
}

export type logUser = {

}
