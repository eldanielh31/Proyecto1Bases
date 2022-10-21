import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private localStorage: StorageService, private router: Router, private backend: BackendService) { }

  email: string = ''
  password: string = ''
  isError: boolean = false
  textError: String;

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  handleLogin() {
    this.backend.getEmployebyEmail(this.email).subscribe(
      (data : Object) => {
        if (this.password !== data[0]['password_trab']){
          this.isError = true
          this.textError = 'Email or password incorrect!'
          return
        }
        
        this.localStorage.saveData('user', JSON.stringify(data[0]))
        this.router.navigate(['/calendar'])
        return
      }, (error => {
        if (error.status === 404) {
          this.isError = true
          this.textError = 'Email or password incorrect!'
        }
      })
    )  
    return
  }

  // handleLogin() {
  //   let data = { 'email': this.email, 'isAdmin': true }
  //   data['firstName'] = 'Daniel'
  //   this.localStorage.saveData('user', JSON.stringify(data))
  //   this.router.navigate(['/calendar'])
  // }


}
