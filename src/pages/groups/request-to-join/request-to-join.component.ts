import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Group } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { UpdateUserInGroupParams } from 'src/apiAndObjects/api/group/putUpdateUserInGroup';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActiveUserService } from 'src/services/activeUser.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { UserGroupRequestStatus } from 'src/utility/enums/userGroupRequestStatus.enum';
import { UserRole } from 'src/utility/enums/UserRole.enum';

@Component({
  selector: 'app-request-to-join',
  templateUrl: './request-to-join.component.html',
  styleUrls: ['./request-to-join.component.scss'],
})
export class ViewGroupsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns = ['name', 'description'];
  public dataSource!: MatTableDataSource<Group>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = true;

  constructor(
    private apiService: ApiService,
    private activeUserService: ActiveUserService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.loading = true;
    this.apiService.endpoints.Group.getAll
      .call()
      .then((data: Array<Group>) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .finally(() => (this.loading = false));
  }

  public requestToJoinGroup(group: Group): void {
    const params: UpdateUserInGroupParams = {
      groupid: group.id as string,
      role: this.activeUserService.getActiveUser()?.isAdmin ? UserRole.ADMIN : UserRole.EDITOR,
      statusType: this.activeUserService.getActiveUser()?.isAdmin
        ? UserGroupRequestStatus.ACCEPTED
        : UserGroupRequestStatus.PENDING,
      userid: this.activeUserService.getActiveUser()?.authIdentifier as string,
    };

    this.dialogService
      .openConfirmationDialog(`Are you sure you'd like to join ${group.name}?`)
      .then((accepted: boolean) => {
        if (accepted) {
          this.apiService.endpoints.Group.updateUserInGroup
            .call(params)
            .then(() => {
              window.location.reload();
              this.snackbarService.openSnackbar(
                `Successfully joined: ${group.name}`,
                'close',
                SnackbarType.SUCCESS,
                6000,
                ['snackbar', 'mat-toolbar', 'snackbar-success'],
              );
            })
            .catch(() => {
              this.snackbarService.openSnackbar(
                `Error: failed to join ${group.name}`,
                'close',
                SnackbarType.ERROR,
                6000,
                ['snackbar', 'mat-toolbar', 'snackbar-error'],
              );
            });
        }
      });
  }
}
