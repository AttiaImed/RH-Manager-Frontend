import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChangeDetectionStrategy,  ViewEncapsulation} from '@angular/core';
import { CalendarUtils } from 'angular-calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [  FullCalendarModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendrierComponent {



  calendarPlugins = [dayGridPlugin]; // important!
  calendarWeekends = true;
  calendarEvents = [
    { title: 'event 1', date: '2020-06-01' },
    { title: 'event 2', date: '2020-06-02' }
  ];

  constructor() { }

}
