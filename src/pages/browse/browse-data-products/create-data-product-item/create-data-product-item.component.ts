import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProduct } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-create-data-product-item',
  templateUrl: './create-data-product-item.component.html',
  styleUrls: ['./create-data-product-item.component.scss'],
})
export class CreateDataProductItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public dataProduct!: DataProduct | undefined;
  public floatLabelControl = new UntypedFormControl('auto');
  public loading = false;
  public enableSave = true;
  public entityRoute = EntityEndpointValue.DATA_PRODUCT;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleCreate(): void {
    this.loading = true;
    const item: DataProduct = {
      uid: this.form.value['uid'],
      modified: '',
      created: '',
    };

    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProduct) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', SnackbarType.SUCCESS, 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.DATA_PRODUCT,
            route: EntityEndpointValue.DATA_PRODUCT,
            label: 'Data product',
            status: Status.DRAFT,
            color: 'draft',
            id: value.instanceId as string,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId as string);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(
          `Error: failed to create new Data Product`,
          'close',
          SnackbarType.ERROR,
          6000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        ),
      )
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid ?? 'dummy-uid-to-be-replaced',
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
