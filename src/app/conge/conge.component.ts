import { Component } from '@angular/core';
import { CongeService } from '../Services/conge.service';
import { Conge } from '../Models/conge';

@Component({
  selector: 'app-conge',
  standalone: true,
  imports: [],
  templateUrl: './conge.component.html',
  styleUrl: './conge.component.css'
})
export class CongeComponent {
  onges: Conge[] | undefined;
  constructor(private congeService: CongeService) { }

  ngOnInit() {
    this.loadConges();
  }

  loadConges() {
    this.congeService.getCongesList().subscribe(onges => { 
      this.onges = onges; 
    });
  }

  updateConge(id: number, conge: Conge) {
    this.congeService.updateConge(id, conge).subscribe(() => {

      this.loadConges();
    });
  }

  deleteConge(id: number) {
    this.congeService.deleteConge(id).subscribe(() => {

      this.loadConges();
    });
  }
}
