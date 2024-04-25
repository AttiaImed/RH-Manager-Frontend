import { Component ,OnInit } from '@angular/core';
import { NgIf ,NgFor } from '@angular/common';
import { CalendarService } from '../../../Services/Projet/calendar.service';
@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent {

}
