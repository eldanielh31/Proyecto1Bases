import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  isSuccess: Boolean = false

  currentUser: Object = {};
  isWorker: Boolean;
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

  users: []
  clients: []

  constructor(private localStorage: StorageService, private backend: BackendService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.users = JSON.parse(this.localStorage.getData('users'));
    this.clients = JSON.parse(this.localStorage.getData('clients'));

    let routeParams = this.route.snapshot.paramMap;
    let userId = Number(routeParams.get('userId'));
    let userType = String(routeParams.get('userType'));

    if(userType === 'employee'){
      this.currentUser = this.users.find(user=> user['cedula'] == userId)
    }else{
      this.currentUser = this.clients.find(user => user['cedula'] == userId)
    }

    console.log(this.currentUser)

  }

  handleUpdate() {
    console.log('hola')

  //   let listData = ['identification', 'password', 'name', 'lastName',
  //     'birthDate', 'dateEntered', 'role', 'address', 'cellphoneNumber', 'email']
  //   let dataToUpdate = [this.identification, this.password, this.firstName, this.lastName,
  //   this.dateBirth, this.dateEntered, this.role, this.address, this.phone, this.email]

  //   let con = 0;
  //   dataToUpdate.forEach(element => {
  //     if (element !== null) {
  //       this.currentUser[listData[con]] = element
  //     }
  //     else if (element !== null && element !== '') {
  //       this.currentUser[listData[con]] = element
  //     }
  //     con++;
  //   });

  //   this.localStorage.saveData('user', JSON.stringify(this.currentUser))


  //   delete this.currentUser['admin']
  //   console.log(this.currentUser)
  //   this.backend.deleteEmploye(this.currentUser['idNumber']).subscribe(data => {
  //     console.log('eliminado correctamente')
  //   })
  //   this.backend.postEmploye(this.currentUser).subscribe(data => {
  //     console.log('Posteado correctamente')
  //   })

  //   this.isSuccess = true

  }

}
