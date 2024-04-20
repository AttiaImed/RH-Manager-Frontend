import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Import FormsModule



import { Component } from '@angular/core';
import { EquipeService } from '../../../../Services/Projet/equipe.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajouter-equipe-dialog',
  standalone: true,
  imports: [
    FormsModule ],
  templateUrl: './ajouter-equipe-dialog.component.html',
  styleUrl: './ajouter-equipe-dialog.component.css'
})
export class AjouterEquipeDialogComponent {
  teamName: string = '';
  domain: string = '';

  constructor(private equipeService: EquipeService,private dialogRef: MatDialogRef<AjouterEquipeDialogComponent>) {}

  onSubmit() {
    const team = {
      nom: this.teamName,
      domaine:this.domain,
    };

    this.equipeService.Create(team).subscribe(
      (response: any) => {
        // Handle success response
        console.log(team)
        console.log('Team added successfully:', response);
        this.dialogRef.close();
        this.dialogRef.close('success');
      },
      (error: any) => {
        // Handle error response
        console.error('Error adding team:', error);
      }
    );
  }
}
