import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, timer} from 'rxjs';
import * as ExchangeRateActions from './exchange-rate.actions';

@Injectable()
export class ExchangeRateEffects {
  constructor(private actions$: Actions, private store: Store) {}

  updateRateEffect$ = createEffect(() =>
    timer(0, 3000).pipe(
      map(() => {
        const change = Math.random() * 0.1 - 0.05;
        return ExchangeRateActions.updateExchangeRate({ rate: Math.max(0.9, 1.1 + change) });
      })
    )
  );
}
