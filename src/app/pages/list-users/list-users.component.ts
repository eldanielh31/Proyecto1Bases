import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

interface User {
  idNumber: number,
  identification: number,
  name: string,
  lastName: string
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];
  clients: User[] = [];
  userType: string;

  constructor(private backend: BackendService, private router: Router, private localStorage: StorageService) {



  }

  ngOnInit(): void {

    this.backend.getEmployes().subscribe(
      response => {
        this.localStorage.saveData('users', JSON.stringify(response))
      }
    )

    this.backend.getClients().subscribe(
      response => {
        this.localStorage.saveData('clients', JSON.stringify(response))
      }
    )

    this.clients = JSON.parse(this.localStorage.getData('clients'))

    this.users = JSON.parse(this.localStorage.getData('users'))

  }

  handleEdit(id: number) {
    this.router.navigate([`/user/${id}/employee`])
  }
  handleEditClient(id: number) {
    this.router.navigate([`/user/${id}/client`])
  }

  handleDeleteEmploye(id: number){
    this.backend.deleteEmploye(id).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }
  
  handleDeleteClient(cedula: number){
    this.backend.deleteClient(cedula).subscribe(data => {
      console.log('Eliminado correctamente')
    })
  }

}
