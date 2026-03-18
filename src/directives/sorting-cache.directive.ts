import { Directive, OnInit } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';

const KEY = 'MAT_SORT';

interface MatSortData {
  active: string;
  direction: SortDirection;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[sortingCache]',
})
export class SortingDirective implements OnInit {
  get matSort(): MatSortData {
    return JSON.parse(sessionStorage.getItem(window.location.pathname + '?' + KEY) as string);
  }

  set matSort(mat: MatSortData) {
    sessionStorage.setItem(window.location.pathname + '?' + KEY, JSON.stringify(mat));
  }

  constructor(private el: MatSort) {}

  ngOnInit(): void {
    if (this.matSort) {
      this.el.active = this.matSort.active;
      this.el.direction = this.matSort.direction;
    }

    this.el.sortChange.subscribe((sort: Sort) => {
      this.matSort = {
        active: sort.active,
        direction: sort.direction,
      };
    });
  }
}
