import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public changeTemplate(template: number) {
    console.log("Lasso");
    this.router.navigateByUrl('/home/flux-rss', {state: { template }});
  }

}
