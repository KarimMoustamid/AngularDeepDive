import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing-app';
}
