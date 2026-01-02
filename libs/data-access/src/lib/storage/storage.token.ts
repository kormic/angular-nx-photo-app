import { InjectionToken } from '@angular/core';
import { StorageService } from './storage.service';

export const STORAGE_TOKEN = new InjectionToken<StorageService>('Storage Service');
