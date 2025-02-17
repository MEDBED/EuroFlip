import {createSelector, createFeatureSelector} from '@ngrx/store';
import {ExchangeRateState} from './exchange-rate.reducer';

export const selectExchangeRateState =
  createFeatureSelector<ExchangeRateState>('exchangeRate');
export const selectExchangeRate =
  createSelector(selectExchangeRateState, (state) => state.rate);
export const selectExchangeHistory =
  createSelector(selectExchangeRateState, (state) => state.conversions);

export const selectFixedRate =
  createSelector(selectExchangeRateState, (state) => state.fixedRate);
