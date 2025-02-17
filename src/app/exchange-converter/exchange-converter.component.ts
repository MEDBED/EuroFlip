import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {combineLatest, interval, Observable} from 'rxjs';
import { startWith } from 'rxjs/operators';
import {
  addConversionHistory,
  setFixedRate,
  updateExchangeRate
} from '../state/exchange-rate.actions';
import {
  selectExchangeHistory,
  selectExchangeRate,
  selectFixedRate
} from '../state/exchange-rate.selectors';
import { ConversionModel } from '../shared/models/conversion.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-exchange-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSlideToggleModule],
  templateUrl: './exchange-converter.component.html',
  styleUrls: ['./exchange-converter.component.scss']
})
export class ExchangeConverterComponent {


  isSettingFixedRate = false;
  convertedAmount = signal(0);

  exchangeRate$:Observable<number>;
  fixedRate$ :Observable<number|null>;
  history$:Observable<ConversionModel[]>;

  converterForm!: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) {
    //init FormGroup with validators
    this.converterForm = this.fb.group({
      isUsdMode: [false],
      amount: [
        0,
        [
          Validators.required,
          Validators.pattern('^[0-9]*\\.?[0-9]+$'),
          Validators.min(0.01),
        ],
      ],
      fixedRate: [
        null,
        [
          Validators.pattern('^[0-9]*\\.?[0-9]+$'),
          Validators.min(0.01),
        ],
      ],
    });

    //Init
    this.exchangeRate$ = this.store.select(selectExchangeRate);
    this.fixedRate$ = this.store.select(selectFixedRate);
    this.history$ = this.store.select(selectExchangeHistory);
    // Recalculate conversion whenever form values or exchange/fixed rate changes
    combineLatest([
      this.converterForm.valueChanges.pipe(startWith(this.converterForm.value)),
      this.exchangeRate$,
      this.fixedRate$
    ]).subscribe(([formValue, rate, fixedRate]) => {
      const appliedRate = fixedRate !== null ? fixedRate : rate;
      const amount = formValue.amount;
      const isUsdMode = formValue.isUsdMode;
      const exchangedValue = isUsdMode ? amount / appliedRate : amount * appliedRate;
      this.convertedAmount.set(exchangedValue);

      // Dispatch conversion history if a valid amount is entered
      if (amount && !this.converterForm.get('amount')?.invalid) {
        this.store.dispatch(
          addConversionHistory({
            conversion: {
              rate: appliedRate,
              input: amount,
              inputCurrency: isUsdMode ? 'USD' : 'EUR',
              output: exchangedValue,
              outputCurrency: isUsdMode ? 'EUR' : 'USD'
            }
          })
        );
      }
    });

    // Simulate exchange rate updates every 3 seconds
    interval(3000).subscribe(() => this.updateRate());
  }

  confirmFixedRate() {
    const fixedRateControl = this.converterForm.get('fixedRate');
    if (fixedRateControl && fixedRateControl.valid) {
      const rate = fixedRateControl.value;
      this.store.dispatch(setFixedRate({ fixedRate: rate }));
      this.isSettingFixedRate = false;
    }
  }

  resetRate() {
    this.store.dispatch(setFixedRate({ fixedRate: null }));
    this.isSettingFixedRate = false;
  }

  updateRate() {
    const change = (Math.random() * 0.1 - 0.05).toFixed(3);
    const newRate = Math.max(0.9, Math.random() + parseFloat(change));
    this.store.dispatch(updateExchangeRate({ rate: newRate }));
  }

  trackById(index: number, entry: ConversionModel): number {
    return entry.id !== undefined ? entry.id : index;
  }
}
