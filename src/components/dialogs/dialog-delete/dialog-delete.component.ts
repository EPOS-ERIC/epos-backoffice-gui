import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableUserDetail } from 'src/utility/objects/table/userDetail';
import { DialogData } from '../baseDialogService.abstract';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<TableUserDetail>) {}

  public handleCancel(): void {
    this.data.dataOut = 'cancel';
    this.data.close();
  }

  public handleDelete(): void {
    this.data.dataOut = 'delete';
    this.data.close();
  }
}
