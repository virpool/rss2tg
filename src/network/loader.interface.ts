import { Request } from 'request';
import { Stream } from 'stream';

export default interface Loader {
  fetch(url: string, headers: object): Stream;
}
