import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.signupForm.get('password')?.value === this.signupForm.get('rePassword')?.value){
      this.authService.signup(this.signupForm.get('email')?.value,this.signupForm.get('password')?.value)
      .then(success => {
        this.router.navigateByUrl('/events');
      }).catch(error => {
        window.alert(error);
      });
    }
    else{
      window.alert("A két jelszó nem egyezik!");
    }

  }

}
