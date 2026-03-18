import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() path: string = '';

  constructor(private router: Router) {}

  public handleBack(): void {
    if (this.path !== '') {
      this.router.navigate([this.path]);
    }
  }
}
