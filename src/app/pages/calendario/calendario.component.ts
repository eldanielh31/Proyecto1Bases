import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { StorageService } from 'src/app/storage.service';
import { BackendService } from 'src/app/backend.service';
import { InvoiceService } from 'src/app/invoice.service';


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

  services_lavacar: []
  sucursales: []
  quotes: []
  snacks = ''

  identificationClient = ''

  selectedStore: String;
  selectedService: String;

  Events = [];

  tempEvent: any;

  calendarOptions!: CalendarOptions;

  user: any;

  constructor(private invoice: InvoiceService, private localSotage: StorageService, private backend: BackendService) {

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
      this.tempEvent['id'] = this.identificationClient,
        this.tempEvent['title'] = this.identificationClient,
        this.tempEvent['trabajador_id'] = this.user.trabajador_id,
        this.tempEvent['suc_id'] = this.selectedStore,
        this.tempEvent['cedula'] = this.identificationClient,
        this.tempEvent['lavado_id'] = this.selectedService
      this.Events.push(this.tempEvent);
      $("#myModal").modal("hide");
      console.log(this.tempEvent)
    } else {
      alert('Debe seleccionar un servicio')
    }
  }

  handleFacturation() {
    this.invoice.invoice.products = [{ name: 'Faja', price: 123, qty: 3 }, { name: 'Free Snacks', price: 0, qty: 5 }]
    this.invoice.invoice.customerName = 'Daniel'
    this.invoice.invoice.contactNo = 123
    this.invoice.invoice.email = 'danbg31@gmail.com'
    this.invoice.invoice.address = 'cartago'
    console.log(this.snacks)
    this.invoice.generatePDF()
  }

  eventClick(res: any) {
    $("#myModal2").modal("show");
    $(".modal-title").text("Facturation");
  }

  onDateClick(res: any) {
    if (!res.allDay) {

      let date = formatDate(res.date)

      $("#myModal").modal("show");
      $(".modal-title").text("Choose Service");
      $(".modal-title").text("Add Event at : " + date);

      this.tempEvent = {
        start: date,
      }

    }

  }

  ngOnInit() {

    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        selectable: true,
        eventClick: this.eventClick.bind(this),
        dateClick: this.onDateClick.bind(this),
        eventChange: () => { console.log(this.Events) },
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