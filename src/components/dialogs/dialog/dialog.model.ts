import { ComponentType } from '@angular/cdk/portal';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

export interface IDialog {
  component: ComponentType<DialogDeleteComponent>;
  content: ContactPoint;
}

export type DialogTypes = DialogDeleteComponent;
