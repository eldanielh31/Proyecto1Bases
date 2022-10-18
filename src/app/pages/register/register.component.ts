import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  first: String = null;
  last: String = null;
  phone: String = null;
  identification: String = null;
  address: String = null;
  email: String = null;
  password: String = null;
  entered: String = null;
  birth: String = null;
  role: String = null;

  isError: Boolean;
  textError: String;
  isSuccess: Boolean = false;

  constructor(private backend: BackendService) {
    this.isError = false
  }

  ngOnInit() {
  }

  // handleRegister(){
  //   let nameDataAdmin = ['name', 'lastName', 'cellphoneNumber', 'identification', 'address',
  //     'email', 'password', 'joiningDate', 'birthDate', 'role']
  //   let dataAdmin = [this.first, this.last, this.phone, this.identification,
  //     this.address, this.email, this.password, this.entered, this.birth, this.role]
  //   let nameData = ['name', 'lastName', 'cellphoneNumber', 'identification', 'address',
  //     'email']
  //   let data = [this.first, this.last, this.phone, this.identification,
  //   this.address, this.email]
    
  //   let user = {}
  //   if(this.checkWorker){
  //     console.log('worker')
  //     let con = 0
  //     dataAdmin.forEach(element => {
  //       if (element === null || element === '') {
  //         this.isError = true
  //         this.textError = 'All data is required!'
  //         return
  //       }
  //       user[nameDataAdmin[con]] = element
  //       con++;
  //     });

  //     console.log(user)
  //     this.backend.getEmploye(user['email']).subscribe(data => {
  //       this.isError = true
  //       this.textError = 'Email already register!'
  //     }, error => {
  //       if (error.status === 404) {
  //         this.backend.postEmploye(user).subscribe(
  //           data => {
  //             console.log(data)
  //             this.isSuccess = true
  //           }
  //         )
  //       }
  //     })

  //   }else{
  //     console.log('usuario')
  //     let con = 0
  //     data.forEach(element => {
  //       if (element === null || element === '') {
  //         this.isError = true
  //         this.textError = 'All data is required!'
  //         return
  //       }
  //       user[nameData[con]] = element
  //       con++;
  //     });

  //     console.log(user)
  //     this.backend.getClient(user['email']).subscribe(data => {
  //       this.isError = true
  //       this.textError = 'Email already register!'
  //     }, error => {
  //       if (error.status === 404) {
  //         this.backend.postClient(user).subscribe(
  //           data => {
  //             console.log(data)
  //             this.isSuccess = true
  //           }
  //         )
  //       }
  //     })

  //   }

  // }

  handleRegister() {
    
    console.log(this.first, this.last, this.phone, this.identification, this.address, this.email, this.password, this.entered, this.birth, this.role)

  }
  
}
