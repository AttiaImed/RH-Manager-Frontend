  import { Component, OnInit } from '@angular/core';

  import { FormsModule } from '@angular/forms'; 

  import { EquipeService } from '../../../../Services/Projet/equipe.service';
  import { MatDialogRef } from '@angular/material/dialog';
  import { CongeService } from '../../../../Services/conge.service';
  import { NgIf } from '@angular/common';
  import {ReactiveFormsModule} from '@angular/forms'; 
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conge } from '../../../../Models/conge';
  @Component({
    selector: 'app-ajouter-conge-dialog',
    standalone: true,
    imports: [FormsModule,NgIf,ReactiveFormsModule],
    templateUrl: './ajouter-conge-dialog.component.html',
    styleUrl: './ajouter-conge-dialog.component.css'
  })
  export class AjouterCongeDialogComponent implements OnInit {
    congeForm: FormGroup | undefined;

    constructor(
      private fb: FormBuilder,
      private congeService: CongeService,
      private dialogRef: MatDialogRef<AjouterCongeDialogComponent>
    ) {}

    ngOnInit(): void {
      this.initForm();
    }

    initForm(): void {
      this.congeForm = this.fb.group({
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        type: ['', Validators.required],
        description: ['', Validators.required]
      });
    }



    onSubmit(): void {
      if (this.congeForm && this.congeForm.invalid) {
        this.congeForm.markAllAsTouched();
        return;
      }
      if (this.congeForm && this.congeForm.valid) {
        const congeData: Conge = this.congeForm.value;
        this.congeService.createConge(congeData).subscribe(
          (response: any) => {
            console.log('Conge added successfully:', response);
            this.dialogRef.close('success');
          },
          (error: any) => {
            console.error('Error adding Conge:', error);
          }
        );
      }
    }
  }