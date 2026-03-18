import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'generated/backofficeSchemas';
import { last, Observable, Subscription } from 'rxjs';
import { ActiveUserService } from 'src/services/activeUser.service';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-groups-home',
  templateUrl: './groups-home.component.html',
  styleUrls: ['./groups-home.component.scss'],
})
export class GroupsHomeComponent implements OnInit {
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();
  public userInfo$!: Observable<User | null>;
  public loading$ = this.loadingService.showSpinnerObs;

  constructor(
    private loadingService: LoadingService,
    private activeUserService: ActiveUserService,
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
  }
}
