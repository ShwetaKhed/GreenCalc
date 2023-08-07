import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router, private http: HttpClient,
    private sharedService: SharedService) { }
  ngOnInit() {

    console.log("in here")
    this.http.get<any>(
      "http://localhost:3000/api/data"
    )
    .subscribe(responseData => {
     console.log(responseData)
     this.sharedService.sharedData = responseData
    });


  }


}
