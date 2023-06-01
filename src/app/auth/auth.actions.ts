import { Usuario } from './../shared/models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const setUser          = createAction('[Auth Component] Loguear', props<{user:Usuario}>());
export const unsetUser        = createAction('[Auth Component] Desloguear');
export const getUser         = createAction('[Auth Component] GetUser');
// export const addIngresoEgreso = createAction('[Auth Component] Actualizar Ingreso Egreso', props<{user:Usuario}>());
