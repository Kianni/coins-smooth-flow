import { Component, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Spending } from './models/spending';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  spendings$: Observable<any[]>;
  aCollection: CollectionReference;
  _blackBackground = false;

  get bg() {
    return this._blackBackground;
  }
  set bg(value: boolean) {
    this._blackBackground = value;
  }

  constructor() {
    this.aCollection = collection(this.firestore, 'spendings');
    this.spendings$ = collectionData(this.aCollection);
  }

  loggedIn = false;
  title = 'coins-smooth-flow';

  spendingsSub: Subscription = new Subscription();
  spendingAddSub: Subscription = new Subscription();
  spendings: Spending[] = [];

  ngOnInit() {
    this.spendingsSub = this.spendings$.subscribe((spendings) => {
      this.spendings = spendings;
    });
  }

  saveSpendingToDB(data: Spending) {
    addDoc(this.aCollection, data).then(
      (documentReference: DocumentReference) => {
        this.spendings$ = collectionData(this.aCollection);
        this.spendingAddSub = this.spendings$.subscribe((spendings) => {
          this.spendings = spendings;
        });
        // the documentReference provides access to the newly created document
      }
    );
  }

  onLoginCheck(data: boolean) {
    this.loggedIn = data;
    data ? (this.bg = false) : null;
  }

  onHover() {
    this.bg = !this.bg;
  }

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
    this.spendingAddSub.unsubscribe();
  }
}
