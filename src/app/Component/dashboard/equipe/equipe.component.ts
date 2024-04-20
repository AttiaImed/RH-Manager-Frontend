import { Component,Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterEquipeDialogComponent } from './ajouter-equipe-dialog/ajouter-equipe-dialog.component';
import { EquipeService } from '../../../Services/Projet/equipe.service';
import { Equipe } from '../../../Models/equipe';
import { DatePipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [NgForOf, DatePipe, FormsModule, RouterLink, MatIcon],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.css'
})
export class EquipeComponent {
  teams: Equipe[]=[];

  constructor(private dialog :MatDialog, private equipeService: EquipeService){}

  ngOnInit(): void {
    this.getAllTeams();
    console.log(this.teams)
  }

  getAllTeams(): void {
    this.equipeService.getAll().subscribe(
      (data: Equipe[]) => {
        this.teams = data;
        console.log(this.teams)
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );

  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AjouterEquipeDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }


  delete(id: number): void {
    this.equipeService.Delete(id).subscribe(
      () => {
        console.log('Team deleted successfully.');
        this.ngOnInit()
      },
      (error: any) => {
        console.error('Error deleting team:', error);
      }
    );
  }
}
