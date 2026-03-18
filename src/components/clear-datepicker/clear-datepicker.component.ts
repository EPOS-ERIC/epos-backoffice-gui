/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';

@Component({
  selector: 'app-clear-datepicker',
  templateUrl: './clear-datepicker.component.html',
  styleUrls: ['./clear-datepicker.component.scss'],
})
export class ClearDatepickerComponent {
  @Input() value!: MtxDatetimepickerModule;
  @Input() inputDisabled = false;
  @Output() onClear = new EventEmitter<unknown>();

  public handleClearDate(): void {
    this.onClear.emit();
  }
}
