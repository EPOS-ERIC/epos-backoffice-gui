import { Observable, Subscription, last } from 'rxjs';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';
import { ActiveUserService } from 'src/services/activeUser.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { Status } from 'src/utility/enums/status.enum';
import { LoadingService } from 'src/services/loading.service';
import { Router } from '@angular/router';
import { User } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  public userInfo$!: Observable<User | null>;

  public actionItems: Array<IActionItem> = [
    {
      label: 'Draft',
      count: 0,
      color: 'default',
      type: Status.DRAFT,
    },
    {
      label: 'Submitted',
      count: 0,
      color: 'warning',
      type: Status.SUBMITTED,
    },
    {
      label: 'Published',
      count: 0,
      color: 'success',
      type: Status.PUBLISHED,
    },
    {
      label: 'Archived',
      count: 0,
      color: 'error',
      type: Status.ARCHIVED,
    },
    {
      label: 'Discarded',
      count: 0,
      color: 'error',
      type: Status.DISCARDED,
    },
  ];

  public loading$ = this.loadingService.showSpinnerObs;

  constructor(
    private readonly activeUserService: ActiveUserService,
    private actionsService: ActionsService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadingService.setShowSpinner(true);
    this.subscriptions.push(
      this.activeUserService.activeUserInfoObservable.subscribe(() => {
        this.loadingService.setShowSpinner(false);
      }),
    );
    this.userInfo$ = this.activeUserService.activeUserInfoObservable;
    this.userInfo$.pipe(last()).subscribe((userInfo: User | null) => {
      if (userInfo == null) {
        this.router.navigate(['/login']);
      }
    });
    this.actionsService.initEditedItems();
    this.actionsService.editedItemsObservable.subscribe((editedItems: Array<IChangeItem>) => {
      this.getCounts(editedItems);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private getCounts(editedItems: Array<IChangeItem>): void {
    const types = Object.values(Status);
    editedItems.map((item) => {
      if (types.includes(item.status)) {
        const index = this.actionItems.findIndex((obj) => obj.type === item.status);
        this.actionItems[index].count += 1;
      }
    });
  }
}
