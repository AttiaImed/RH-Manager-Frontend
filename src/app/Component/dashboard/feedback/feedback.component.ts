import {Component} from '@angular/core';
import {FormsModule, NgModel} from "@angular/forms";
import {DatePipe, JsonPipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Feedback} from "../../../Models/feedback";
import {ActivatedRoute} from "@angular/router";
import {FeedbackService} from "../../../Services/feedback.service";
import {Reclamation} from "../../../Models/reclamation";
import {Utilisateur} from "../../../Models/utilisateur";
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule,
    NgForOf,
    MatIcon, JsonPipe, DatePipe,

  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  listFeedback: Feedback[] = [];
  selectedFeedback: Feedback = new Feedback();

  newFeedback: { dateSoumission: Date; typeFeedBack: string; libelle: string; description: string; id: number }=new Feedback();
  constructor(private feedBackService: FeedbackService) {
    feedBackService.getAll().subscribe(
      (reponse) => {
        this.listFeedback = reponse;
        console.log(reponse)
      },
      (error) => {
        console.log(error.message)
      }
    )
  }
  delete(id: number) {
    this.feedBackService.Delete(id).subscribe(
      (reponse) => {

        const index = this.listFeedback.findIndex((feedback: Feedback) => feedback.id === id);
        if (index !== -1) {
          this.listFeedback.splice(index, 1);
          console.log(`Feedback with id ${id} deleted successfully.`);
        } else {
          console.log(`Feedback with id ${id} not found`);
        }
      },
      (error) => {
        console.log(error);

      }
    );
  }

  protected readonly Feedback = Feedback;

  saveFeedback() {

  }

  // editFeedBack(feedback : Feedback) {
  //   this.selectedFeedback = feedback;
  // }
  // edit() {
  //   this.feedBackService.Update(this.selectedFeedback.id,this.selectedFeedback).subscribe(
  //     (response) =>{
  //       alert("Feedback successfully updated!");
  //   },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  // }
  editFeedBack(feedback: Feedback) {
    console.log( this.selectedFeedback)

    this.selectedFeedback = feedback;
  }
  loadFeedbacks() {
    this.feedBackService.getAll().subscribe(
      (data:Feedback[])=>{
        this.listFeedback=data;
      },
      (error)=>{
        console.log(error + "feedback not found");
      }
    );
  }
  saveChanges() {
    this.feedBackService.Update(this.selectedFeedback.id,this.selectedFeedback).subscribe(
      () => {
        console.log(`Feedback with id ${this.selectedFeedback.id} updated successfully.`);
        this.loadFeedbacks();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addNewFeedback() {
    console.log( this.newFeedback)
    this.feedBackService.Create(this.newFeedback).subscribe(
      (createdFeedback: Feedback) => {
        console.log(`New feedback added successfully.`);
        this.newFeedback = {
          id :0,
          libelle : "",
          dateSoumission: new Date(),
          description : "",
          typeFeedBack:"",
        };
        this.loadFeedbacks();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

