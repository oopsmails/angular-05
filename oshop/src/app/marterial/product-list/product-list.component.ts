import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../models/product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = false;
  products: Array<Product> = new Array();
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;

  displayedColumns = ['title', 'price', ''];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    // console.log('this.dataSource:', this.dataSource);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.subscription = this.productService.getAll()
    .subscribe((products: Array<Product>) => {
      this.loading = true;
      this.products = products;
      console.log('this.products:', this.products);
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    // console.log('this.dataSource:', this.dataSource);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) { // To override the default filtering behavior, a custom filterPredicate function
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
