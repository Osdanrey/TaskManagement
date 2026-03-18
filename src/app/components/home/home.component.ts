import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    imports: [RouterLink, TranslateModule],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  auth = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.redirectToTasks();
    }
  }
}
