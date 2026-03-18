import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';
import { SnackbarService, SnackbarType } from './snackbar.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityExecutionService } from './calls/entity-execution.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { LoadingService } from './loading.service';
import { DataProduct, SoftwareApplication, SoftwareSourceCode } from 'generated/backofficeSchemas';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  private triggerReload = new Subject<boolean>();
  public triggerReloadObs = this.triggerReload.asObservable();

  private currentDataProductState = new BehaviorSubject<DataProduct['status'] | undefined>(undefined);
  public currentDataProductStateObs = this.currentDataProductState.asObservable();

  private currentSoftwareApplicationState = new BehaviorSubject<SoftwareApplication['status'] | undefined>(undefined);
  public currentSoftwareApplicationStateObs = this.currentSoftwareApplicationState.asObservable();

  private currentSoftwareSourceCodeState = new BehaviorSubject<SoftwareSourceCode['status'] | undefined>(undefined);
  public currentSoftwareSourceCodeStateObs = this.currentSoftwareSourceCodeState.asObservable();

  constructor(
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
  ) {}

  public getCurrentDataProductState(): DataProduct['status'] | null {
    return this.currentDataProductState.getValue();
  }
  public setCurrentDataProductState(state: DataProduct['status']): void {
    this.currentDataProductState.next(state);
  }

  public getCurrentSoftwareApplicationState(): SoftwareApplication['status'] | null {
    return this.currentSoftwareApplicationState.getValue();
  }
  public setCurrentSoftwareApplicationState(state: SoftwareApplication['status']): void {
    this.currentSoftwareApplicationState.next(state);
  }

  public getCurrentSoftwareSourceCodeState(): SoftwareSourceCode['status'] | null {
    return this.currentSoftwareSourceCodeState.getValue();
  }
  public setCurrentSoftwareSourceCodeState(state: SoftwareSourceCode['status']): void {
    this.currentSoftwareSourceCodeState.next(state);
  }

  public handleStateChange(
    state: DataProduct['status'] | SoftwareApplication['status'] | SoftwareSourceCode['status'],
    entity: Entity,
  ) {
    let message = '';

    switch (state) {
      case Status.SUBMITTED: {
        message = `Are you sure you'd like to Submit this draft?`;
        break;
      }
      case Status.PUBLISHED: {
        message = `Are you sure you'd like to publish this submission?`;
        break;
      }
      case Status.DISCARDED: {
        message = `Are you sure you'd like to reject this submission?`;
        break;
      }
      case Status.ARCHIVED: {
        message = `Are you sure you'd like to archive this published instance?`;
        break;
      }
      case Status.DRAFT: {
        message = `Are you sure you'd like to revert this discarded instance back to draft?`;
        break;
      }
    }

    this.dialogService.openConfirmationDialog(message, false).then((accept: boolean) => {
      if (accept) {
        this.loadingService.setShowSpinner(true);
        switch (entity) {
          case Entity.DATA_PRODUCT: {
            this.handleChangeEntityState(
              this.entityExecutionService.getActiveDataProductValue()?.instanceId as string,
              state,
            );
            break;
          }
          case Entity.SOFTWARE_APPLICATION: {
            this.handleChangeEntityState(
              this.entityExecutionService.getActiveSoftwareApplicationValue()?.instanceId as string,
              state,
            );
            break;
          }
          case Entity.SOFTWARE_SOURCE_CODE: {
            this.handleChangeEntityState(
              this.entityExecutionService.getActiveSoftwareSourceCodeValue()?.instanceId as string,
              state,
            );
            break;
          }
          case Entity.DISTRIBUTION: {
            break;
          }
          case Entity.WEBSERVICE: {
            break;
          }
        }
      }
    });
  }

  private handleChangeEntityState(
    instanceId: string,
    state: DataProduct['status'] | SoftwareApplication['status'] | SoftwareSourceCode['status'],
  ) {
    let message = '';

    switch (state) {
      case Status.SUBMITTED: {
        message =
          'Draft submitted successfully. An Email with your submission details has been sent to the Admin of your group.';
        break;
      }
      case Status.PUBLISHED: {
        message = 'Submission published successfully';
        break;
      }
      case Status.DISCARDED: {
        message = 'Submission discarded successfully';
        break;
      }
      case Status.ARCHIVED: {
        message = 'Published instance archived successfully';
        break;
      }
      case Status.DRAFT: {
        message = 'Reverted to Draft successfully';
        break;
      }
    }
    // DataProduct
    if (this.entityExecutionService.getActiveDataProductValue() != null) {
      this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
        .call({
          instanceId: instanceId,
          status: state,
        })
        .then(() => {
          this.snackbarService.openSnackbar(message, 'Close', SnackbarType.SUCCESS, 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar(
            'Error changing the state of this Data Product, please try again later.',
            'Close',
            SnackbarType.ERROR,
            5000,
            ['snackbar', 'mat-toolbar', 'snackbar-error'],
          );
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
      // SoftwareApplication
    } else if (this.entityExecutionService.getActiveSoftwareApplicationValue() != null) {
      this.apiService.endpoints[Entity.SOFTWARE_APPLICATION].updateState
        .call({
          instanceId: instanceId,
          status: state,
        })
        .then(() => {
          this.snackbarService.openSnackbar(message, 'Close', SnackbarType.SUCCESS, 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar(
            'Error changing the state of this Software Application, please try again later.',
            'Close',
            SnackbarType.ERROR,
            5000,
            ['snackbar', 'mat-toolbar', 'snackbar-error'],
          );
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
      // SoftwareSourceCode
    } else if (this.entityExecutionService.getActiveSoftwareSourceCodeValue() != null) {
      this.apiService.endpoints[Entity.SOFTWARE_SOURCE_CODE].updateState
        .call({
          instanceId: instanceId,
          status: state,
        })
        .then(() => {
          this.snackbarService.openSnackbar(message, 'Close', SnackbarType.SUCCESS, 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar(
            'Error changing the state of this Software Source Code, please try again later.',
            'Close',
            SnackbarType.ERROR,
            5000,
            ['snackbar', 'mat-toolbar', 'snackbar-error'],
          );
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }

  // ** NEW: TO ADD ** handleChange SoftwareApplication
  // ** ...
  // ** ...
  // ** ...
  // ** NEW: TO ADD ** handleChange SoftwareSourceCode
  // ** ...
  // ** ...
  // ** ...
}
