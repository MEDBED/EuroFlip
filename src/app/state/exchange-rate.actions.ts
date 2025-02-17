import {createAction, props} from '@ngrx/store';

export const updateExchangeRate = createAction(
  '[Exchange Rate] Update Rate',
  props<{ rate: number }>()
);
export const resetRate =
  createAction('[Exchange] Reset Rate'); // Resets to default


export const setFixedRate = createAction(
  '[Exchange Rate] Set Fixed Rate',
  props<{ fixedRate: number|null }>()
);

export const unsetFixedRate =
  createAction('[Exchange Rate] Unset Fixed Rate');

export const addConversionHistory = createAction(
  '[Exchange Rate] Add Conversion',
  props<{ conversion: any }>()
);
