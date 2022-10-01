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

  users:User[] = [];
  userType: string;

  constructor(private backend: BackendService, private route: ActivatedRoute, private router: Router, private localStorage: StorageService) {

   }

  ngOnInit(): void {

    let routeParams = this.route.snapshot.paramMap;
    this.userType = String(routeParams.get('userType'));

    if (this.userType === 'clients') {
      this.backend.getClients().subscribe(
        response => {
          this.localStorage.saveData('users', JSON.stringify(response))
        }
      )
    }
    else if (this.userType === 'workers') {
      this.backend.getEmployes().subscribe(
        response => {
          this.localStorage.saveData('users', JSON.stringify(response))
        }
      )
    }

    this.users = JSON.parse(this.localStorage.getData('users'))

  }

  handleEdit( id : number){
    if(this.userType === 'clients'){
      this.router.navigate([`/user/client/${id}`])
    }
    else if (this.userType === 'workers') {
      this.router.navigate([`/user/worker/${id}`])
    }
  }

}
