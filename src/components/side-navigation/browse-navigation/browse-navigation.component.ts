import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'generated/backofficeSchemas';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DialogNewEntityComponent } from 'src/components/dialogs/dialog-new-entity/dialog-new-entity.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActiveUserService } from 'src/services/activeUser.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-navigation',
  templateUrl: './browse-navigation.component.html',
  styleUrls: ['./browse-navigation.component.scss'],
})
export class BrowseNavigationComponent implements OnInit {
  public userInfo: User | null = null;

  public loading$ = false;

  private readonly subscriptions: Array<Subscription> = [];

  constructor(
    private readonly router: Router,
    private readonly activeUserService: ActiveUserService,
    private readonly dialogService: DialogService,
    private readonly apiService: ApiService,
    private readonly snackbarService: SnackbarService,
    private readonly loadingService: LoadingService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initSubscriptions();
    this.activeUserService.activeUserInfoObservable.subscribe((userInfo: User | null) => {
      this.userInfo = userInfo;
    });
  }

  private handleCreate(): void {
    const item: DataProduct = {
      created: '',
    };

    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProduct) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'View', SnackbarType.SUCCESS, 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar(
          `Error: failed to create new Data Product`,
          'close',
          SnackbarType.ERROR,
          6000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        );
      });
  }

  private initSubscriptions(): void {
    this.subscriptions.push(
      this.loadingService.showSpinnerObs.subscribe((val: boolean) => {
        this.loading$ = val;
        this.cdr.detectChanges();
      }),
    );
  }

  public isAdmin(userRole: string): boolean {
    return userRole === UserRole.ADMIN;
  }

  public isReviewer(userRole: string): boolean {
    return userRole === UserRole.REVIEWER;
  }

  public isEditor(userRole: string): boolean {
    return userRole === UserRole.EDITOR;
  }

  // Note: updated with latest changes, however not being called anywhere if not in commented out part of the template of this component !
  public handleNewDataProduct(): void {
    this.dialogService
      .openDialogForComponent(DialogNewEntityComponent, { entityType: Entity.DATA_PRODUCT }, 'new-dataproduct-dialog')
      .then((response) => {
        if (response.dataOut.create) {
          this.handleCreate();
        }
      });
  }
}
