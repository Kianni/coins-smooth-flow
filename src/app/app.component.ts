import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

  constructor() {
    const aCollection = collection(this.firestore, 'spendings');
    this.spendings$ = collectionData(aCollection);
  }

  loggedIn = false;
  title = 'coins-smooth-flow';

  spendingsSub: Subscription = new Subscription();
  spendings: Spending[] = [];

  ngOnInit() {
    this.spendingsSub = this.spendings$.subscribe((spendings) => {
      this.spendings = spendings;
    });
  }

  onLoginCheck(data: boolean) {
    this.loggedIn = data;
  }

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
  }
}
