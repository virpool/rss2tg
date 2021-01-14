import 'reflect-metadata';
import {container} from "tsyringe";
import App from './app';
import { logger } from './lib/logger';
import LoaderRequest from './network/loader-request';
import { FeedRssParser } from './rss/rss-parser';
import { StorageFsFactory } from './storage/storage-factory';

container.register('Loader', {
  useClass: LoaderRequest
});
container.register('RssParser', {
  useClass: FeedRssParser
});
container.register('StorageFactory', {
  useClass: StorageFsFactory
});

container.resolve(App).run();

logger.info('rss2tg started');