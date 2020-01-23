import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Rss } from '../models/rss.interface';
import { environment } from 'src/environments/environment';
import { MainFeed } from '../models/main-feed.interface';

@Injectable({
  providedIn: 'root'
})
export class Rss2jsonService {

  private rssToJsonServiceBaseUrl: string = `https://rss2json.com/api.json?api_key=${environment.apiKey}&rss_url=`;

  constructor(
    private http: HttpClient
  ) { }

  getFeedContent(url: string): Observable<MainFeed> {
    return this.http.get<MainFeed>(this.rssToJsonServiceBaseUrl + url)
            .pipe(
              map(this.extractFeeds),
              catchError(this.handleError)
            );
  }

  private extractFeeds(data: MainFeed): MainFeed {
    return data;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
