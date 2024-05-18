import { Component } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { CongeService } from '../../../Services/conge.service';
import { Conge } from '../../../Models/conge';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApprovalStatus } from '../../../Models/approval-status.enum';
import { NgIf } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-request',
  standalone: true,
  imports: [NgForOf,NgIf,
    MatButton,
    MatListModule, MatDividerModule,
    MatCard,MatCardContent,MatCardHeader,MatCardTitle,MatIcon,MatPaginatorModule,MatSort
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {

  casualLeaveCount: number = 0;
  sickLeaveCount: number = 0;
  personalDaysCount: number = 0;
  conges: Conge[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  isHr: boolean = false;
  constructor(private dialog :MatDialog, private congeService: CongeService, private userService:UserService,private matSnack : MatSnackBar) { }

  ngOnInit() {
    this.loadConges();
    this.loadLeaveCounts();

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


  approveConge(id: number) {
    this.congeService.updateApprovalStatus(id, ApprovalStatus.APPROVED).subscribe(() => {
      this.matSnack.open('Congé accepter', 'Fermer', {
        duration: 2000,
      });
      this.loadConges();
    });
  }

  // Method to reject leave request
  rejectConge(id: number) {
    this.congeService.updateApprovalStatus(id, ApprovalStatus.REJECTED).subscribe(() => {
      this.matSnack.open('Congé rejeter', 'Fermer', {
        duration: 2000,
      });
      this.loadConges();
    });
  }

getUserById(id: number) {
    this.userService.get(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
