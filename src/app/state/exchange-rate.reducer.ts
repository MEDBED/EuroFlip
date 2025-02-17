import {createReducer, on} from '@ngrx/store';
import * as ExchangeRateActions from './exchange-rate.actions';

export interface ExchangeRateState {
  rate: number;
  fixedRate: number | null;
  actualRate: number;
  conversions: any[];
}

const initialState: ExchangeRateState = {
  rate: 1.1,
  fixedRate: null,
  actualRate: 1.1,
  conversions: []
};

export const exchangeRateReducer = createReducer(
  initialState,

  on(ExchangeRateActions.updateExchangeRate, (state, { rate }) => ({
    ...state,
    actualRate: rate,
    rate: state.fixedRate && Math.abs((rate - state.fixedRate) / state.fixedRate) > 0.02
      ? rate // Disable fixed rate if variation > 2%
      : state.fixedRate || rate,
  })),

  on(ExchangeRateActions.setFixedRate, (state, { fixedRate }) => ({
    ...state,
    fixedRate,
  })),

  on(ExchangeRateActions.unsetFixedRate, (state) => ({
    ...state,
    fixedRate: null,
  })),

  on(ExchangeRateActions.addConversionHistory, (state, { conversion }) => ({
    ...state,
    conversions: [conversion, ...state.conversions].slice(0, 5) // Keep last 5 conversions
  }))
);
