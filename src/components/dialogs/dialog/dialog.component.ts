import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTypes, IDialog } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public portal!: ComponentPortal<DialogTypes>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialog) {}

  ngOnInit(): void {
    this.portal = new ComponentPortal(this.data.component);
  }

  public handleComponentRender(ref: CdkPortalOutletAttachedRef): void {
    if (this.data.content) {
      ref = ref as ComponentRef<IDialog>;
      ref.instance['data'] = [this.data.content];
    }
  }

  public isDeleteDialog(): boolean {
    return this.data.component.name === 'DialogDeleteComponent';
  }
}
