import { BaseRouteReuseStrategy } from '@angular/router';

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
  public override shouldReuseRoute(): boolean {
    return false;
  }
}
