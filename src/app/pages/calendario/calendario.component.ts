import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { StorageService } from 'src/app/storage.service';
import { BackendService } from 'src/app/backend.service';


declare let $: any;

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    'T' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  services_lavacar : []
  sucursales : []
  quotes : []

  selectedStore: String;
  selectedService: String;

  Events = [

    {
      id: 'a',
      title: 'DaniGames',
      start: '2022-10-04'
    }

  ];

  tempEvent: any;

  calendarOptions!: CalendarOptions;

  user: any;

  constructor(private localSotage: StorageService, private backend: BackendService) {

    this.user = JSON.parse(this.localSotage.getData('user'));

    //Asignar variable local Servicios lavado
    this.backend.getServices().subscribe(
      response => {
        this.localSotage.saveData('lavados', JSON.stringify(response))
      }
    )
    this.services_lavacar = JSON.parse(this.localSotage.getData('lavados'))

    //Asignar variable local Sucursales
    this.backend.getStores().subscribe(
      response => {
        this.localSotage.saveData('stores', JSON.stringify(response))
      }
    )
    this.sucursales = JSON.parse(this.localSotage.getData('stores'))

    //Asignar variable local citas
    this.backend.getQuotes().subscribe(
      response => {
        this.localSotage.saveData('quotes', JSON.stringify(response))
      }
    )
    this.quotes = JSON.parse(this.localSotage.getData('quotes'))


  }


  handleSave() {
    if (this.selectedService) {
      console.log(this.tempEvent)
      console.log(this.selectedService)
      this.tempEvent['idService'] = this.selectedService
      this.Events.push(this.tempEvent);
      $("#myModal").modal("hide");
    }else{
      alert('Debe seleccionar un servicio')
    }
  }


  onDateClick(res: any) {
    if (!res.allDay) {

      let date = formatDate(res.date)

      $("#myModal").modal("show");
      $(".modal-title").text("Choose Service");
      $(".modal-title").text("Add Event at : " + date);

      this.tempEvent = {
        id: String(this.user.email),
        title: this.user.firstName,
        start: date
      }

    }




  }

  ngOnInit() {

    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        selectable: true,
        dateClick: this.onDateClick.bind(this),
        eventChange: ()=>{console.log(this.Events)},
        events: this.Events,
        editable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
      };
    }, 3500);

  }

}