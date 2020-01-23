import { Feed } from './../../models/feed.interface';
import { Rss2jsonService } from './../../services/rss2json.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Rss } from 'src/app/models/rss.interface';

@Component({
  selector: 'app-flux-rss',
  templateUrl: './flux-rss.component.html',
  styleUrls: ['./flux-rss.component.css']
})
export class FluxRssComponent implements OnInit, OnDestroy, OnChanges {
  
  url: string;

  public currentTemplate: number = 0;

  public feed: Feed;
  public items: Array<Rss> = [];

  datasDoubleOld: Array<any> = [];
  datasDoubleEven: Array<any> = [];

  private destroyed = new Subject<any>();

  constructor(
    private location: Location,
    private router: Router,
    private rss2jsonService: Rss2jsonService
  ) { 
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe((value) => {
        let state = this.location.getState();
        if(state.hasOwnProperty("template")) {
          (state["template"] !== this.currentTemplate) ? this.currentTemplate = state["template"] : null;
          switch (this.currentTemplate) {
            case 1:
              this.constructDoubleDatas();
              break;
            
            case 2:
            
              break;
          
            default:
              break;
          }
        }
      },
      (err) => {
        console.error(err)
      },
      () => { });
  }

  ngOnInit(): void {
    this.checkStateRoute();
    this.checkTemplateChange();
    console.log("Hey");
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHanges bitch');
  }

  private getFluxRss(url: string) {
    this.rss2jsonService.getFeedContent(url).subscribe(
      res => {
        this.feed = res.feed;
        this.items = res.items;
      }
    )
  }
  
  private checkStateRoute() {
    let state = this.location.getState();
    if(state.hasOwnProperty("url")) {
      state["url"] !== "" ? this.url = state["url"] : null;
      this.getFluxRss(this.url);
      console.log(this.url);
    } else {
      this.router.navigate(['/home']);
    }
  }
  
  private checkTemplateChange() {
    let state = this.location.getState();
    if(state.hasOwnProperty("template")) {
      typeof state["template"] === "number" ? this.currentTemplate = state["template"] : null;
      console.log(this.currentTemplate);
    }
    if(this.url === ""){
      this.router.navigate(['/home']);
    }
  }

  private constructDoubleDatas() {
    let countIteration: number;
    this.items.map((item,index) => {
      countIteration = index;
      if((countIteration++) % 2)
        this.datasDoubleOld = [...this.datasDoubleOld,item];
      else
        this.datasDoubleEven = [...this.datasDoubleEven,item];
      
      console.log(this.datasDoubleOld, this.datasDoubleEven);
      
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
