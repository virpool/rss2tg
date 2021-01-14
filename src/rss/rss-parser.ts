import FeedParser from 'feedparser';
import { Stream } from 'stream';
import { Logger } from 'winston';
import { createLogger } from '../lib/logger';

export interface RssItem {
  title: string;
  description: string;
  link: string;
  author: string;
  date: Date | null
}

export interface RssParserHandler {
  onItems: (items: RssItem[]) => void;
  onError: (error: any) => void;
  onEnd: () => void;
}

export interface RssParser {
  parse(input: Stream, lastTime: number, parserHandler: RssParserHandler): void;
}

export class FeedRssParser implements RssParser {
  private logger: Logger = createLogger('FeedRssParser');

  parse(input: Stream, lastTime: number, parserHandler: RssParserHandler): void {
    const feedParser = new FeedParser({});
    feedParser.on('error', (err: any) => {
      this.logger.error(err);
      parserHandler.onError(err);
    });
    feedParser.on('readable', () => {
      let post;
      const posts: RssItem[] = [];
      while (post = feedParser.read()) {
        if (post.date!.getTime() > lastTime) {
          posts.push(post);
        } else {
          break;
        }
      }
      parserHandler.onItems(posts);
    });
    feedParser.on('end', () => parserHandler.onEnd());
    input.pipe(feedParser);
  }

}