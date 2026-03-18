import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { DialogData } from '../baseDialogService.abstract';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-webservice-add-operation',
  templateUrl: './dialog-webservice-add-operation.component.html',
  styleUrls: ['./dialog-webservice-add-operation.component.scss'],
})
export class DialogWebserviceAddOperationComponent implements OnInit {
  public formFields: Operation = { uid: '' };
  public form!: UntypedFormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<string>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    this.form.valueChanges.subscribe((changes) => {
      this.data.dataOut = {
        uid: changes['uid'],
      };
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      uid: [null, Validators.required],
    });
  }

  public handleCancel(): void {
    this.data.dataOut.action = 'cancel';
    this.data.close();
  }

  public handleAdd(): void {
    this.data.dataOut.action = 'add';
    this.data.close();
  }
}
