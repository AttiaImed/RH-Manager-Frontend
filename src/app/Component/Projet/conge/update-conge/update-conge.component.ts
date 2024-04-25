import { Component } from '@angular/core';
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
export class UpdateCongeComponent {
  conge: Conge = new Conge();

  constructor(private congeService: CongeService, private dialogRef: MatDialogRef<UpdateCongeComponent>) {}



  onSubmit() {
   
    this.congeService.updateConge(this.conge.id, this.conge).subscribe(
      (response: any) => {
        console.log('Conge updated successfully:', response);
        this.dialogRef.close('success');
      },
      (error: any) => {
        console.error('Error updating Conge:', error);
      }
    );
  }
}
