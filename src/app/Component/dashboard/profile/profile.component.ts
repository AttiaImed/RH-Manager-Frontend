import {Component, OnInit} from '@angular/core';
import {Reclamation} from "../../../Models/reclamation";
import {ReclamationService} from "../../../Services/Reclamation/reclamation.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {EntryService} from "../../../Services/entry.service";
import {UserService} from "../../../Services/user.service";
import {Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatIcon,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
data : any;
  private destroy$: Subject<void> = new Subject<void>();
   editable = false;
  name : string = '';
  email:string = ''
  constructor(    private EService: EntryService,
                  private _snackBar: MatSnackBar,

                  private reclamationService: ReclamationService,private entryService:EntryService,private userService:UserService) {
    this.entryService.getUserId()
  }
ngOnInit() {
    this.userService.getUserDetails(this.entryService.getUserId()).pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.data = data
      this.email = this.data.email
      this.name = `${this.data.nom} ${this.data.prenom}`
    })
}

  doEdit(){
    this.editable = true

  }
  doSave(){
   let body;
   console
   body = {
     nom:this.name.split(' ')[0],
     prenom:this.name.split(' ')[1],
     email:this.email,
     password:this.data.password
   }
   body = {
     ...body,
     type:'EMPLOYE'
   }
    if(this.editable){
      this.userService.saveUserDetails(this.entryService.getUserId(),body).pipe(takeUntil(this.destroy$)).subscribe(data=>{
        this.data = data

        this.editable = false
        this._snackBar.open('You should re-login after changing your email', 'close', {duration: 20000} )
this.logout()
      })
    }
  }
logout(){
    this.EService.signOut();

  }
}
