import { Component } from '@angular/core';
import {ExchangeConverterComponent} from './exchange-converter/exchange-converter.component';
import {MainFooterComponent} from './shared/components/main-footer/main-footer.component';
import {MainHeaderComponent} from './shared/components/main-header/main-header.component';

@Component({
  selector: 'app-root',
  imports: [ExchangeConverterComponent, MainFooterComponent,MainHeaderComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'euro-usd-converter';
}
