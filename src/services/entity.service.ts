import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private panelOpened = new BehaviorSubject<boolean>(false);
  public panelOpenedObs = this.panelOpened.asObservable();

  private focusedDistribution = new BehaviorSubject<string>('');
  public focusedDistributionObs = this.focusedDistribution.asObservable();

  public handlePanelOpened(): void {
    this.panelOpened.next(true);
  }

  public setFocusedDistribution(distributionId: string): void {
    this.focusedDistribution.next(distributionId);
  }
}
