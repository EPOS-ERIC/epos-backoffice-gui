import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

export interface NewDistribution {
  cancel: boolean;
}

@Component({
  selector: 'app-dialog-dataproduct-add-distribution',
  templateUrl: './dialog-dataproduct-add-distribution.component.html',
  styleUrls: ['./dialog-dataproduct-add-distribution.component.scss'],
})
export class DialogDataproductAddDistributionComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DialogDataproductAddDistributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<null, NewDistribution>,
  ) {}

  public form!: UntypedFormGroup;

  public handleClose(): void {
    this.data.dataOut.cancel = true;
    this.data.close();
  }

  public handleCreate(): void {
    this.data.dataOut.cancel = false;
    this.data.close();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      uid: ['', Validators.required],
    });
  }
}
