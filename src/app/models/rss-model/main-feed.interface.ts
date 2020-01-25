import { Rss } from './rss.interface';
import { Feed } from './feed.interface';

export interface MainFeed {
    status: string;
    feed: Feed;
    items: Array<Rss>;
}
