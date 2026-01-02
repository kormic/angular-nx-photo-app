export interface StorageService {
  saveToStorage<T>(key: string, value: T): void;
  loadFromStorage<T>(key: string, fallbackValue: T): T;
}
