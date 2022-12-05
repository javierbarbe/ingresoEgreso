import { Usuario } from './../shared/models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const loguear = createAction('[Auth Component] Loguear', props<{usuario:Usuario}>());
export const desloguear = createAction('[Auth Component] Desloguear');
