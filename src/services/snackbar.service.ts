import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackbar(
    title: string,
    action: string,
    type: SnackbarType,
    duration?: number,
    panelClass?: Array<string>,
  ): MatSnackBarRef<SnackbarComponent> {
    return this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 5000,
      data: {
        title,
        action,
        type,
      },
      panelClass,
    });
  }
}

export enum SnackbarType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}
