import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly showSpinner = new BehaviorSubject<boolean>(false);
  public showSpinnerObs = this.showSpinner.asObservable();

  private _loadingCount = 0;

  private isLoading(): boolean {
    return 0 !== this._loadingCount;
  }

  public setShowSpinner(show: boolean): void {
    if (show) {
      this._loadingCount++;
    } else if (this._loadingCount > 0) {
      this._loadingCount--;
    }
    this.showSpinner.next(this.isLoading());
  }
}
