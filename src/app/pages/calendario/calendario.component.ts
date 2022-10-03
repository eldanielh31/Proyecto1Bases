import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  Events = [];
  calendarOptions!: CalendarOptions;

  constructor() { 
   }

  onDateClick(res: { dateStr: string; }) {
    alert('You clicked on : ' + res.dateStr)
  }

  ngOnInit() {

    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        selectable: true,
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
      }; 
    }, 3500);

  }

}