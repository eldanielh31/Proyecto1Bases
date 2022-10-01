import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  Events = [];
  calendarOptions!: CalendarOptions;

  constructor() { }

  onDateClick(res: { dateStr: string; }) {
    alert('You clicked on : ' + res.dateStr)
  }

  ngOnInit() {

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      };
    }, 3500);

  }

}
