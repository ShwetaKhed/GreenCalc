import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';





@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  myForm: FormGroup;
  energy: any;
  gas: any;
  postcode: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private sharedService: SharedService) {
    this.myForm = this.formBuilder.group({
      energy: ['', Validators.required],
      gas: ['', Validators.required],
      postcode : ['', Validators.required]
    });

  }
  ngOnInit() {
    console.log(this.sharedService.sharedData);

  }

  calculate() {
    if(this.energy != undefined && this.gas != undefined && this.postcode != undefined)
    {
      var elect_cf =  this.energy * 0.5;
      var gas_cf = this.gas * 2.2;
      var total = elect_cf + gas_cf
      this.sharedService.postcode =this.postcode;
      this.router.navigate(['/compare', total.toFixed(2)]);
    }

  }

  openDialog(): void {


  }
}



