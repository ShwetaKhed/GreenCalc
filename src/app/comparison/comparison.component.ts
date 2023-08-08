import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {
  carbonFootprint: string = '0';
  score: any;
  message: any;
  message2: any;
  messageAdd: any;
  suburbScore:any;
  suburb: any;
  reccomend:Boolean = false;
  reccomend2:Boolean = false;
  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
   this.carbonFootprint = this.route.snapshot.paramMap.get('data') + "kg CO2" ?? '';
   for (const value of this.sharedService.sharedData) {
    if (this.sharedService.postcode == value.postcode){
      let suburb_score = value.gas_emissions * 30 + value.electricity_emissions * 30;
      this.suburbScore = suburb_score + "kg CO2"
      this.suburb = value.suburb;
      if (Number(this.route.snapshot.paramMap.get('data')) > suburb_score)
      {
        this.score = "higher"
        this.message = "Your household carbon footprint is higher than "

         this.messageAdd = "suburb’s average, this has a negative impact."
         this.message2 = "Click to reduce your carbon emissions - > "
        this.reccomend = true;
      } else
      {
        this.score = "lower"
        this.message = "Your household carbon footprint is lower than your"
        this.messageAdd  = "suburb’s average, keep up the good work!"
        this.message2 = "Click here for recommendations - > "
        this.reccomend2 = true;
      }
    }
   }

  }

}
