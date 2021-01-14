import { inject } from 'tsyringe';
import Loader from '../network/loader.interface';
import { RssParser } from '../rss/rss-parser';
import { StorageFactory } from '../storage/storage-factory';
import Storage from '../storage/storage.interface';

abstract class Worker {
  private readonly storage: Storage;

  constructor(
    @inject('Loader') private loader: Loader,
    @inject('RssParser') private rssParser: RssParser,
    @inject('StorageFactory') private storageFactory: StorageFactory
  ) {
    this.storage = this.storageFactory.createStorage(this.getFileName());
  }

  abstract getFileName(): string;

  abstract getRssUrl(): string;

  getHeaders(): object {
    return {};
  }

  async process(): Promise<void> {
    const lastTime = await this.storage.get();
    const rss = this.loader.fetch(this.getRssUrl(), this.getHeaders());
    let newLastTime = 0;
    this.rssParser.parse(rss, lastTime, {
      onItems: (items) => {
        if (items.length && newLastTime === 0) {
          newLastTime = (items[0].date || new Date()).getTime();
        }
      },
      onEnd: () => {
        this.storage.save(newLastTime);
      },
      onError: (err) => {

      }
    });
  }

}