import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ActionsService } from 'src/services/actions.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';
import { WebService } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-create-web-service-item',
  templateUrl: './create-web-service-item.component.html',
  styleUrls: ['./create-web-service-item.component.scss'],
})
export class CreateWebServiceItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public webservice: WebService | undefined;
  public enableSave = false;
  public loading = false;
  public floatLabelControl = new UntypedFormControl('auto');
  public entityRoute = EntityEndpointValue.WEBSERVICE;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  public ngOnInit(): void {
    this.trackFormData();
  }

  public handleCreate(): void {
    this.loading = true;
    const item: WebService = {
      uid: this.form.value['uid'],
      dateModified: '',
    };

    this.apiService.endpoints.WebService.create
      .call(item)
      .then((value: WebService) => {
        this.router.navigate([`/browse/${EntityEndpointValue.WEBSERVICE}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar('Successfully created webservice.', 'close', SnackbarType.SUCCESS, 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.WEBSERVICE,
            route: EntityEndpointValue.WEBSERVICE,
            label: 'Webservice',
            status: Status.DRAFT,
            color: 'draft',
            id: value.instanceId as string,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId as string);
      })
      .catch(() => {
        this.snackbarService.openSnackbar('Failed to create new webservice.', 'close', SnackbarType.ERROR, 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      })
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.webservice?.uid,
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
