import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('USD');

  getCurrency():Observable<string> {
    return this.selectedCurrency$.asObservable();
  }

  setCurrency(currency: string):void {
    this.selectedCurrency$.next(currency);
  }

}
