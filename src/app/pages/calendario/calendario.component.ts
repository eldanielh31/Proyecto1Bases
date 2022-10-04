import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { StorageService } from 'src/app/storage.service';


declare let $: any;

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  Events = [

    {
      id: 'a',
      title: 'DaniGames',
      start: '2022-10-04'
    }

  ];
  calendarOptions!: CalendarOptions;

  user : any;

  constructor(private localSotage: StorageService) { 

    this.user = JSON.parse(localSotage.getData('user'));

   }

   

  onDateClick(res : any) {
    if(!res.allDay){
      let date = res.date.toJSON().split('.')[0]
      console.log(date)

      $("#myModal").modal("show");
      $(".modal-title").text("");
      $(".modal-title").text("Add Event at : " + date);

      // this.Events.push(
      //   {
      //     id : String(this.user.email) , 
      //     title: 'Dani', 
      //     start: date
      //   })

      this.Events.push(
        {
          id: 'a',
          title: 'DaniGames',
          start: '2022-10-05'
        }
      )

      console.log(this.Events)
    }

    

    
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