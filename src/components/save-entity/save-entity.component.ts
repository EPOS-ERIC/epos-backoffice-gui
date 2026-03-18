/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-entity',
  templateUrl: './save-entity.component.html',
  styleUrl: './save-entity.component.scss',
})
export class SaveEntityComponent {
  @Input() entity!: string;

  @Input() hideDelete: boolean = false;

  @Input() disabled: boolean = true;

  @Output() onSave = new EventEmitter<null>();

  @Output() onDelete = new EventEmitter<null>();

  public handleSave(): void {
    this.onSave.emit();
  }

  public handleDelete(): void {
    this.onDelete.emit();
  }
}
