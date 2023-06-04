import { Component, EventEmitter, Output } from '@angular/core';
import {
  ObservableInput,
  Subject,
  Subscription,
  bufferCount,
  from,
  map,
  mergeMap,
  pipe,
  sequenceEqual,
  tap,
} from 'rxjs';
import { PASSCODE } from '../../password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  input$ = new Subject();
  inputSub: Subscription | null = null;

  fillingDot_1 = false;
  fillingDot_2 = false;
  fillingDot_3 = false;
  fillingDot_4 = false;
  indexInSeq = 0;

  @Output() loggedIn = new EventEmitter<boolean>();

  ngOnInit() {
    this.inputSub = this.input$
      .pipe(
        this.fillDots(),
        map((data: any) => {
          return parseInt(data, 10);
        }),
        this.verifyPasscode(),
        tap((login) => this.loggedIn.emit(login))
      )
      .subscribe({
        error: console.error,
        // next: console.log,
        complete: () => console.log('complete'),
      });
  }

  btnClicked(event: any) {
    this.input$.next(event.srcElement.innerHTML);
  }

  fillDots = (): any =>
    pipe(
      tap(() => {
        if (this.indexInSeq > 3) {
          this.indexInSeq = 0;
        }

        switch (this.indexInSeq) {
          case 0: {
            this.fillingDot_1 = true;
            break;
          }
          case 1: {
            this.fillingDot_2 = true;
            break;
          }
          case 2: {
            this.fillingDot_3 = true;
            break;
          }
          case 3: {
            this.fillingDot_4 = true;
            break;
          }
        }
        this.indexInSeq++;
      })
    );

  clearDots = () =>
    pipe(
      tap(() => {
        this.fillingDot_1 = false;
        this.fillingDot_2 = false;
        this.fillingDot_3 = false;
        this.fillingDot_4 = false;
      })
    );

  verifyPasscode = () => {
    return pipe(
      bufferCount<number>(4),
      this.clearDots(),
      mergeMap((inputPWD) =>
        from(inputPWD as ObservableInput<any>).pipe(
          sequenceEqual(from(PASSCODE))
        )
      )
    );
  };

  ngOnDestroy() {
    this.inputSub!.unsubscribe();
  }
}
