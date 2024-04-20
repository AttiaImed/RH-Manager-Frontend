import { Component } from '@angular/core';
import {Equipe} from "../../../../Models/equipe";
import {ProjectService} from "../../../../Services/project.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EquipeService} from "../../../../Services/Projet/equipe.service";
import {TokenStorageService} from "../../../../Services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Projet} from "../../../../Models/projet";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Utilisateur} from "../../../../Models/utilisateur";
import {UserService} from "../../../../Services/user.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatSelectTrigger} from "@angular/material/select";

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [
    MatSelectTrigger,
    MatLabel,
    MatSlideToggle,
    NgIf,
    RouterLink,
    NgForOf,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatIcon,
    FormsModule,
    MatList,
    MatListItem,
    MatDivider
  ],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent {
  ListOfSearch: any;
  addProjectSwitcher: boolean = false;
  id: string = '';
  userIdtoSearch: string = '';
  teamData: Equipe = new Equipe();
  usersData: Utilisateur[] = [];

  usersSkillsData: Utilisateur[] = [];



  constructor(
    private projectService: ProjectService,
    public ar: ActivatedRoute,
    private teamService: EquipeService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.teamService.get(this.id).subscribe((res: Equipe) => {
      this.teamData = res;
      this.getUsersById();
    });
  }
  // Get users that belong to the current team
  getUsersById() {
    this.teamData.membres?.forEach((id: any) => {
      this.userService.get(id).subscribe((res: Utilisateur) => {
        this.usersSkillsData.push(res);
      });
      this.userService.get(id).subscribe((res: Utilisateur) => {
        this.usersData.push(res);
      });
      //this.fetchProfilePicture(id);
    });
  }
  // Remove project from this Team
  removeProject(projectIdToRemove: any) {
    console.log(this.teamData.id, projectIdToRemove);
    this.teamService
      .addOrRemoveProject(this.teamData.id, projectIdToRemove)
      .subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([
              '/Dashboard/Teams/Details',
              this.teamData.id,
            ]);
          });
        // Perform any necessary operations with the project
      });
  }
  // Function that exicute in two way
  // 1- Add user to the team
  // 2- Remove user from the team
  addOrRemoveUser(userId: number) {
    this.teamService
      .addOrRemoveUser(this.teamData.id, userId)
      .subscribe(() => {
        window.location.reload();
      });
  }

  // Add to Department Users /Skills
  //On Opning model get informations
  ModelAddSmothingToDepartment() {
    this.userService.getAllWithpage(1, 10, this.userIdtoSearch).subscribe(
      (res: any) => {
        this.ListOfSearch = res.userDtoList;
      },
      (err) => {
        this._snackBar.open(
          'We Found An Error During Getting Users Please refresh this page  !!!',
          '❌'
        );
      }
    );
  }

  // add project
  listProjects: Projet[] = []; // List to store the available projects
  project = new FormControl(); // FormControl to track the selected projects

  fetchProjects() {
    this.addProjectSwitcher = !this.addProjectSwitcher;
    this.projectService.getAll().subscribe((res: Projet[]) => {
      this.listProjects = res;
    });
  }
  //Get Selected Project from the Select tag to add it to list and save team's projects in database
  getSelectedProjects() {
    // Retrieve the selected projects
    const selectedProjects = this.project.value;
    // Retrieve the IDs of the selected projects
    selectedProjects.forEach((projectId: string) => {
      this.teamService
        .addOrRemoveProject(this.teamData.id, projectId)
        .subscribe(
          () => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([
                  '/Dashboard/Teams/Details',
                  this.teamData.id,
                ]);
              });
          },
          () => {
            this._snackBar.open(
              'We Found An Error During Adding Project Please refresh this page  !!!',
              '❌'
            );
          }
        );
    });
  }
  // Changing the status of the current team
  // InWorking Status
  // Not Available Status
  changeStatus() {
    if (this.teamData.status == 'inWorking') {
      this.teamData.status = 'Not Available';
    } else {
      this.teamData.status = 'inWorking';
    }
    this.teamService
      .Update(this.teamData.id, this.teamData)
      .subscribe(
        () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([
                '/Dashboard/Teams/Details',
                this.teamData.id,
              ]);
            });
        },
        () => {
          this._snackBar.open(
            'We Found An Error During Updating Team Please refresh this page  !!!',
            '❌'
          );
        }
      );
  }
  // get Profile Picture
// Define a property to store the profile picture URLs
  userProfilePictures: { [userId: string]: SafeUrl } = {};

// Call the function to fetch the profile picture for a user
  fetchProfilePicture(userId: string): void {
    // this.userService.getFile(userId).subscribe(
    //   (res: any) => {
    //     let objectURL = URL.createObjectURL(res);
    //     this.userProfilePictures[userId] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //   },
    //   (error) => {
    //     this.userProfilePictures[userId] = LogoImgPath;
    //   }
    // );
  }

}
