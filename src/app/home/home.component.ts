import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listRss: Observable<any>;

  constructor(
    firebase: AngularFirestore,
    private router: Router
    ) { 
    this.listRss = firebase.collection('Flux_Rss').valueChanges();  
  }

  ngOnInit() {
  }

  public apiRssJson(url: string,currentTemplate: number) {
    console.log(url);
    this.router.navigateByUrl('/home/flux-rss', { state: { url } });
  }

}
