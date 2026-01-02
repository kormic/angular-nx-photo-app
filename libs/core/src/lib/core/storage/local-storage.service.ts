import { Injectable } from '@angular/core';
import { StorageService } from '@photo-library/data-access';

@Injectable()
export class LocaleStorageService implements StorageService {
  saveToStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  loadFromStorage<T>(key: string, fallbackValue: T): T {
    const item = localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : fallbackValue;
  }
}
