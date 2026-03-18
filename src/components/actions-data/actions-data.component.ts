import { Component, Input } from '@angular/core';
import { IActionItem } from './actions-data.interface';

@Component({
  selector: 'app-actions-data',
  templateUrl: './actions-data.component.html',
  styleUrls: ['./actions-data.component.scss'],
})
export class ActionsDataComponent {
  public actionItems: Array<IActionItem> = [];

  @Input() title = 'Title';
  @Input() ariaLabel = '';
  @Input() set items(value: Array<IActionItem>) {
    this.actionItems = value;
  }
}
