import { Injectable, OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';

@Injectable()
export abstract class WithSubscription implements OnDestroy {
  private subSink = new Subscription();

  public ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  protected subscribe<T>(
    observable: Observable<T>,
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription | void {
    return this.subSink.add(
      observable.subscribe({
        next: observerOrNext as any,
        error,
        complete,
      }),
    );
  }

  protected unsubscribe(innerSub: Subscription) {
    this.subSink.remove(innerSub);
  }
}
