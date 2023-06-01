import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


declare function test2(file: any): any;



@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  constructor(private http: HttpClient) { }



    processFile(imageInput: any): void {

      const formData = new FormData();
      const file: File = imageInput.files[0];
      console.log("update")
      const postData = new FormData();
      postData.append("image", file);
      this.http.post<any>(
        "http://localhost:3000/api/upload",
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });

    }

}
