import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCurrency : string = "USD";

  constructor(private currencyService : CurrencyService){}

  sendCurrency(event:string):void{
    this.currencyService.setCurrency(event);
  }
}
