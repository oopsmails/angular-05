import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input("pageNumber") currentPage: number;
  @Input() clickedPageNumber: number;
  @Input("itemCount") itemCount: number;
  @Input("itemsPerPage") itemsPerPage: number;
  @Input("numberOfPageCombine") numberOfPageCombine: number;
  @Input() backgroundType: string;
  @Input() hiddenArrows: boolean;
  @Input() disableNavigation: boolean;

  @Output("pageClick") pageClickEitter: EventEmitter<PageClickEventArgs> = new EventEmitter();

  numOfPages: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.numOfPages = this.calcNumOfPages();
  }

  ngOnChange(): void {
    this.numOfPages = this.calcNumOfPages();
  }

  calcNumOfPages(): number {
    const count = this.itemsPerPage < 1 ? 1 : Math.ceil(this.itemCount / this.itemsPerPage);
    return Math.max(count || 0, 1);
  }

  setListItemClass(index: number): string[] {
    var CSS_CLASSES = {
      SELECTED: 'progress-pagination__number__item--selected',
      SINGLE: 'progress-pagination__number__item--selected--single',
      FIRST: 'progress-pagination__number__item--selected--first',
      LAST: 'progress-pagination__number__item--selected--last'
    };
    if (this.numberOfPageCombine === 1 && index === this.currentPage) {
      return [CSS_CLASSES.SELECTED, CSS_CLASSES.SINGLE];
    } else {
      if (index === this.currentPage) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.FIRST];
      } else if (index === this.currentPage + this.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED, CSS_CLASSES.LAST];
      } else if (index > this.currentPage && index < this.currentPage + this.numberOfPageCombine - 1) {
        return [CSS_CLASSES.SELECTED];
      }
    }
  }

  pageClick(pageClickEventArgs: PageClickEventArgs): void {
    console.log("pageClick, pageClickEventArgs: ", pageClickEventArgs);
    this.currentPage = pageClickEventArgs.pageNumber;
    this.pageClickEitter.emit({ 
      pageNumber: this.currentPage
    }); 
  }

  setCurrentPage(index): void {
    if (!this.disableNavigation) {
      if (index > -1 && index < this.numOfPages) {
        this.currentPage = index;
      } else if (index < 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = this.numOfPages;
      }
      // if (self.ngModelController !== null && angular.isDefined(self.ngModelController)) {
      //   self.ngModelController.$setViewValue(self.currentPage);
      // }
      // if (angular.isFunction(self.onPageClick)) {
      //   self.onPageClick();
      // }
    }
  }

  range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
}


export interface PageClickEventArgs {
  pageNumber: number;
}

