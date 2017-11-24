import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination2',
  templateUrl: './pagination2.component.html',
  styleUrls: ['./pagination.component.css']
})
export class Pagination2Component implements OnInit {
  @Input("pageNumber") currentPage: number;
  @Input() clickedPageNumber: number;
  @Input("itemCount") itemCount: number;
  @Input("itemsPerPage") itemsPerPage: number;
  @Input("numberOfPageCombine") numberOfPageCombine: number;
  @Input() backgroundType: string;
  @Input() hiddenArrows: boolean;
  @Input() disableNavigation: boolean;

  @Output("pageClick2") pageClickEmitter: EventEmitter<number[]> = new EventEmitter();

  numOfPages: number = 0;
  prevLabel: string = 'PREVIOUS';
  nextLabel: string = 'NEXT';
  ariaHeaderLabel: string = 'ARIA_HEADER';

  constructor() {
  }

  ngOnInit(): void {
    this.numOfPages = this.calcNumOfPages();
    this.setCurrentPage(this.currentPage);
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


  pageClick2(index: number): void {
    console.log('pageClick2, index: ', index);
    if (!this.disableNavigation) {
      this.setCurrentPage(index);
      let indexArray: number[] = [];
      if (this.numberOfPageCombine > 1) {
        if (index >= this.getLastPageNumber()) {
          indexArray = this.range(this.getLastPageNumber(), this.numOfPages);
        } else {
          indexArray = Array.from({ length: (this.numberOfPageCombine) }, (v, k) => k + index);
        }
      } else {
        //call service based on pageNumberClicked to get data
        // console.log('pageClick, pageNumberClicked: ', index);
        indexArray.push(index);
      }

      this.pageClickEmitter.emit(indexArray);
    }
  }

  setCurrentPage(index): void {
    if (!this.disableNavigation || this.numberOfPageCombine > 1) {
      if (index > -1 && index < this.getLastPageNumber()) {
        this.currentPage = index;
      } else if (index < 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = this.getLastPageNumber();
      }
      // console.log("setCurrentPage, this.currentPage: ", this.currentPage);
    }
  }

  getLastPageNumber(): number {
    // console.log("getLastPageNumber, lastPageNum: ", this.numOfPages - this.numberOfPageCombine + 1);
    return this.numOfPages - this.numberOfPageCombine;
  }

  range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
}