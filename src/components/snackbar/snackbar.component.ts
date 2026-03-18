import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ISnackbar } from './snackbar.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackbar,
    private snackbarRef: MatSnackBarRef<SnackbarComponent>,
  ) {}

  public handleClose() {
    this.snackbarRef.dismiss();
  }
}
