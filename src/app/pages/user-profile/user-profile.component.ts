import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isSuccess: Boolean = false

  currentUser : Object = {};
  isWorker : Boolean;
  identification: String = null;
  password: String = null;
  firstName: String = null;
  lastName: String = null;
  dateEntered: String = null;
  dateBirth: String = null;
  role: String = null;
  address: String = null;
  phone: String = null;
  email: String = null;

  constructor(private localStorage: StorageService, private backend: BackendService) { 

    this.currentUser = JSON.parse(this.localStorage.getData('user'));
    this.isWorker = this.currentUser['admin']

  }

  ngOnInit() {
  }

  handleUpdate(){

    let listData = ['identification', 'password', 'name', 'lastName',
      'birthDate', 'dateEntered', 'role', 'address', 'cellphoneNumber', 'email']
    let dataToUpdate = [this.identification ,this.password, this.firstName, this.lastName,
      this.dateBirth, this.dateEntered, this.role, this.address, this.phone, this.email]
    
    let con = 0;
    dataToUpdate.forEach(element => {
      if (element !== null){
        this.currentUser[listData[con]] = element
      }
      else if (element !== null && element !== ''){
        this.currentUser[listData[con]] = element
      }
      con++;
    });

    this.localStorage.saveData('user', JSON.stringify(this.currentUser))

    let admin = this.currentUser['admin']

    if(this.currentUser['admin']){
      delete this.currentUser['admin']
      console.log(this.currentUser)
      this.backend.deleteEmploye(this.currentUser['idNumber']).subscribe(data =>{
        console.log('eliminado correctamente')
      })
      this.backend.postEmploye(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })
    }else{
      delete this.currentUser['admin']
      this.backend.deleteClient(this.currentUser['idNumber']).subscribe(data => {
        console.log('Posteado correctamente')
      })
      this.backend.postClient(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })
    }

    this.currentUser['admin'] = admin
    this.isSuccess = true

  }

}
