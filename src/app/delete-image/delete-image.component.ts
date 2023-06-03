import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/TokenService';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css'],
})

export class DeleteImageComponent {

  constructor(private http: HttpClient,
    private tokenService: TokenService ) { }
 

  onClickSubmit(data: any) {

    // Get the token from wherever you have stored it (e.g., local storage, service)

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
