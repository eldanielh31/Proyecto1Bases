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

  // handleLogin() {
  //   this.backend.getEmploye(this.email).subscribe(
  //     (data : Object) => {
  //       data['admin'] = true;
        
  //       if(this.password !== data['password']){
  //         this.isError = true
  //         this.textError = 'Email or password incorrect!'
  //         return
  //       }
        
  //       this.localStorage.saveData('user', JSON.stringify(data))
  //       this.router.navigate(['/dashboard'])
  //       return
  //     }, (error => {
  //       if (error.status === 404) {
  //         this.isError = true
  //         this.textError = 'Email or password incorrect!'
  //       }
  //     })
  //   )
  //   this.backend.getClient(this.email).subscribe(
  //     (data: Object) => {
  //       data['admin'] = false;

  //       if (this.password !== data['password']) {
  //         this.isError = true
  //         this.textError = 'Email or password incorrect!'
  //         return
  //       }
        
  //       this.localStorage.saveData('user', JSON.stringify(data))
  //       this.router.navigate(['/dashboard'])
  //       return
  //     }, (error => {
  //       if(error.status === 404){
  //         this.isError = true
  //         this.textError = 'Email or password incorrect!'
  //       }
        
  //     })

  //   )

    
    
  //   return
  // }

  handleLogin(){
    let data = {'email' : this.email, 'isAdmin' : true}
    data['firstName'] = 'Daniel'
    this.localStorage.saveData('user', JSON.stringify(data))
    this.router.navigate(['/dashboard'])
    return
  }


}
