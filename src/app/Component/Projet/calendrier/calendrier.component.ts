import { Component,  OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { ChangeDetectionStrategy,  ViewEncapsulation} from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Conge } from '../../../Models/conge';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import moment from 'moment';
@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [NgxEchartsDirective, FullCalendarModule],
  templateUrl: './calendrier.component.html',
  providers: [provideEcharts()],
  styleUrl: './calendrier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendrierComponent   implements OnInit  {

  @Input() conges: Conge[] = [];
  selectedEvent: Conge | null = null;
  optimalLeavePeriods: { start: string, end: string }[] = [];
  @Output() selectedEventChange: EventEmitter<Conge | null> = new EventEmitter<Conge | null>();


  handleEventClick(info: any) {
    const eventId = info.event.id;
    this.selectedEvent = this.conges.find(conge => conge.id === eventId) || null;
    this.selectedEventChange.emit(this.selectedEvent);
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [] ,
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit(): void {
   // this.fetchEventsFromServer();
    this.updateCalendarEvents();
    this.calculateBestLeavePeriods();
  }






  fetchEventsFromServer() {
      const eventsData: EventInput[] = [
      {
        title: 'Event 1',
        start: '2024-05-01',
        end: '2024-05-03'
      },
      {
        title: 'Event 2',
        start: '2024-05-10',
        end: '2024-05-12'
      }
      // Add more events as needed
    ];

    // Update calendar events
    this.calendarOptions.events = eventsData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conges'] && !changes['conges'].firstChange) {
      console.log('Leave data received:', this['conges']);
      this.updateCalendarEvents();
    }
  }

  updateCalendarEvents() {
    const events: EventInput[] = this.conges.map(conge => ({
      title: conge.type,
      start: conge.dateDebut,
      end: conge.dateFin
    }));
    console.log('Events to be rendered:', events);
    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
  }


  calculateBestLeavePeriods() {
    const leaveCounts: { [date: string]: number } = {};

    this.conges.forEach(conge => {
      const start = moment(conge.dateDebut);
      const end = moment(conge.dateFin);

      for (let date = moment(start); date.isSameOrBefore(end); date.add(1, 'days')) {
        const dateString = date.format('YYYY-MM-DD');
        leaveCounts[dateString] = (leaveCounts[dateString] || 0) + 1;
      }
    });

    const daysWithFewestLeaves = Object.entries(leaveCounts)
      .sort(([, countA], [, countB]) => countA - countB)
      .map(([date]) => date);

    const optimalPeriods: { start: string, end: string }[] = [];

    for (let i = 0; i < daysWithFewestLeaves.length - 2; i++) {
      const start = moment(daysWithFewestLeaves[i]);
      const end = start.clone().add(2, 'days');

      if (daysWithFewestLeaves.includes(end.format('YYYY-MM-DD'))) {
        optimalPeriods.push({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') });
      }
    }

    this.optimalLeavePeriods = optimalPeriods;
    console.log('Optimal Leave Periods:', this.optimalLeavePeriods);
  }




}
