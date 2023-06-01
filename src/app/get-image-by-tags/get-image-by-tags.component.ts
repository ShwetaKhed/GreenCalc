import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-get-image-by-tags',
  templateUrl: './get-image-by-tags.component.html',
  styleUrls: ['./get-image-by-tags.component.css']
})
export class GetImageByTagsComponent {
  constructor(private http: HttpClient) { }

  processFile1(imageInput: any) {
    const formData = new FormData();
    const file: File = imageInput.files[0];
    const postData = new FormData();
    postData.append("image", file);
    this.http.post<any>(
      "http://localhost:3000/api/uploadImageforTags",
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });

  }

}
