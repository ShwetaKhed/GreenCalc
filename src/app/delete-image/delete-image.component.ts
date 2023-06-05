import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/TokenService';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css'],
})

export class DeleteImageComponent {
  url: any;
  constructor(private http: HttpClient,
    private tokenService: TokenService, private router: Router ) { }

  ngOnInit() {
    const token = this.tokenService.getIdToken();
    if (token) {
      //console.log(token);
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
    }
    deleteImage() {
    const token = this.tokenService.getIdToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.url);
    const json = {
      "url" : this.url
    }

    this.http.post<any>(
        "http://localhost:3000/api/deleteImage",
        json, { headers }
      )
      .subscribe(responseData => {
        console.log(responseData);
        alert(responseData.message)
      });
  }

}
