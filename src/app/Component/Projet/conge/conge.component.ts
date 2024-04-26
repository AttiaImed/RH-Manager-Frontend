import { Component } from '@angular/core';
import { CongeService } from '../../../Services/conge.service';
import { Conge } from '../../../Models/conge';
import { NgForOf } from '@angular/common';  
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AjouterCongeDialogComponent } from './ajouter-conge-dialog/ajouter-conge-dialog.component';
import { UpdateCongeComponent } from './update-conge/update-conge.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-conge',
  standalone: true,
  imports: [NgForOf,
    MatButton,
    MatListModule, MatDividerModule,
    MatCard,MatCardContent,MatCardHeader,MatCardTitle,MatIcon
  ],
  templateUrl: './conge.component.html',
  styleUrl: './conge.component.css'
})
export class CongeComponent {
  casualLeaveCount: number = 0;
  sickLeaveCount: number = 0;
  personalDaysCount: number = 0;
  conges: Conge[] | undefined;
  constructor(private dialog :MatDialog, private congeService: CongeService) { }

  ngOnInit() {
    //this.loadConges();
    //this.loadLeaveCounts();
  }

  loadConges() {
    this.congeService.getCongesList().subscribe(conges => { 
      this.conges = conges; 
    });
  }

  updateConge(id: number, conge: Conge) {
    this.congeService.updateConge(id, conge).subscribe(() => {

      this.loadConges();
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AjouterCongeDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }

  deleteConge(id: number) {
    this.congeService.deleteConge(id).subscribe(() => {

      this.loadConges();
    });
  }

  loadLeaveCounts() {
    // Assuming your leave service has methods to fetch counts for each type of leave
    this.congeService.getCasualLeaveCount().subscribe(
      count => {
        this.casualLeaveCount = count;
      },
      error => {
        console.error('Error fetching Casual Leave count:', error);
      }
    );

    this.congeService.getSickLeaveCount().subscribe(
      count => {
        this.sickLeaveCount = count;
      },
      error => {
        console.error('Error fetching Sick Leave count:', error);
      }
    );

    this.congeService.getPersonalDaysCount().subscribe(
      count => {
        this.personalDaysCount = count;
      },
      error => {
        console.error('Error fetching Personal Days count:', error);
      }
    );
  }


  openUpdateDialog(conge: Conge): void {
    const dialogRef = this.dialog.open(UpdateCongeComponent, {
      width: '400px',
      data: { conge } // Pass the Conge object to the dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }
}
