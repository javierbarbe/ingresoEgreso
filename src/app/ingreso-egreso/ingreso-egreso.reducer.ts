import { IngresoEgreso } from './../shared/models/ingreso-egreso';
import { createReducer, on } from "@ngrx/store";
import { setItems,tiposValidos,unSetItems } from './ingreso-egreso.actions';


export interface State{
  items: IngresoEgreso[];
}

export const initialState :State = {
  items : [],
}

const _ingresoEgresoReducer = createReducer(initialState,
  on ( setItems, ( state, { items }) => ({...state, items: [...items]}) ),
  on ( unSetItems,  state  => ({...state, items: [] }) ),
  // on ( showItems, ( state , { tipo, items }) => {
  //   console.log("los ingresos egresos en el reducer", items)
  //   // const arrItems:IngresoEgreso[] = items.filter(ingreso => ingreso.tipo === tipo)
  //   return { items}

  // } ),
);

export function ingresoEgresoReducer(state,action) {
  return _ingresoEgresoReducer(state,action);
}

