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
  message3:any;
  reccomend:Boolean = false;
  reccomend2:Boolean = false;
  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
   this.carbonFootprint = this.route.snapshot.paramMap.get('data') + "kg CO2" ?? '';;
   for (const value of this.sharedService.sharedData) {
    if (this.sharedService.postcode == value.postcode){
      let suburb_score = value.gas_emissions + value.electricity_emissions;
      if (Number(this.route.snapshot.paramMap.get('data')) > suburb_score)
      {
        this.score = "higher"
        this.message = "Your household carbon footprint is higher than your suburb’s average, meaning your energy consumption has a significant negative impact on the environment."
        this.message2 = "Here are some suggestions to reduce your carbon emissions - > "
        this.reccomend = true;
      } else
      {
        this.score = "lower"
        this.message = "Your household carbon footprint is lower than your suburb’s average, keep up the good work!"
        this.message2 = "You can maintain or improve it further by incorporating the following suggestions - > "
        this.reccomend2 = true;
      }
    }
   }

  }

}
