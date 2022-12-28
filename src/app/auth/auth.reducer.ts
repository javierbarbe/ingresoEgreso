import { Usuario } from './../shared/models/usuario.model';
import { createReducer, on } from '@ngrx/store';
import { getUser, setUser, unsetUser } from './auth.actions';


export interface State {
  user:Usuario
}

export const usuarioLogueadoStateInicial:State = {
  user:null
} ;




export const authReducer = createReducer(
  usuarioLogueadoStateInicial,
  on(setUser,    (state, { user }) => { return { ...state, user: {...user} } }),
  on(unsetUser,  (state)           => { return { ...state, user: null } }),
  on(getUser,    (state)           => { return { ...state } }),

);
