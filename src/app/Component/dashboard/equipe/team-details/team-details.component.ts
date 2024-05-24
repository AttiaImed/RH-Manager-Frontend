import {Component, OnInit} from '@angular/core';
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
import {AjouterEquipeDialogComponent} from "../ajouter-equipe-dialog/ajouter-equipe-dialog.component";
import {AjouterUserTeamComponent} from "../ajouter-user-team/ajouter-user-team.component";
import {MatDialog} from "@angular/material/dialog";
import {EquipeHistoriqueDialogComponent} from "../equipe-historique-dialog/equipe-historique-dialog.component";

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
export class TeamDetailsComponent implements OnInit {
  ListOfSearch: any;
  addProjectSwitcher: boolean = false;
  id: string = '';
  userIdtoSearch: string = '';
  teamData: Equipe = new Equipe();
  usersData: Utilisateur[] = [] as Utilisateur[] ;
  ManagerData: Utilisateur = new Utilisateur();
  usersSkillsData: Utilisateur[] = [];
ProjectData: Projet[]=[] as Projet[];
 teamMemberData1: Utilisateur[] = [] as Utilisateur[];
teamMemberData2: Utilisateur[] = [] as Utilisateur[];
  constructor(
    private projectService: ProjectService,
    public ar: ActivatedRoute,
    private teamService: EquipeService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private dialog :MatDialog
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
      console.log(data);
    });
    this.teamService.get(this.id).subscribe((res: Equipe) => {
      this.teamData = res;

    });
  }

  ngOnInit(): void {
    this.teamService.getTeamProjects(this.id).subscribe((res: any) => {
      this.ProjectData = res;
      console.log(this.ProjectData);
    });
    this.teamService.getTeamMembers(this.id).subscribe((res: any) => {
      this.usersData = res;
      console.log(this.usersData);
      let mid = Math.ceil(this.usersData.length / 2);

      this.teamMemberData1 = this.usersData.slice(0, mid);
      this.teamMemberData2 = this.usersData.slice(mid);
      console.log(this.teamMemberData1);
      console.log(this.teamMemberData2);

    });
    this.teamService.getTeamManager(this.id).subscribe((res: Utilisateur) => {
      this.ManagerData = res;
      console.log(this.ManagerData);

    });

  }  // Get users that belong to the current team
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

  addOrRemoveUser(userId: number) {
    console.log(this.teamData.id,userId);
    this.teamService
      .deleteUser(this.teamData.id, userId)
      .subscribe(() => {
        this.ngOnInit()
      },(error) => {
        console.error('An error occurred:', error);
        // Handle the error here
      });
  }
  removeProject(projectId: number) {
    this.teamService
      .deleteProject(this.teamData.id, projectId)
      .subscribe(() => {
        this.ngOnInit()
      },(error) => {
        console.error('An error occurred:', error);
        // Handle the error here
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

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(AjouterEquipeDialogComponent, {
      width: '400px',
       height: '330px',
      data:{teamData:this.teamData,
      action:'update'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });}
  openAddUser(){
    const dialogRef = this.dialog.open(AjouterUserTeamComponent, {
      width: '400px',
      height: '180px',
      data: {teamId: this.teamData.id,action:'add user'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }
  openAddProject(){
    const dialogRef = this.dialog.open(AjouterUserTeamComponent, {
      width: '400px',
      height: '180px',
      data: {teamId: this.teamData.id,action:'add project'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }

  openHistory() {
    const dialogRef = this.dialog.open(EquipeHistoriqueDialogComponent, {
      width: '400px',
      height: '330px',
      data:this.teamData
    });
    dialogRef.afterClosed().subscribe(result => {

    });}
}
