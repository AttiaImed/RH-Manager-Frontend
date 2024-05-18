import { Component, ViewChild } from '@angular/core';
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
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApprovalStatus } from '../../../Models/approval-status.enum';
import { NgIf } from '@angular/common';
import { CalendrierComponent } from "../calendrier/calendrier.component";
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-conge',
    standalone: true,
    templateUrl: './conge.component.html',
    styleUrl: './conge.component.css',
    imports: [NgForOf, NgIf,
        MatButton,
        MatListModule, MatDividerModule,
        MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIcon, MatPaginatorModule, MatSort, CalendrierComponent]
})
export class CongeComponent{
[x: string]: any;
selectedEventDetails: Conge | null = null;
  casualLeaveCount: number = 0;
  sickLeaveCount: number = 0;
  personalDaysCount: number = 0;
  conges: Conge[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  isHr: boolean = false;
  optimalLeavePeriods: { start: string, end: string }[] = [];
  constructor(private dialog :MatDialog, private congeService: CongeService,private matSnack : MatSnackBar) { }

  ngOnInit() {
    this.loadConges();
    this.loadLeaveCounts();
    this.calculateBestLeavePeriods();

  }
  loadConges() {
    this.congeService.getCongesList().subscribe(conges => {
      this.conges = conges;
    });
  }
  get paginatedConges() {
    const start = this.currentPage * this.itemsPerPage;
    return this.conges.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
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

  updateStatus(id: number, status: ApprovalStatus) {
    const congeToUpdate = this.conges.find(conge => conge.id === id);
    if (congeToUpdate) {
      congeToUpdate.status = status;
    }
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
  approveConge(id: number) {
    this.congeService.updateApprovalStatus(id, ApprovalStatus.APPROVED).subscribe(() => {
      this.matSnack.open('Congé approuvé', 'Fermer', {
        duration: 2000,
      });
      this.loadConges();
    });
  }

  // Method to reject leave request
  rejectConge(id: number) {
    this.congeService.updateApprovalStatus(id, ApprovalStatus.REJECTED).subscribe(() => {
      console.log('Leave request rejected');
      this.matSnack.open('Congé rejeter', 'Fermer', {
        duration: 2000,
      });
      this.loadConges();
    });
  }



  calculateBestLeavePeriods() {
    const leaveCounts: { [date: string]: number } = {};

    this.conges.forEach(conge => {
      const start = moment(conge.dateDebut);
      const end = moment(conge.dateFin);

      if (!start.isValid() || !end.isValid()) {
        console.error('Invalid date range:', conge);
        return;
      }
      for (let date = moment(start); date.isSameOrBefore(end); date.add(1, 'days')) {
        const dateString = date.format('YYYY-MM-DD');
        leaveCounts[dateString] = (leaveCounts[dateString] || 0) + 1;
      }
    });
    console.log('Leave counts per day:', leaveCounts);
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

  onSelectedEventChange(selectedEvent: Conge | null) {
    // Assign the selected event details to a variable
    this.selectedEventDetails = selectedEvent;
  }



}
