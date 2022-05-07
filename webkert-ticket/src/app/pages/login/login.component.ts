import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  constructor(private router: Router, private authService: AuthenticationService) {   
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  async login(){
    this.authService.login(this.email.value,this.password.value)
    .then(cred => {
        this.router.navigateByUrl('/events');
    }).catch(error => {
      window.alert(error);
    });
  }
}

