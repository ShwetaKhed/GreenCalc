import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
  })
export class ImageService {

    constructor(private httpClient: HttpClient) {

    }

    uploadImage(file: File) : Observable<any>{

       /* const formData = new FormData();
        formData.append("profileImage", file);*/
        var headers = new HttpHeaders();
        headers.append('Content-type','plain/text');
		    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS, PUT');
        headers.append('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With")
        headers.append('Access-Control-Allow-Credentials', 'true');



        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.put("https://cjrypv6i14.execute-api.us-east-1.amazonaws.com/v1/cloudsnapimagebuck/0000002.jpg",
        formData, {headers});
      }

  }
