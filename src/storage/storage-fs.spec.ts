import StorageFs from './storage-fs';
import * as path from 'path';
import * as fs from 'fs/promises';

describe('General tests for StorageFs', () => {
  let storage: StorageFs;

  let fileName = path.resolve('/tmp', `test_storage_fs_${Date.now()}.tmp`);

  beforeEach(() => {
    storage = new StorageFs(fileName);
  });

  test('Should get defined value by default', async () => {
    expect(await storage.get() / 1000).toBeCloseTo(Date.now() / 1000);
  });

  test('Should saving passed value', async () => {
    await storage.save(42);
    expect(await storage.get()).toBe(42);
  });

  afterAll(async () => {
    await fs.unlink(fileName);
  });

});