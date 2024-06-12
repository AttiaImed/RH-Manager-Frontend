import { Component } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamModule} from "ngx-webcam";
import { Observable, Subject, interval, Subscription } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {EntryService} from "../../Services/entry.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../Services/token.service";

@Component({
  selector: 'app-face-recognition',
  standalone: true,
  imports: [
    WebcamModule,
    NgIf
  ],
  templateUrl: './face-recognition.component.html',
  styleUrl: './face-recognition.component.css'
})
export class FaceRecognitionComponent {
  public webcamImage: any;
  private trigger: Subject<void> = new Subject<void>();
  public showWebcam = true;
  public errors: WebcamInitError[] = [];
  private captureInterval: Subscription | null = null;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar,
              private router: Router,
              private entryService: EntryService,
              private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.startCapturing();
  }

  ngOnDestroy(): void {
    this.stopCapturing();
  }
   i = 1;

  private startCapturing(): void {
    this.captureInterval = interval(500).subscribe(() => {
      this.triggerSnapshot();
      if(this.i % 10 === 0){
        this._snackBar.open("We could not detect your face please make it closer", '❌');
        this.i++;
      }else{
        this.i++;
      }
    });
  }

  private stopCapturing(): void {
    if (this.captureInterval) {
      this.captureInterval.unsubscribe();
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sendImage(webcamImage.imageAsDataUrl);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  private sendImage(image: any): void {
    const imageBlob = this.dataURLtoBlob(image);
    const imageFormData = new FormData();
    imageFormData.append('file', imageBlob, 'image.png');

    this.http.post('http://localhost:5000/whoisit', imageFormData)
      .subscribe((response: any) => {
        const result: string = response.result;
        if (result.startsWith("It's")) {
          const idMatch = result.match(/It's (\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          if (id !== null) {
            this.stopCapturing();
            this.loginWithId(id);
            console.log('hello');

          }
        } else {
          console.log('No match found');
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  private loginWithId(id: number): void {
    console.log(`Logging in with id: ${id}`);
    // Implement your login logic here
    this.entryService.loginWithUserId(id).subscribe({
      next: (data: any) => {
        console.log('Logged in:', data);
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/Dashboard']);
      },
      error: (error: any) => {
        console.error('Error logging in:', error);
        this._snackBar.open(error.message, '❌');
      }
    });
  }
}
