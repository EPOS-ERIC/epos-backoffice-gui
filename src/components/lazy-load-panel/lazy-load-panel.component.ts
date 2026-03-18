import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface HeaderClass {
  active: boolean;
}

@Component({
  selector: 'app-lazy-load-panel',
  templateUrl: './lazy-load-panel.component.html',
  styleUrls: ['./lazy-load-panel.component.scss'],
})
export class LazyLoadPanelComponent implements OnInit {
  @Input() expanded = false;
  @Input() title = '';
  @Input() headerClass!: HeaderClass;
  @Output() afterLoad = new EventEmitter();
  @Output() afterOpened = new EventEmitter();
  @Output() afterClosed = new EventEmitter();

  public ngOnInit(): void {
    this.afterLoad.emit();
  }

  public handleOpened(): void {
    this.afterOpened.emit();
  }

  public handleClosed(): void {
    this.afterClosed.emit();
  }
}
