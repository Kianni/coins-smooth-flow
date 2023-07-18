import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SpendingListComponent } from './spending-list/spending-list.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerOverviewExample } from './add-spending/datepicker-overview-example';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpendingListComponent,
    AddSpendingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    DatepickerOverviewExample,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
