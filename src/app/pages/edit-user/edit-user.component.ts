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

  constructor(private localStorage: StorageService, private backend: BackendService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    let routeParams = this.route.snapshot.paramMap;
    let userIdFromRoute = Number(routeParams.get('userId'));
    let userTypeFromRoute = String(routeParams.get('userType'));

    if (userTypeFromRoute === 'client') {
      this.backend.getClientById(userIdFromRoute).subscribe(
        response => {
          response['admin'] = false
          this.localStorage.saveData('userTemp', JSON.stringify(response))
        }
      )
    }
    else if (userTypeFromRoute === 'worker') {
      this.backend.getEmployeById(userIdFromRoute).subscribe(
        response => {
          response['admin'] = true
          this.localStorage.saveData('userTemp', JSON.stringify(response))
        }
      )
    }

    this.currentUser = JSON.parse(this.localStorage.getData('userTemp'));
    this.isWorker = this.currentUser['admin']

  }

  handleUpdate() {

    let listData = ['identification', 'password', 'name', 'lastName',
      'birthDate', 'dateEntered', 'role', 'address', 'cellphoneNumber', 'email']
    let dataToUpdate = [this.identification, this.password, this.firstName, this.lastName,
    this.dateBirth, this.dateEntered, this.role, this.address, this.phone, this.email]

    let con = 0;
    dataToUpdate.forEach(element => {
      if (element !== null) {
        this.currentUser[listData[con]] = element
      }
      else if (element !== null && element !== '') {
        this.currentUser[listData[con]] = element
      }
      con++;
    });

    this.localStorage.saveData('user', JSON.stringify(this.currentUser))

    let admin = this.currentUser['admin']

    if (this.currentUser['admin']) {
      delete this.currentUser['admin']
      console.log(this.currentUser)
      this.backend.deleteEmploye(this.currentUser['idNumber']).subscribe(data => {
        console.log('eliminado correctamente')
      })
      this.backend.postEmploye(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })
    } else {
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
