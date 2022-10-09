import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/service/api.service';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData: Array<any> = [];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  currency: string = 'USD';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    });
  }

  getBannerData(): void {
    this.api.getTrendingCurrency(this.currency).subscribe(res => {
      console.log(res);
      this.bannerData = res

    })
  }

  getAllData(): void {
    this.api.getCurrency(this.currency).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }

  }

  goToDetails(row: any): void {
    this.router.navigate(['coin-detail', row.id])
  }

}
