import Loader from './network/loader.interface';
import {injectable, inject} from "tsyringe";

@injectable()
export default class App {
  constructor(
    @inject("Loader") private loader: Loader
  ) {}

  run() {
    this.loader.fetch('http://ifconfig.me', {}).pipe(process.stdout);

    /*
      const lastTime = fetchLastPollTime();
      const rssFeads = getActualFeeds(lastTime);
      for await (const feed of rssFeads) {
        // process etc.
      }
      postToTelegram();
    */
  }
}


