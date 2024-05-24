import {FormsModule, NgModel} from "@angular/forms";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Feedback} from "../../../Models/feedback";
import {ActivatedRoute} from "@angular/router";
import {FeedbackService} from "../../../Services/feedback.service";
import {Utilisateur} from "../../../Models/utilisateur";
import {NgxPaginationModule} from "ngx-pagination";
import {Component} from "@angular/core";
import {StaticsService} from "../../../Services/statics.service";
import {TokenStorageService} from "../../../Services/token.service";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatIcon, JsonPipe, DatePipe, NgIf,
    NgxPaginationModule ,// Ajoutez NgxPaginationModule dans vos imports


  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  listFeedback: Feedback[] = [];
  p: number = 1; // Numéro de page actuel
  itemsPerPage: number = 6; // Nombre d'éléments à afficher par page
  searchType : string ="";
  selectedFeedback: Feedback = new Feedback();
  filteredFeedback: any[] = [];
  searchTerm: string = '';
  newFeedback: { dateSoumission: Date; typeFeedBack: string; libelle: string; description: string; id: number }=new Feedback();
  pleasedCount: number = 0;
  unpleasedCount: number = 0;
  chartInstance: any;

  constructor(private feedbackService: FeedbackService ,private staticsService: StaticsService,private tokenStorage : TokenStorageService) {
    console.log(this.tokenStorage.getRole())
    this.loadFeedbacks();
  }
  calculateStatistics() {
    this.pleasedCount = this.listFeedback.filter(feedback => feedback.typeFeedBack === 'pleased').length;
    this.unpleasedCount = this.listFeedback.filter(feedback => feedback.typeFeedBack === 'unpleased').length;
    this.staticsService.updateStatistics({ pleasedCount: this.pleasedCount, unpleasedCount: this.unpleasedCount });
  }


  loadFeedbacks() {

    if(this.tokenStorage.getRole() === "EMPLOYE"){
      this.feedbackService.getfeedbackByUserId().subscribe(
        (data:Feedback[])=>{
          this.listFeedback = data;
          this.filteredFeedback=data;
          this.calculateStatistics();
          console.log(data)
        },
        (error)=>{
          console.log(error + "feedback not found");
        }
      );
    }else{
      this.feedbackService.getAll().subscribe(
        (data:Feedback[])=>{
          this.listFeedback = data;
          this.filteredFeedback=data;
          this.calculateStatistics();
          console.log(data)
        },
        (error)=>{
          console.log(error + "feedback not found");
        }
      );

    }

  }
  applyFilters() {
    // Filtrer les données en fonction du terme de recherche et du type sélectionné

    if(this.searchTerm.toLowerCase() == ""){
      this.loadFeedbacks()
    }else{
      this.filteredFeedback = this.filteredFeedback.filter(feedback =>
        feedback.libelle.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }



  delete(id: number) {
    this.feedbackService.Delete(id).subscribe(
      (reponse) => {
        this.loadFeedbacks();
      },
      (error) => {
        console.log(error);

      }
    );
  }

  editFeedback(feedback: Feedback) {
    this.selectedFeedback = { ...feedback };
    console.log(this.selectedFeedback);
  }


  saveChanges() {
    const feedback={
      libelle: this.selectedFeedback.libelle,
      dateSoumission: this.selectedFeedback.dateSoumission,
      description: this.selectedFeedback.description,
      typeFeedBack: this.selectedFeedback.typeFeedBack
    }
    this.feedbackService.Update(this.selectedFeedback.id,feedback).subscribe(
      () => {
        console.log(`Feedback with id ${this.selectedFeedback.id} updated successfully.`);
        window.location.reload();
        this.loadFeedbacks();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewFeedback() {
    console.log( this.newFeedback)
    this.feedbackService.Create(this.newFeedback).subscribe(
      (createdFeedback: Feedback) => {
        console.log(`New feedback added successfully.`);
        window.location.reload();

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



  filterType() {

    if(this.searchType.toUpperCase() !== ""){
      this.filteredFeedback = this.listFeedback.filter(feedback =>
        feedback.typeFeedBack === this.searchType
      );
    }
  }
  setPage(event : number){
    this.p = event
  }
}
