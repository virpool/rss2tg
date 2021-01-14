import StorageFs from './storage-fs';
import Storage from './storage.interface';

export interface StorageFactory {
  createStorage(path: string): Storage;
}

export class StorageFsFactory implements StorageFactory {

  createStorage(path: string): Storage {
    return new StorageFs(path);
  }

}