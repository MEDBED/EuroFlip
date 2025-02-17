import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {selectExchangeRate, selectFixedRate} from '../../../state/exchange-rate.selectors';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'euro-flip-main-header',
  standalone: true,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [
    NgOptimizedImage, CommonModule
  ]
})
export class MainHeaderComponent {
  exchangeRate$: Observable<number>;
  fixedRate$:Observable<number|null>;

  constructor(private store: Store) {
    this.exchangeRate$ = this.store.select(selectExchangeRate);
    this.fixedRate$=this.store.select(selectFixedRate);
  }
}
