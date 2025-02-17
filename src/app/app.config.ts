import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {exchangeRateReducer} from './state/exchange-rate.reducer';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ExchangeRateEffects } from './state/exchange-rate.effects';

export const appConfig: ApplicationConfig = {
  providers: [// ✅ Enable Redux DevTools
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideStore({exchangeRate: exchangeRateReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(ExchangeRateEffects),

  ]
};
