import { Injectable } from '@angular/core';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Injectable({
  providedIn: 'root',
})
export class PersistorService {
  public getValueFromStorage(storageType: StorageType, key: StorageKey): string | null {
    switch (storageType) {
      case StorageType.LOCAL_STORAGE:
        return localStorage.getItem(key);
      case StorageType.SESSION_STORAGE:
        return sessionStorage.getItem(key);
    }
  }

  public setValueInStorage(storageType: StorageType, key: StorageKey, value: string): void {
    switch (storageType) {
      case StorageType.LOCAL_STORAGE:
        localStorage.setItem(key, value);
        break;
      case StorageType.SESSION_STORAGE:
        sessionStorage.setItem(key, value);
        break;
    }
  }

  public removeItemFromStorage(storageType: StorageType, key: StorageKey): void {
    switch (storageType) {
      case StorageType.LOCAL_STORAGE:
        localStorage.removeItem(key);
        break;
      case StorageType.SESSION_STORAGE:
        sessionStorage.removeItem(key);
        break;
    }
  }
}

export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
}
