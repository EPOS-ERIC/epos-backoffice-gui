import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-back-to-top-button',
  templateUrl: './back-to-top-button.component.html',
  styleUrls: ['./back-to-top-button.component.scss'],
})
export class BackToTopButtonComponent {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onScrollToTop: EventEmitter<null> = new EventEmitter();

  public scrollToTop(): void {
    this.onScrollToTop.emit();
  }
}
