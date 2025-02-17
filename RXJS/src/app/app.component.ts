import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RXJS';

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
}
