/* eslint-disable @angular-eslint/no-output-on-prefix, @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActionsService } from 'src/services/actions.service';
import { FilterItem } from 'src/shared/interfaces/form.interface';
import { Status } from 'src/utility/enums/status.enum';
import { ActiveUserService } from 'src/services/activeUser.service';

const TITLE_KEY = 'titleSearchText';
// All SaveComment code in this file has been commented out since it's not in use at the moment, but might turn in useful in the future
/* const COMMENT_KEY = 'commentSearchText'; */

export interface FilterEmit {
  status: any;
  title: string;
  /* changeComment: any; */
  author: any;
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent {
  constructor(private actionsService: ActionsService, private activeUserService: ActiveUserService) {}

  @Input() sectionName!: string;
  @Input() editorIdsMapping!: Map<string, string>;

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
  public authorOptions: FilterItem[] = [
    {
      option: 'all',
      label: 'ALL',
    },
    {
      option: 'me',
      label: 'Me',
    },
  ];
  public selectedAuthorOption = 'all';
  public filters = {
    status: '',
    title: '',
    /* changeComment: '', */
    // Empty author filter means no filtering ("all")
    author: '',
  };

  public handleFilterByStatus(event: MatSelectChange): void {
    this.filters.status = event.value;
  }

  public handleFilterByAuthor(event: MatSelectChange): void {
    this.selectedAuthorOption = event.value;

    if (event.value === 'me') {
      if (this.activeUserService.getActiveUser()) {
        const myId = this.editorIdsMapping.get(this.activeUserService.getActiveUser()?.authIdentifier as string);
        if (myId) {
          this.filters.author = myId;
        }
      } else {
        this.filters.author = '';
      }
    } else {
      // just passing empty filter for ALL value (empty author filter = no filtering, all results are shown)
      this.filters.author = '';
    }
  }

  public handleTitleSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.title = target.value;
    sessionStorage.setItem(TITLE_KEY, target.value);
  }

  /* public handleCommentSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.changeComment = target.value;
    sessionStorage.setItem(COMMENT_KEY, target.value);
  } */

  public handleClearFilters(): void {
    this.filters.status = '';
    this.filters.title = '';
    /* this.filters.changeComment = ''; */
    this.filters.author = '';
    this.selectedAuthorOption = 'all';
    this.onClear.emit();
  }

  public handleViewResults(): void {
    this.onFilter.emit(this.filters);
  }

  public userCanAtLeastEdit() {
    const user = this.activeUserService.getActiveUser();
    if (user) {
      const canAtLeastEdit = user.groups?.some(
        (group) => group.role === 'EDITOR' || group.role === 'REVIEWER' || group.role === 'ADMIN',
      );
      if (canAtLeastEdit) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
