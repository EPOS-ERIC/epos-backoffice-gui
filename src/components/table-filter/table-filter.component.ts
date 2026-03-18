/* eslint-disable @angular-eslint/no-output-on-prefix, @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActionsService } from 'src/services/actions.service';
import { FilterItem } from 'src/shared/interfaces/form.interface';
import { Status } from 'src/utility/enums/status.enum';

const TITLE_KEY = 'titleSearchText';
const COMMENT_KEY = 'commentSearchText';

export interface FilterEmit {
  status: any;
  title: string;
  changeComment: any;
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent {
  constructor(private actionsService: ActionsService) {}

  @Output() onFilter: EventEmitter<FilterEmit> = new EventEmitter();
  @Output() onSubmit: EventEmitter<null> = new EventEmitter();
  @Output() onClear: EventEmitter<null> = new EventEmitter();

  public statusOptions: FilterItem[] = [
    {
      option: '',
      label: 'Any',
    },
    {
      option: Status.DRAFT,
      label: 'Draft',
    },
    {
      option: Status.SUBMITTED,
      label: 'Submitted',
    },
    {
      option: Status.PUBLISHED,
      label: 'Published',
    },
    {
      option: Status.DISCARDED,
      label: 'Discarded',
    },
    {
      option: Status.ARCHIVED,
      label: 'Archived',
    },
  ];
  public filters = {
    status: '',
    title: '',
    changeComment: '',
  };

  public handleFilterByStatus(event: MatSelectChange): void {
    this.filters.status = event.value;
  }

  public handleTitleSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.title = target.value;
    sessionStorage.setItem(TITLE_KEY, target.value);
  }

  public handleCommentSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.changeComment = target.value;
    sessionStorage.setItem(COMMENT_KEY, target.value);
  }

  public handleClearFilters(): void {
    this.filters.status = '';
    this.filters.title = '';
    this.filters.changeComment = '';
    this.onClear.emit();
  }

  public handleViewResults(): void {
    this.onFilter.emit(this.filters);
  }
}
