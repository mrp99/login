import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
}
