import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [RouterModule, MaterialModule,NgIf],
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe();
  }

}
