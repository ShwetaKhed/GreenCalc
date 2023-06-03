import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css']
})
export class DeleteImageComponent {
  constructor( private http: HttpClient) { }

  onClickSubmit(data:any) {
    console.log(data);
    this.http.post<any>(
        "http://localhost:3000/api/deleteImage",
        data
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
