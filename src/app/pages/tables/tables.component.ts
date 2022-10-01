import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { StorageService } from 'src/app/storage.service';

interface Appointment {
  idAppointment: number,
  idService: number,
  idClient: number,
  clientName: string,
  clientLastName: string,
  idEmployee: number,
  employeeName: string,
  employeeLastName: string
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  appointments: Appointment[];
  currentUser: Object = {};

  constructor(private router: Router, private localStorage: StorageService, private backend: BackendService) {
    this.currentUser = JSON.parse(this.localStorage.getData('user'));

    if (this.currentUser['admin']) {
      this.backend.getAppointmentsByIdWorker(this.currentUser['idNumber']).subscribe(
        response => {
          this.localStorage.saveData('appoiments', JSON.stringify(response))
        }
      )
    }
    else {
      this.backend.getAppointmentsByIdUser(this.currentUser['idNumber']).subscribe(
        response => {
          this.localStorage.saveData('appoiments', JSON.stringify(response))
        }
      )
    }

    this.appointments = (JSON.parse(this.localStorage.getData('appoiments')))

  }

  ngOnInit() {

  }

  handleclick() {
    this.router.navigate(['/appointments'])
  }
}
