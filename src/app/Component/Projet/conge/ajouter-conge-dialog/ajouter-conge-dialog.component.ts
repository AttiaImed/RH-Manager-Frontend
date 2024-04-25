  import { Component } from '@angular/core';

  import { FormsModule } from '@angular/forms'; // Import FormsModule

  import { EquipeService } from '../../../../Services/Projet/equipe.service';
  import { MatDialogRef } from '@angular/material/dialog';
  import { CongeService } from '../../../../Services/conge.service';
import { Conge } from '../../../../Models/conge';
  @Component({
    selector: 'app-ajouter-conge-dialog',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './ajouter-conge-dialog.component.html',
    styleUrl: './ajouter-conge-dialog.component.css'
  })
  export class AjouterCongeDialogComponent {
    conge: Conge = new Conge(); 

    constructor(private congeService: CongeService,private dialogRef: MatDialogRef<AjouterCongeDialogComponent>) {}

    onSubmit() {
      

      this.congeService.createConge(this.conge).subscribe(
        (response: any) => {

          console.log(this.conge)
          console.log('Conge added successfully:', response);
          this.dialogRef.close();
          this.dialogRef.close('success');
        },
        (error: any) => {

          console.error('Error adding Conge:', error);
        }
      );
    }
  }