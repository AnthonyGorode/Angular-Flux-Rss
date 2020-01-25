import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RssFirebase } from 'src/app/models/rss-firebase-model/rss-firebase.interface';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  getRss(): Observable<any> {
    return this.angularFirestore.collection('Flux_Rss').valueChanges(); 
  }

  getRssSnapchot(): Observable<any> {
    return this.angularFirestore.collection('Flux_Rss').snapshotChanges(); 
  }

  addRss(rss: any) {
      const id =  this.angularFirestore.createId();
      const name = (rss.name).split(/\W/g).join("_");
      const idCustom = id+name;
      const obj = {
        key: idCustom,
        name: rss.name,
        url: rss.url,
        createdAt: Date().toString()
      }
      this.angularFirestore.collection(`Flux_Rss`).add(obj);
  }

  removeRss(documentId: string) {
    this.angularFirestore.collection(`Flux_Rss`).doc(documentId).delete();
  }

}
