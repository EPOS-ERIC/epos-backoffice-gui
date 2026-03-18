import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint, DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WithSubscription } from 'src/helpers/subscription';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-contact-point',
  templateUrl: './contact-point.component.html',
  styleUrl: './contact-point.component.scss',
})
export class ContactPointComponent extends WithSubscription implements OnInit {
  constructor(
    private readonly entityExecutionService: EntityExecutionService,
    private readonly apiService: ApiService,
    private readonly snackbarService: SnackbarService,
    private readonly stateChangeService: StateChangeService,
    private readonly loadingService: LoadingService,
  ) {
    super();
  }

  @Input() contactPoint: Array<LinkedEntity> | undefined = undefined;

  public entityEnum = Entity;

  public contactPointDetails!: Promise<ContactPoint[]>[];

  public disabled = false;

  public addedContactPointDetail: ContactPoint | undefined;

  private getContactPointDetails(): void {
    const requests: Promise<ContactPoint[]>[] = [];
    this.contactPoint?.forEach((item: LinkedEntity) => {
      requests.push(
        this.apiService.endpoints[Entity.CONTACT_POINT].get.call(
          {
            metaId: item.metaId as string,
            instanceId: item.instanceId as string,
          },
          false,
        ),
      );
    });
    this.contactPointDetails = requests;
  }

  private initSubscriptions(): void {
    this.subscribe(this.stateChangeService.currentDataProductStateObs, (status: DataProduct['status'] | null) => {
      if (status === null || status === Status.PUBLISHED || status === Status.ARCHIVED) {
        this.disabled = true;
      }
    });
  }

  public ngOnInit(): void {
    this.initSubscriptions();
    this.syncContactPointsFromActiveDataProduct();
    this.getContactPointDetails();
  }

  private syncContactPointsFromActiveDataProduct(): void {
    const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
    if (!activeDataProduct?.contactPoint) {
      return;
    }

    this.contactPoint = [...activeDataProduct.contactPoint];
  }

  public updateContactPointArray(newContactPointDetails: Array<LinkedEntity>) {
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    this.contactPoint = newContactPointDetails;
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPoint;
      this.entityExecutionService.setActiveDataProduct(dataProduct);
    }
  }

  public handleAddedContactPointDetail(contactPoint: ContactPoint): void {
    this.addedContactPointDetail = { ...contactPoint };
  }

  public handleUnlinkContactPoint(contactPoint: ContactPoint): void {
    const removedInstanceId = contactPoint?.instanceId;

    if (!removedInstanceId) {
      return;
    }

    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    if (dataProduct == null) {
      return;
    }

    const updatedContactPoints = (dataProduct.contactPoint ?? []).filter(
      (item: LinkedEntity) => item.instanceId !== removedInstanceId,
    );

    dataProduct.contactPoint = updatedContactPoints;
    this.entityExecutionService.setActiveDataProduct(dataProduct);
    this.contactPoint = updatedContactPoints;

    this.snackbarService.openSnackbar(`Please save.`, 'close', SnackbarType.WARNING, 3000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-warning',
    ]);
  }

  public onLoadingChanged(isLoading: boolean): void {
    this.loadingService.setShowSpinner(isLoading);
  }
}
