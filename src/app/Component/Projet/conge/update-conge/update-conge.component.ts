import { Component,Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EquipeService } from '../../../../Services/Projet/equipe.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CongeService } from '../../../../Services/conge.service';
import { Conge } from '../../../../Models/conge';
@Component({
  selector: 'app-update-conge',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-conge.component.html',
  styleUrl: './update-conge.component.css'
})
export class UpdateCongeComponent implements OnInit{
  conge: Conge = new Conge();

  constructor(private congeService: CongeService, private dialogRef: MatDialogRef<UpdateCongeComponent>,@Inject(MAT_DIALOG_DATA) public data: { conge: Conge }) {}


  ngOnInit() {
    console.log(this.data)
  }
  onSubmit() {
    console.log(this.data)
    this.congeService.updateConge(this.data.conge.id, this.data.conge).subscribe(
      response => {
        console.log('Conge updated successfully:', response);
        this.dialogRef.close('success');}
  
    );
  }
}
