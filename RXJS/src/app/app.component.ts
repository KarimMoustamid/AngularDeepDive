import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RXJS';


  ngOnInit(): void {
    this.SubscriptionLifeCycle()
  }

  IntroToRXJS() {
    // - Example 1: Emit simple values over time
    const observable1$ = new Observable<string>(subscriber => {
      subscriber.next('First value');
      setTimeout(() => subscriber.next('Second value (after 1 second)'), 1000);
      setTimeout(() => subscriber.complete(), 2000); // Mark the observable as complete
    });

    const observer1 = {
      next: (value: string) => console.log(`Observable1: ${value}`),
      complete: () => console.log('Observable1: Completed'),
    };

    // observable1$.subscribe(observer1);

    // - Example 2: Observable that includes an error
    const observable2$ = new Observable<string>(subscriber => {
      subscriber.next('Hello from Observable2');
      subscriber.error('An error occurred!');
    });

    const observer2 = {
      next: (value: string) => console.log(`Observable2: ${value}`),
      error: (err: any) => console.warn(`Observable2 Error: ${err}`),
      complete: () => console.log('Observable2: Completed'),
    };

    // observable2$.subscribe(observer2);

    // - Example 3: Emitting multiple types of values
    const observable3$ = new Observable<any>(subscriber => {
      subscriber.next('String value');
      subscriber.next(42);
      subscriber.next({message: 'Hello Object'});
      subscriber.complete();
    });

    const observer3 = {
      next: (value: any) => console.log(`Observable3: ${JSON.stringify(value)}`),
      complete: () => console.log('Observable3: Completed'),
    };


    const observer4 = {
      next: (value: any) => console.log(`Observable4: ${value}`),
      error: (err: any) => console.error(`Observable4 Error: ${err}`),
      complete: () => console.log('Observable4: Completed'),
    };

    // observable3$.subscribe(observer3);
    // setTimeout(() => observable3$.subscribe(observer4), 1000);
  }

  WhatIsSteam() {

    // - Example 1: A stream of numbers
    const numberStream$ = new Observable<number>(subscriber => {
      let count = 1;
      const interval = setInterval(() => {
        subscriber.next(count++);
        if (count > 10) {
          clearInterval(interval);
          subscriber.complete();
        }
      }, 1000); // Emit every second
    });

    const numberObserver = {
      next: (value: number) => console.log(`Number Stream: ${value}`),
      complete: () => console.log('Number Stream: Completed')
    };

    // numberStream$.subscribe(numberObserver);

    // - Example 2: A stream of button click events
    const button = document.createElement('button');
    button.textContent = 'Click me';
    document.body.appendChild(button);

    const clickStream$ = new Observable<Event>(subscriber => {
      const clickHandler = (event: Event) => subscriber.next(event);
      button.addEventListener('click', clickHandler);

      // Cleanup when subscription ends
      return () => {
        button.removeEventListener('click', clickHandler);
      };
    });

    const clickObserver = {
      next: (event: Event) => console.log('Button clicked!', event),
      complete: () => console.log('Click Stream: Completed')
    };

    clickStream$.subscribe(clickObserver);

    // - Example 3: Combining two streams
    const stream1$ = new Observable<string>(subscriber => {
      setTimeout(() => subscriber.next("A"), 1000);
      setTimeout(() => subscriber.next("B"), 2000);
      setTimeout(() => subscriber.complete(), 3000);
    });

    const stream2$ = new Observable<number>(subscriber => {
      setTimeout(() => subscriber.next(1), 500);
      setTimeout(() => subscriber.next(2), 1500);
      setTimeout(() => subscriber.complete(), 2500);
    });

    stream1$.subscribe({
      next: value => console.log(`Stream1 emitted: ${value}`),
      complete: () => console.log(`Stream1 completed`)
    });

    stream2$.subscribe({
      next: value => console.log(`Stream2 emitted: ${value}`),
      complete: () => console.log(`Stream2 completed`)
    });
  }

  SubscriptionLifeCycle() {

    const observer = {
      next: (value: string) => console.log(`Observer: ${value}`),
      error: (err: any) => console.error(`Observer Error: ${err}`),
      complete: () => console.log('Observer: Completed')
    }

    const observable$ = new Observable<string>(subscriber => {
      subscriber.next("Alis")
      subscriber.next("Karim")
      setTimeout(() => subscriber.next("Ali"), 2000)
      // subscriber.complete()

      return () => {
        console.log("Teardown");
      }
    })

    const subscription = observable$.subscribe(observer)
    // Unsubscribe after 3 seconds
    setTimeout(() => {
      console.log('Unsubscribing...');
      subscription.unsubscribe();
    }, 3000);
  }
}
