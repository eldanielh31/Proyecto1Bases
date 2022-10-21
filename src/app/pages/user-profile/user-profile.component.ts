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
  name: String = null;
  password: String = null;
  firstName: String = null;
  lastName: String = null;
  role: String = null;
  email: String = null;
  payment: String = null;

  constructor(private localStorage: StorageService, private backend: BackendService) { 

    this.currentUser = JSON.parse(this.localStorage.getData('user'));
    console.log(this.currentUser)

  }

  ngOnInit() {

  }

  handleUpdate(){

    let listData = ['nombre', 'password_trab', 'apellido1', 'apellido2','role', 'rol', 'email', 'email', 'pago']
      let dataToUpdate = [this.name,this.password, this.firstName, this.lastName, this.role, this.email, this.payment]

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

      console.log(this.currentUser)
      this.backend.putEmploye(this.currentUser).subscribe(data => {
        console.log('Posteado correctamente')
      })

    this.localStorage.saveData('user', JSON.stringify(this.currentUser))

      this.isSuccess = true

  }

}
