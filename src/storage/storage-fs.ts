import Storage from './storage.interface';

import { readFile, writeFile } from 'fs/promises';

export default class StorageFs implements Storage {

  constructor(
    readonly filePath: string
  ) {

  }

  async get(): Promise<number> {
    try {
      return +(await readFile(this.filePath)).toString();
    } catch {
      return Date.now();
    }
  }

  async save(value: number): Promise<void> {
    try {
      await writeFile(this.filePath, value.toString());
    } catch {
      // just do nothing
    }
  }

}