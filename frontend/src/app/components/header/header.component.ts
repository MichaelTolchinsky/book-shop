import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  userIsAuthenticated = computed(() => this.authService.getIsAuth());
  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
