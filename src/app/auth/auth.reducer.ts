import { Usuario } from './../shared/models/usuario.model';
import { createReducer, on } from '@ngrx/store';
import { loguear, desloguear } from './auth.actions';

export const usuarioLogueadoStateInicial:Usuario = {} ;

export const authReducer = createReducer(
  usuarioLogueadoStateInicial,
  on(loguear, (state, { usuario }) =>{

    return {
            ...state,
            correoUsuario:usuario.correo
          };
  }),
  on(desloguear, (state) => {
    return usuarioLogueadoStateInicial
  }),
);
