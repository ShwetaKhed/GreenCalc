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
  constructor(private http: HttpClient,
    private tokenService: TokenService, private router: Router ) { }

  ngOnInit() {
    const token = this.tokenService.getIdToken();
    if (token) {
      console.log(token);
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
    }
  onClickSubmit(data: any) {
    const token = this.tokenService.getIdToken();
    console.log("token in delete : " + token);

    // Set the authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(data);
    this.http.post<any>(
        "http://localhost:3000/api/deleteImage",
      data, { headers }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
