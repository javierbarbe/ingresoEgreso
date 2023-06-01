import { IngresoEgreso } from './../shared/models/ingreso-egreso';
import { createAction, props } from "@ngrx/store";

export const unSetItems = createAction('[IngresoEgreso] Unset Items');
export type tiposValidos = "ingreso" | "egreso";

export const setItems = createAction(
  '[IngresoEgreso] Set Items',
  props<{ items: IngresoEgreso[] }>()
  );
export const showItems = createAction(
  '[IngresoEgreso] Show Items',
  props<{ tipo: tiposValidos, items:IngresoEgreso[] }>()
  );
