import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private previousRoute = new BehaviorSubject<string>('');
  public previousRouteObs = this.previousRoute.asObservable();

  public distributionAllVisitedSrc = new BehaviorSubject<boolean>(false);
  public distributionAllVisitedObs = this.distributionAllVisitedSrc.asObservable();

  public setPreviousRoute(route: string): void {
    this.previousRoute.next(route);
  }

  public distributionAllVisited(value: boolean): void {
    this.distributionAllVisitedSrc.next(value);
  }
}
