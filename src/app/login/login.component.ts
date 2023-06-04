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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  input$ = new Subject();
  inputSub: Subscription | null = null;

  indexInSeq = 0;
  classes = ['1_Dot', '2_Dot', '3_Dot', '4_Dot'];
  PASSCODE = [1, 1, 1, 1];

  @Output() loggedIn = new EventEmitter<boolean>();

  ngOnInit() {
    this.inputSub = this.input$
      .pipe(
        // tap(() => {
        //   const dot = document.getElementById(classes[indexInSeq++]) as HTMLElement;
        //   dot.classList.add('bg-blue-400');
        // }),
        // this.fillDots(),
        map((data: any) => {
          return parseInt(data, 10);
        }),
        this.verifyPasscode(),
        tap((login) => this.loggedIn.emit(login))
        // todo: use verifyPasscode operator
      )
      .subscribe({
        error: console.error,
        next: console.log,
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
        const dot = document.getElementById(
          this.classes[this.indexInSeq++]
        ) as HTMLElement;
        dot.classList.add('bg-blue-400');
      })
    );

  clearDots = () =>
    pipe(
      tap(() => {
        this.classes.forEach((spanID) => {
          let refillDot = document.getElementById(spanID) as HTMLElement;
          setTimeout(() => refillDot.classList.remove('bg-blue-400'), 1000);
        });
      })
    );

  verifyPasscode = () => {
    return pipe(
      bufferCount<number>(4),
      // this.clearDots(),
      mergeMap((inputPWD) =>
        from(inputPWD as ObservableInput<any>).pipe(
          sequenceEqual(from(this.PASSCODE))
        )
      )
    );
  };

  ngOnDestroy() {
    this.inputSub!.unsubscribe();
  }
}
