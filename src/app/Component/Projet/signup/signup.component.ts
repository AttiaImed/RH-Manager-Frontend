import {Component} from '@angular/core';
import {LoginService} from "../../../Services/Projet/login.service";
import {Utilisateur} from "../../../Models/utilisateur";
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
        this.listUsers = data;
      },
      (error) => {
        console.log(error + "no user found");
      }
    );
  }
  register() {
    this.loginService.Create(this.newUser).subscribe(
      (createdUser: Utilisateur) => {
        console.log(`New user added successfully.`);
        this.newUser = {
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

  delete(id: number) {
    this.loginService.Delete(id).subscribe(
      () => {
        const index = this.listUsers.findIndex((user) => user.idUtilisateur === id);
        if (index !== -1) {
          this.listUsers.splice(index, 1);
          console.log(`User with id ${id} deleted successfully.`);
        } else {
          console.log(`User with id ${id} not found.`);
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
