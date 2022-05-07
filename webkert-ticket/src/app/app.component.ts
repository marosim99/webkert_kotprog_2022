import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webkert-ticket';
  userActive?: firebase.default.User | null;


  constructor(private router: Router, private auth: AuthenticationService){
  }

  ngOnInit(){
    this.auth.isUserLoggedIn().subscribe(user => {
      this.userActive = user;
      localStorage.setItem('user',JSON.stringify(this.userActive));
    }, error => {
      console.error(error);
      localStorage.setItem('user',JSON.stringify('null'));
    });
  }

  logout(_?: boolean){
    this.auth.logout().then(() =>{
      this.router.navigateByUrl('/login');
    }).catch(error =>{
      console.log(error);
    });
  }

  close(sidenav: MatSidenav, logout?: boolean){
    sidenav.close();
    if(logout === true){
      this.logout()
    }
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
