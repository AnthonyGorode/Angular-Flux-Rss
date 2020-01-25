import { map, catchError } from 'rxjs/operators';
import { Rss2jsonService } from './../services/rss2json-service/rss2json.service';
import { RssService } from './../services/rss-service/rss.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public listRss: Observable<any>;

  public listRss: Array<any>;

  public name: string;
  public url: string;

  public rssForm: FormGroup;

  constructor(
    private rssService: RssService,
    private router: Router,
    private formBuilder: FormBuilder,
    private rss2jsonService: Rss2jsonService
  ) { 
    
  }

  ngOnInit() {
    // this.listRss = this.rssService.getRss();
    this.rssService.getRssSnapchot().subscribe(
      res => {
        this.listRss = [];
        res.map(doc => {
          this.listRss.push({
              "id": doc.payload.doc.id,
              "feed": doc.payload.doc.data()
          });
        })
      }
    );
    console.log(this.listRss)
    this.initForm();
  }

  private initForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.rssForm = this.formBuilder.group({
      'name': ["",[Validators.required],[]],
      'url': ['',[Validators.required,Validators.pattern(reg)],[this.checkValidUrl]]
    })
  }
  
  /**
   * Check if url is a valid rss feed url
   * @param control a AbstactControl type containing the input url value 
   */
  checkValidUrl = (control: AbstractControl) => { // arrow function to bind this
    return this.rss2jsonService.testUrl(control.value).pipe(
      map(res => {
        return res ? null : { "urlIsInvalid": true };
      })
    );
  }

  public apiRssJson(url: string,currentTemplate: number) {
    console.log(url);
    this.router.navigateByUrl('/home/flux-rss', { state: { url } });
  }

  public addNewRss() {
    if(this.rssForm.invalid) return;

    this.rssService.addRss(this.rssForm.value);

    this.rssForm.reset();
  }

  public deleteRss(event,documentId) {
    event.stopPropagation();
    this.rssService.removeRss(documentId);
  }

}
