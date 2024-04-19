import {Component} from '@angular/core';
import {LoginService} from "../../Services/Projet/login.service";
import {Utilisateur} from "../../Models/utilisateur";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgForOf, DatePipe, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  newUser: Utilisateur = new Utilisateur();
  listUsers: Utilisateur[] = [];
  selectedUser: Utilisateur = new Utilisateur();


  constructor(private loginService: LoginService) {
    this.loadUsers();
  }
  loadUsers() {
    this.loginService.getAll().subscribe(
      (data: Utilisateur[]) => {
        console.log(data)
        this.listUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  register() {
    this.loginService.Create(this.newUser).subscribe(
      (createdUser: Utilisateur) => {
        console.log(`New user added successfully.`);
        this.newUser = {
          id:0,
          idUtilisateur: 0,
          nom: "",
          prenom: "",
          type: "",
          email: "",
          login: "",
          password: "",
          status: false,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(user : Utilisateur) {
    console.log(user);
    this.loginService.Delete(user.id).subscribe(
      () => {
        const index = this.listUsers.findIndex((user) => user.idUtilisateur === user.id);
        if (index !== -1) {
          this.listUsers.splice(index, 1);
          console.log(`User with id ${user.id} deleted successfully.`);
        } else {
          console.log(`User with id ${user.id} not found.`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit(user: Utilisateur) {
    this.selectedUser = { ...user };
  }
  saveChanges() {
    this.loginService.Update(this.selectedUser.idUtilisateur,this.selectedUser).subscribe(
      () => {
        console.log(`User with id ${this.selectedUser.idUtilisateur} updated successfully.`);
        // Reload dossiers
        this.loadUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
