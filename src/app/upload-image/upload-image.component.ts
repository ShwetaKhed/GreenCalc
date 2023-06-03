import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/TokenService';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  token :any;
  constructor(private http: HttpClient,
    private tokenService: TokenService, private router: Router) { }
  ngOnInit() {
    this.token = this.tokenService.getIdToken();
    if (this.token) {
      console.log(this.token);
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
    }

    processFile(imageInput: any): void {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const file: File = imageInput.files[0];
      const postData = new FormData();
      postData.append("image", file);
      this.http.post<any>(
        "http://localhost:3000/api/upload",
        postData, { headers }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
    }
}
