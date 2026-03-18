import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { ActiveUserService } from 'src/services/activeUser.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss'],
})
export class NewGroupComponent implements OnInit {
  public form!: UntypedFormGroup;
  public newGroup: Group = { description: '', id: '', name: '', entities: [], users: [] };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private activeUserService: ActiveUserService,
    private snackbarService: SnackbarService,
  ) {}

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
    });
    this.form.valueChanges.subscribe((changes) => {
      this.newGroup.name = changes['name'];
      this.newGroup.description = changes['description'];
    });
    console.log(this.activeUserService.getActiveUser());
  }

  public submitGroup() {
    this.newGroup.users.push({
      authIdentifier: this.activeUserService.getActiveUser()?.authIdentifier ?? '',
    });
    this.apiService.endpoints.Group.create
      .call(this.newGroup)
      .then(() => {
        this.snackbarService.openSnackbar(
          `Success: ${this.newGroup.name} created`,
          'close',
          SnackbarType.SUCCESS,
          6000,
          ['snackbar', 'mat-toolbar', 'snackbar-success'],
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        this.snackbarService.openSnackbar(`Error: failed to create new Group`, 'close', SnackbarType.ERROR, 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      });
  }
}
