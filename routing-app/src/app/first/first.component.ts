import {Component, Input, OnInit, signal} from '@angular/core';
import {withComponentInputBinding} from "@angular/router";

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent implements OnInit {
  value = signal('0');

  @Input() id: string | null = null;

  constructor() {
  }

  ngOnInit() {
    console.log('Hero ID:', this.id);
    if (this.id!=null)
    this.value.set(this.id)
  }
}
