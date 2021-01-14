import Loader from './loader.interface';
import * as request from 'request';
import { Stream } from 'stream';

export default class LoaderRequest implements Loader {
  fetch(url: string, headers: object = {}): Stream {
    return request.get(url, {
      headers
    });
  }
}
