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
  name: String = '';
  password: String = '';
  firstName: String = '';
  lastName: String = '';
  email: String = '';

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

    if (userType === 'employee') {
      this.currentUser = this.users.find(user => user['cedula'] == userId)
      this.isWorker = true
    } else {
      this.currentUser = this.clients.find(user => user['cedula'] == userId)
      this.isWorker = false
    }

  }

  handleUpdate() {

    let listDataClient = ['cliente_nombre', 'email', 'psw_cliente']
    let listData = ['nombre', 'apellido1', 'apellido2', 'email', 'password_trab']
    let dataToUpdate = [this.name, this.firstName, this.lastName, this.email, this.password]
    let dataToUpdateClient = [`${this.name} ${this.firstName} ${this.lastName}`, this.email, this.password]

    let con = 0;
    if (this.isWorker) {
      dataToUpdate.forEach(element => {
        if (!(element === null || element === '')) {
          this.currentUser[listData[con]] = element
        }
        con++;
      });

      this.backend.putEmploye(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })

    } else {
      dataToUpdateClient.forEach(element => {
        if (!(element === null || element.trim() === '')) {
          this.currentUser[listDataClient[con]] = element
        }
        con++;
      });

      this.backend.putClient(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })

    }

    this.isSuccess = true

  }

}
