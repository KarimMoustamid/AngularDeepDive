import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  Observable,
  share,
  of,
  from,
  fromEvent,
  timer,
  interval,
  forkJoin,
  map,
  filter,
  tap,
  debounceTime,
  catchError
} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {combineLatest} from "rxjs/internal/operators/combineLatest";

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
    this.CatchErrorOperatorExample()
  }

  // - RXJS Basics
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
      // subscriber.error("ops I caught an error here :/")
      subscriber.complete()
      subscriber.next("Trump should not run")

      return () => {
        console.info("Teardown");
      }
    })

    const subscription = observable$.subscribe(observer)
    // Unsubscribe after 3 seconds
    setTimeout(() => {
      console.log('Unsubscribing...');
      subscription.unsubscribe();
    }, 3000);
  }

  TypesOfObservables() {

    // - Example of a cold observable
    const coldObservable$ = new Observable<number>(subscriber => {
      console.log("Cold Observable is producing values...");
      subscriber.next(1);
      setTimeout(() => subscriber.next(2), 1000);
      setTimeout(() => subscriber.next(3), 2000);
      setTimeout(() => subscriber.complete(), 3000);
    });

    console.log("Subscribing to Cold Observable...");

    // - Subscriber 1
    const subscription1 = coldObservable$.subscribe({
      next: value => console.log(`Subscriber 1: ${value}`),
      complete: () => console.log("Subscriber 1: Completed")
    });

    setTimeout(() => {
      console.log("Subscribing to Cold Observable with Subscriber 2...");
      // Subscriber 2
      const subscription2 = coldObservable$.subscribe({
        next: value => console.log(`Subscriber 2: ${value}`),
        complete: () => console.log("Subscriber 2: Completed")
      });
    }, 1500);


    // - Example of a hot observable
    const hotObservable$ = new Observable<number>(subscriber => {
      console.log("Hot Observable is producing values...");
      let counter = 1;
      const intervalId = setInterval(() => {
        subscriber.next(counter++);
        if (counter > 5) {
          clearInterval(intervalId);
          subscriber.complete();
        }
      }, 1000);

      return () => {
        console.log("Hot Observable: Teardown logic executed");
        clearInterval(intervalId);
      };
    }).pipe(share()); // Using the share operator to make it hot

    console.log("Subscribing to Hot Observable...");

    // - Subscriber 1
    // const hotSubscription1 = hotObservable$.subscribe({
    //   next: value => console.log(`Hot Subscriber 1: ${value}`),
    //   complete: () => console.log("Hot Subscriber 1: Completed")
    // });

    setTimeout(() => {
      console.log("Subscribing to Hot Observable with Subscriber 2...");
      // Subscriber 2
      const hotSubscription2 = hotObservable$.subscribe({
        next: value => console.log(`Hot Subscriber 2: ${value}`),
        complete: () => console.log("Hot Subscriber 2: Completed")
      });
    }, 2500);
  }

  // - Creation Functions :

  OfCreationFunction() {
    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };

    // const observable$ = new Observable<number>(subscriber => {
    //   subscriber.next(1)
    //   subscriber.next(2)
    //   subscriber.next(3)
    //   subscriber.next(4)
    //   subscriber.next(5)
    //   subscriber.complete()
    // })
    //
    // observable$.subscribe(observer)

    of(1, 2, 3, 4, 5).subscribe(observer)

    function ourOwnOf(...args: number[]) {
      return new Observable<any>(subscriber => {
        for (const arg of args) {
          subscriber.next(arg);
        }
        subscriber.complete();
      });

    }

    ourOwnOf(1, 2, 3, 4, 5).subscribe(observer)

  }

  FromCreationFunction() {
    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };

    console.log("From Creation Function")
    from([1, 2, 3, 4, 5]).subscribe(observer)

    console.log("From Creation Function from Promise")
    const somePromise = new Promise<string>((resolve, reject) => {
      // resolve('Resolved !!!');
      reject('Rejected !!!');
    });

    const fromPromise$ = from(somePromise);
    fromPromise$.subscribe({
      next: value => console.log(value),
      error: err => console.error(err),
      complete: () => console.log("Completed")
    })
  }

  FromEventCreationFunction() {
    const observer = {
      next: (value: Event) => console.log("Button Clicked : ", value),
    }

    const triggerButton = document.querySelector('#trigger-button');

    // if (triggerButton !== null) {
    //   const fromEventObservable = fromEvent(triggerButton, 'click').subscribe(observer);
    //   setTimeout(() => {
    //     fromEventObservable.unsubscribe();
    //   }, 1000)
    // }


    const triggerClick$ = new Observable<Event>(subscriber => {
      const clickHandler = (event: Event) => {
        console.log("Event callback executed ")
        subscriber.next(event);
      }

      if (triggerButton !== null)
        triggerButton.addEventListener('click', clickHandler);

      return () => {
        if (triggerButton !== null)
          triggerButton.removeEventListener('click', clickHandler)
      }
    })

    const triggerClickSub = triggerClick$.subscribe(observer)
    setTimeout(() => {
      triggerClickSub.unsubscribe();
    }, 3000)
  }

  TimerCreationFunction() {
    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };

    // timer(2000).subscribe(observer)

    const timer$ = new Observable<number>(subscriber => {
      const timeoutId$ = setTimeout(() => {
        subscriber.next(0);
        subscriber.complete();
      }, 2000)

      return () => {
        clearTimeout(timeoutId$)
      }
    })
    const sub = timer$.subscribe(observer)
    setTimeout(() => {
      sub.unsubscribe();
    }, 1000)
  }

  IntervalCreationFunction() {
    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };


    // const sub = interval(1000).subscribe(observer)
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 5000)

    let count = 0;
    const intervalObservable$ = new Observable<number>(subscriber => {
      const intervalId = setInterval(() => {
        subscriber.next(count++);
      }, 1000)

      // return () => {
      //   clearTimeout(timeoutId$)
      // }
    })

    const sub = intervalObservable$.subscribe(observer)
    setTimeout(() => {
      sub.unsubscribe();
    }, 5000)
  }

  ForkJoinCreationFunction() {

    const randomName$ = ajax<any>('https://random-data-api.com/api/name/random_name');
    const randomNation$ = ajax<any>('https://random-data-api.com/api/nation/random_nation');
    const randomFood$ = ajax<any>('https://random-data-api.com/api/food/random_food');

    // randomName$.subscribe((ajaxResponse : any) => console.log("Name :",ajaxResponse.response.first_name));
    // randomNation$.subscribe(ajaxResponse => console.log("Capital : " ,ajaxResponse.response.capital));
    // randomFood$.subscribe(ajaxResponse => console.log("Dish :",ajaxResponse.response.dish));

    forkJoin([randomName$, randomNation$, randomFood$]).subscribe(([nameAjax, nationAjax, foodAjax]) => {
      console.log("Name:", nameAjax.response.first_name);
      console.log("Capital:", nationAjax.response.capital);
      console.log("Dish:", foodAjax.response.dish);
    });
  }

  CombineLatestCreationFunction() {

    const observable1$ = new Observable<number>(subscriber => {
      let count1 = 0;
      const intervalId1 = setInterval(() => {
        subscriber.next(count1++);
      }, 1000);

      return () => clearInterval(intervalId1);
    });

    const observable2$ = new Observable<string>(subscriber => {
      const names = ['Alice', 'Bob', 'Charlie'];
      let index = 0;
      const intervalId2 = setInterval(() => {
        subscriber.next(names[index++ % names.length]);
      }, 1500);

      return () => clearInterval(intervalId2);
    });

    //   combineLatest([observable1$, observable2$])
    //     .pipe(map(([value1, value2]) => `Number: ${value1}, Name: ${value2}`))
    //     .subscribe({
    //       next: value => console.log(value),
    //       complete: () => console.log('Completed')
    //     });
  }

  // - Pipe Operators


  FilterOperatorExample() {
    const observable$ = of(1, 2, 3, 4, 5);

    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };

    observable$
      .pipe(
        filter(value => value % 2 === 0) // Applying filter operator to allow only even numbers
      )
      .subscribe(observer);
  }

  MapOperatorExample() {
    const observable$ = of(1, 2, 3, 4, 5);

    const observer = {
      next: (value: number) => console.log(value),
      complete: () => console.log("Completed")
    };

    observable$
      .pipe(
        map(value => value * 2) // Applying map operator to multiply each value by 2
      )
      .subscribe(observer);
  }

  DebounceTimeOperatorExample() {
    const sliderInput = document.querySelector('#slider');

    if (sliderInput != null)
      fromEvent(sliderInput, 'input').pipe(
        debounceTime(2000),
        tap((event: Event) => {
          const target = event.target as HTMLInputElement;
          console.log(target.value);
        })
      ).subscribe();
  }


  CatchErrorOperatorExample() {

    const observable$ = of(1, 2, 'error', 4, 5);

    const observer = {
      next: (value: number | string) => console.log(value),
      error: (err: any) => console.error("Error caught: ", err),
      complete: () => console.log("Completed")
    };

    observable$
      .pipe(
        map(value => {
          if (value === 'error') {
            throw new Error('An error occurred!');
          }
          return value;
        }),
        catchError(err => {
          console.error("Handling error within catchError: ", err.message);
          return of('Default Value'); // Fallback value
        })
      )
      .subscribe(observer);
  }

}
