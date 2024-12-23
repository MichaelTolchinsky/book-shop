import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports:[
      CommonModule,
      FormsModule,
      MaterialModule,
    ]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  private authStatusSub:Subscription;
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus =>{
      this.isLoading = false;
    })
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
       return; 
    }
    this.isLoading = true;
    this.authService.login(form.value.email,form.value.password);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
