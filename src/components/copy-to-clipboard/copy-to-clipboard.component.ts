import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
})
export class CopyToClipboardComponent {
  @Input() textVal = '';

  public handleCopyValue() {
    navigator.clipboard.writeText(this.textVal).then(
      () => {
        return;
      },
      (err) => {
        console.error('Failed to copy text.', err);
      },
    );
  }
}
