import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    imports:[CommonModule,FormsModule,MaterialModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading = false;
  private authStatusSub:Subscription;
  private authService = inject(AuthService);

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus =>{
      this.isLoading = false;
    })
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email,form.value.password);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
