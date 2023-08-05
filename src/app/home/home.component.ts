import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit() {

      console.log("in here")
      this.http.get<any>(
        "http://localhost:3000/api/data"
      )
      .subscribe(responseData => {
       console.log(responseData)
      });

  }


}
