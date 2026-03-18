import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DataProduct, SoftwareApplication } from 'generated/backofficeSchemas';
import { BehaviorSubject } from 'rxjs';
import { Entity } from 'src/utility/enums/entity.enum';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  public activeEntityType = new BehaviorSubject<Entity | null>(null);
  public activeEntityTypeObs = this.activeEntityType.asObservable();

  private revisions = new BehaviorSubject<Array<DataProduct> | Array<SoftwareApplication>>([]);
  public revisionsObs = this.revisions.asObservable();

  public static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  public static isValidDate(d: unknown) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  public static whiteSpaceReplace(str: string | undefined): string {
    if (str) {
      str = str.replace(/\s*,\s*/g, ', ');
      return str;
    }
    return '';
  }

  public setRevisions(revisions: Array<DataProduct> | Array<SoftwareApplication>): void {
    this.revisions.next(revisions);
  }

  public clearDatePicker(control: AbstractControl): void {
    control.reset();
  }

  public isValidHttpUrl(urlToCheck: string) {
    let url;
    try {
      url = new URL(urlToCheck);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  public shallowEqual(object1: Record<string, unknown>, object2: Record<string, unknown>) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  public formatArrayVal(testValue: string | Array<string> | undefined): Array<string> {
    let toReturn: string[] = [];
    if (testValue) {
      if (typeof testValue === 'string' || testValue instanceof String) {
        toReturn = [testValue as string];
      } else {
        toReturn = testValue;
      }
    }
    return toReturn;
  }
}
